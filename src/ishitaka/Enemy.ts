/**
 * @fileoverview 敵の実装ファイル
 * @file Enemy.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Character,CharacterType} from './Character'
import {CharacterStatus} from './CharacterStatus'
import {EnemyStatus} from './EnemyStatus'
import {Transform} from './Transform'
import {EnemyTribeData,EnemyTribeDataAccessor} from './DatabaseAccessors/EnemyTribeDataAccessor'
import {CharacterManager} from './CharacterManager'
import {CommunicationData} from './CommunicationData';
import {EnemyPopAreaData, EnemyPopAreaDataAccessor} from './DatabaseAccessors/EnemyPopAreaDataAccessor'
import {Vector3} from './Vector3'
import {Matrix4x4} from './Matrix4x4'
import {SkillData, SkillDataAccessor} from './DatabaseAccessors/SkillDataAccessor'
import {EnemyTarget} from './EnemyTarget'
import {SkillEffectManager} from './SkillEffectManager'
import {SkillEffect} from './SkillEffect'
import {Vector4} from './Vector4'
import {Battlefield} from './Battlefield'
import {BattlefieldManager} from './BattlefieldManager'

enum EnemyUpdateMode{
    Normal,
    Battle
}
enum EnemyBattleMode{
    ActionJudge,
    Move,
    Cast,
    Recast
}

/**
 * 敵
 * @export
 * @class Enemy
 * @implements {Character}
 */
export class Enemy implements Character{
    /**
     * リポップインターバル
     * @private
     * @static
     * @type {number}
     * @memberof Enemy
     */
    private static readonly repopulateInterval_ : number = 3000.0;
    /**
     * 歩行終了インターバル
     * @private
     * @static
     * @type {number}
     * @memberof Enemy
     */
    private static readonly walkEndInterval_ : number = 1000.0;
    /**
     * 戦闘移動インターバル
     * @private
     * @static
     * @type {number}
     * @memberof Enemy
     */
    private static readonly battleMoveInterval_ : number = 1000.0;
    /**
     * スキル中断インターバル
     * @private
     * @static
     * @type {number}
     * @memberof Enemy
     */
    private static readonly skillInterruptInterval_ : number = 500.0;

    
    /**
     * キャラクタ種類
     * @public
     * @readonly
     * @type {CharacterType}
     * @memberof Enemy
     */
    public get type() : CharacterType {
        return CharacterType.Enemy;
    }
    /**
     * キャラクタID
     * @private
     * @type {number}
     * @memberof Enemy
     */
    private characterId_ : number;
    /**
     * キャラクタID
     * @public
     * @type {number}
     * @memberof Enemy
     */
    public get id() : number { return this.characterId_; }
    public set id(_id:number){ this.characterId_ = _id; }
    /**
     * 戦場ID
     * @private
     * @type {number}
     * @memberof Enemy
     */
    private battlefieldId_ : number;
    /**
     * 戦場ID
     * @public
     * @readonly
     * @type {number}
     * @memberof Enemy
     */
    public get battlefieldId() : number {
        return this.battlefieldId_;
    }
    /**
     * 戦場にいるか
     * @public
     * @readonly
     * @type {boolean}
     * @memberof Player
     */
    public get isJoinedBattlefield() : boolean {
        return (this.battlefieldId_ >= 0);
    }
    /**
     * ターゲット情報
     * @private
     * @type {Array<EnemyTarget>}
     * @memberof Enemy
     */
    private targetArray_ : Array<EnemyTarget>;
    /**
     * マップID
     * @private
     * @type {number}
     * @memberof Enemy
     */
    private mapId_ : number;
    /**
     * マップID
     * @public
     * @readonly
     * @type {number}
     * @memberof Enemy
     */
    public get mapId() : number { return this.mapId_; }
    /**
     * トランスフォーム
     * @private
     * @type {Transform}
     * @memberof Enemy
     */
    private transform_ : Transform;
    /**
     * トランスフォーム
     * @public
     * @readonly
     * @type {Transform}
     * @memberof Enemy
     */
    public get transform() : Transform { return this.transform_; }
    /**
     * 敵ステータス
     * @private
     * @type {EnemyStatus}
     * @memberof Enemy
     */
    private enemyStatus_ : EnemyStatus;
    /**
     * キャラクタステータス
     * @public
     * @readonly
     * @type {CharacterStatus}
     * @memberof Enemy
     */
    public get status() : CharacterStatus { return this.enemyStatus_; }
    /**
     * 死んでいるかのフラグ
     * @public
     * @readonly
     * @type {boolean}
     * @memberof Enemy
     */
    public get isDead() : boolean {
        return this.status.isDead;
    }
    /**
     * 種族ID
     * @private
     * @type {number}
     * @memberof Enemy
     */
    private tribeId_ : number;
    /**
     * 種族ID
     * @public
     * @readonly
     * @type {number}
     * @memberof Enemy
     */
    public get tribeId() : number { return this.tribeId_; }
    /**
     * 更新モード
     * @private
     * @type {EnemyUpdateMode}
     * @memberof Enemy
     */
    private updateMode_ : EnemyUpdateMode;
    /**
     * 現在の更新メソッド
     * @private
     * @type {function}
     * @memberof Enemy
     */
    private currentUpdateMethod_ : (_elapsedTime:number)=>boolean;
    /**
     * 休憩時間
     * @private
     * @type {number}
     * @memberof Enemy
     */
    private restTime_ : number;
    /**
     * 歩いて近づく位置
     * @private
     * @type {Vector3}
     * @memberof Enemy
     */
    private toWalkPosition_ : Vector3;
    /**
     * 戦闘モード
     * @private
     * @type {EnemyBattleMode}
     * @memberof Enemy
     */
    private battleMode_ : EnemyBattleMode;
    /**
     * 現在のバトルメソッド
     * @private
     * @type {function}
     * @memberof Enemy
     */
    private currentBattleMethod_ : (_elapsedTime:number)=>boolean;
    /**
     * デバッグ用:次の戦闘行動で動くか
     * @private
     * @type {boolean}
     * @memberof Enemy
     */
    private isNextMoveOfButtleAction_ : boolean;


    /**
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof Enemy
     */
    public constructor(){
        this.characterId_ = -1;
        this.battlefieldId_ = -1;
        this.targetArray_ = new Array<EnemyTarget>()
        this.mapId_ = -1;
        this.transform_ = new Transform();
        this.enemyStatus_ = new EnemyStatus(this);
        this.tribeId_ = 0;
        this.updateMode_ = EnemyUpdateMode.Normal;
        this.currentUpdateMethod_ = this.UpdateOfNormal;
        this.restTime_ = 0;
        this.toWalkPosition_ = new Vector3();
        this.battleMode_ = EnemyBattleMode.ActionJudge;
        this.currentBattleMethod_ = this.ButtleOfActionJudge;
        this.isNextMoveOfButtleAction_ = true;
    }


    /**
     * 初期化処理
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public Initialize() : boolean {
        this.enemyStatus_.Initialize();
        this.Populate();
        return true;
    }

    /**
     * 更新処理
     * @public
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof Enemy
     */
    public Update(_elapsedTime:number) : boolean {
        const isSuccess = this.currentUpdateMethod_(_elapsedTime);
        return isSuccess;
    }

    /**
     * 終了処理
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public Finalize() : boolean {
        return true;
    }


    /**
     * スキルが使用できるか?
     * @public
     * @param {number} _skillId 確認するスキルのID
     * @returns {boolean} true:できる false:できない
     * @memberof Enemy
     */
    IsUsableSkill(_skillId:number) : boolean {
        return (_skillId === this.enemyStatus_.tribeStatus.useSkillId);
    }

    /**
     * スキル使用
     * @public
     * @param {number} _skillId 使うスキルのID
     * @param {number} _receiverId スキルを受けるキャラクタのID
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public UseSkill(_skillId:number, _receiverId:number) : boolean {
        if(!(this.IsUsableSkill(_skillId))){
            console.error("Couldn't use a skill. [skill id : " + _skillId.toString() + "]");
            return false;
        }
        const skillEffect:SkillEffect|undefined = SkillEffectManager.instance.FindSkillEffect(_skillId);
        if(skillEffect === undefined){
            console.error("Couldn't find a skill effect. [skill id : " + _skillId.toString() + "]");
            return false;
        }
        const receiver:Character|undefined = CharacterManager.instance.FindCharacter(_receiverId);
        if(receiver === undefined){
            console.error("Couldn't find a receiver. [id : " + _receiverId.toString() + "]");
            return false;
        }
        
        if(skillEffect.Consume(this)){
            return skillEffect.Show(this, receiver);
        }
        return false;
    }

    /**
     * ダメージを受ける
     * @public
     * @param {Character} _attacker 攻撃キャラクタ
     * @param {number} _hitPointDamage 体力ダメージ
     * @param {number} _magicPointDamage 魔力ダメージ
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public ReceiveDamage(_attacker:Character, _hitPointDamage:number, _magicPointDamage:number) : boolean {
        // HP,MP更新
        this.status.hitPoint = this.status.hitPoint - _hitPointDamage;
        this.status.magicPoint = this.status.magicPoint - _magicPointDamage;

        if(this.isJoinedBattlefield){
            // 自身が戦場に入っているなら
            // 攻撃してきたキャラクタを自身と同じ戦場に引きずり込む
            _attacker.JoinBattlefield(this.battlefieldId_, true);
        }
        else if(_attacker.isJoinedBattlefield){
            // 自信が入っていなくて相手が戦場に入っているなら
            // 攻撃してきたキャラクタの戦場に入る
            this.JoinBattlefield(_attacker.battlefieldId, true);
        }
        else{
            // 両方戦場に入っていないなら新たな戦場を作成し、双方とも加入する
            const battlefield:Battlefield = BattlefieldManager.instance.Create(this.characterId_);
            this.JoinBattlefield(battlefield.id, true);
            _attacker.JoinBattlefield(battlefield.id, true);
        }

        // バトルモードでなければバトルモードへ
        if(this.updateMode_ !== EnemyUpdateMode.Battle){
            this.OnBattle();
        }

        return true;
    }
    
    /**
     * 戦場に入る
     * @public
     * @param {number} _battlefieldId 戦場ID
     * @param {boolean} _isCall 周りに通知するかのフラグ
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public JoinBattlefield(_battlefieldId:number, _isCall:boolean) : boolean {
        if(_battlefieldId < 0){
            // IDが不正なら何もしない
            return false;
        }
        if(_battlefieldId === this.battlefieldId_){
            // 既に入っている戦場なら何もしない
            return false;
        }

        if(_isCall){
            // 通知
            if(this.isJoinedBattlefield){
                // 現在戦場に入っている場合なら、同じ戦場にいるキャラクタを引きずり込む
                const currentBattlefield:Battlefield|undefined = BattlefieldManager.instance.Search(this.battlefieldId_);
                if(currentBattlefield === undefined){
                    return false;
                }
                const toBattlefield:Battlefield|undefined = BattlefieldManager.instance.Search(_battlefieldId);
                if(toBattlefield === undefined){
                    return false;
                }

                // 先戦場の戦場に全キャラクタを移動して元の戦場を削除
                currentBattlefield.MoveAllCharacters(toBattlefield);
                BattlefieldManager.instance.Delete(currentBattlefield.id);
            }
        }

        this.battlefieldId_ = _battlefieldId;
        return true;
    }
    /**
     * 戦場から出た
     * @public
     * @memberof Enemy
     */
    public OnRemovedBattlefield() : void {
        this.battlefieldId_ = -1;
    }

    /**
     * ヘイト変更
     * @public
     * @param {Character} _target ターゲット
     * @param {number} _hateDifference ヘイト差分
     * @memberof Enemy
     */
    public ChangeHate(_target:Character, _hateDifference:number) : void {
        // ターゲットデータを探す
        let enemyTarget:EnemyTarget|undefined = this.FindTargetData(_target);
        if(enemyTarget === undefined){
            enemyTarget = new EnemyTarget(_target);
            this.targetArray_.push(enemyTarget);
        }
        enemyTarget.hate = enemyTarget.hate + _hateDifference;
    }


    /**
     * 通常状態になるときの処理
     * @public
     * @memberof Enemy
     */
    public OnNormal() : void {
        this.updateMode_ = EnemyUpdateMode.Normal;
        this.currentUpdateMethod_ = this.UpdateOfNormal;
        this.ResetTargetArray();
        
        console.log('enemy [id:' + this.characterId_.toString() + '] is normal mode.');
    }
    /**
     * 戦闘するときの処理
     * @public
     * @memberof Enemy
     */
    public OnBattle() : void {
        this.updateMode_ = EnemyUpdateMode.Battle;
        this.currentBattleMethod_ = this.ButtleOfActionJudge;
        this.currentUpdateMethod_ = this.UpdateOfBattle;

        console.log('enemy [id:' + this.characterId_.toString() + '] is battle mode.');
    }
    /**
     * 死んだときの処理
     * @public
     * @memberof Enemy
     */
    public OnDead() : void {
        this.battlefieldId_ = -1;
        this.restTime_ = Enemy.repopulateInterval_;
        this.currentUpdateMethod_ = this.UpdateOfDead;
        this.ResetTargetArray();
        
        console.log('enemy [id:' + this.characterId_.toString() + '] is dead mode.');
    }

    /**
     * 戦闘行動選択するときの処理
     * @public
     * @memberof Enemy
     */
    public OnChangeButtleModeOfActionJudge() : void {
        this.battleMode_ = EnemyBattleMode.ActionJudge;
        this.currentBattleMethod_ = this.ButtleOfActionJudge;
    }
    /**
     * 戦闘移動するときの処理
     * @public
     * @memberof Enemy
     */
    public OnChangeButtleModeOfMove() : void {
        this.battleMode_ = EnemyBattleMode.Move;
        this.currentBattleMethod_ = this.ButtleOfMove;
        this.restTime_ = Enemy.battleMoveInterval_;

        // console.log('enemy [id:' + this.characterId_.toString() + '] change battle mode of move.');
    }
    /**
     * スキルを使用するときの処理
     * @public
     * @memberof Enemy
     */
    public OnChangeBattleModeOfSkillUse() : void {
        const skill:SkillData|undefined = SkillDataAccessor.instance.Find(this.enemyStatus_.tribeStatus.useSkillId);
        if(skill === undefined){
            console.error('enemy [id:' + this.characterId_.toString() + '] don\'t use skill.');
            return;
        }

        // キャストタイム設定
        this.restTime_ = skill.castTime;
        this.OnChangeBattleModeOfCastTimeConsumption();

        // スキル使用情報送信
        this.SendUseSkill();

        // console.log('enemy [id:' + this.characterId_.toString() + '] change battle mode of skill use.');
    }
    /**
     * キャストタイムに移行するときの処理
     * @private
     * @memberof Enemy
     */
    private OnChangeBattleModeOfCastTimeConsumption() : void {
        this.battleMode_ = EnemyBattleMode.Cast;
        this.currentBattleMethod_ = this.ButtleOfSkillCastTimeConsumption;
    }
    /**
     * リキャストタイムに移行するときの処理
     * @private
     * @memberof Enemy
     */
    private OnChangeBattleModeOfRecastTimeConsumption() : void {
        this.battleMode_ = EnemyBattleMode.Recast;
        this.currentBattleMethod_ = this.ButtleOfSkillCastTimeConsumption;
    }


    /**
     * 種族の変更
     * @public
     * @param {number} _tribeID 種族ID
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public ChangeTribe(_tribeID:number) : boolean 
    /**
     * 種族の変更
     * @public
     * @param {string} _tribeName 種族名
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public ChangeTribe(_tribeName:string) : boolean 
    /**
     * 種族変更の実装
     * @public
     * @param {number|string} _tribeKey 種族キー
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public ChangeTribe(_tribeKey:number|string) : boolean {
        // データベース情報から読み込み
        const tribeData:EnemyTribeData|undefined =
            EnemyTribeDataAccessor.instance.Find(_tribeKey);

        if(tribeData === undefined){
            if(typeof(_tribeKey) === 'number'){
                console.error('Couldn\'t find enemy data. [id:' + _tribeKey.toString() + ']');
            }
            else if(typeof(_tribeKey) === 'string'){
                console.error('Couldn\'t find enemy data. [name:' + _tribeKey + ']');
            }
            return false;
        }

        if(typeof(_tribeKey) === 'number'){
            this.tribeId_ = _tribeKey;
        }

        if(!(this.enemyStatus_.tribeStatus.ChangeTribe(tribeData))){
            return false;
        }
        this.enemyStatus_.Initialize();
        return true;
    }

    /**
     * ターゲット配列リセット
     * @private
     * @memberof Enemy
     */
    private ResetTargetArray() : void {
        this.targetArray_ = new Array<EnemyTarget>();
    }

    /**
     * 通常状態時の更新処理
     * @private
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof Enemy
     */
    private UpdateOfNormal(_elapsedTime:number) : boolean {
        // バトルに移行するか判定
        if(this.IsChangeBattleMode()){
            this.OnBattle();
        }
        
        if(this.restTime_ > 0.0){
            // 待機状態なら動かない
            this.restTime_ -= _elapsedTime;
            if(this.restTime_ < 0.0){
                this.restTime_ = 0.0;
            }
        }
        else{
            // 通常移動
            if(this.IsArrivedWalkPosition()){
                this.ChangeWalkPosition();
            }
            this.Walk(_elapsedTime);

            // 目的地に到着したら待機状態へ
            if(this.IsArrivedWalkPosition()){
                this.restTime_ = Enemy.walkEndInterval_;
            }
        }

        this.SendTransform(this.mapId);
        this.SendSimpleDisplay();
        return true;
    }
    /**
     * 戦闘モードに移行するか?
     * @private
     * @returns {boolean} true:する false:しない
     * @memberof Enemy
     */
    private IsChangeBattleMode() : boolean {
        // TODO:
        return false;
    }
    /**
     * 歩き目的地に到着したか?
     * @private
     * @returns {boolean} true:した false:してない
     * @memberof Enemy
     */
    private IsArrivedWalkPosition() : boolean {
        const delta:Vector3 = this.toWalkPosition_.Subtraction(this.transform.worldMatrix.column4.xyz);
        // TODO:
        const checkRange:number = 0.1;
        const checkValue:number = checkRange*checkRange;
        const isChange:boolean = (delta.lengthSquared < checkValue);
        return isChange;
    }
    /**
     * 歩き目的地変更
     * @private
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    private ChangeWalkPosition() : boolean {
        const area:EnemyPopAreaData|undefined = EnemyPopAreaDataAccessor.instance.Find(this.mapId_);
        if(area === undefined){
            return false;
        }

        const direction:number = 2.0*Math.PI * (Math.random()-0.5);
        const delta:number = area.areaRadius * Math.random();
        this.toWalkPosition_ = new Vector3(
            area.positionX + delta*Math.cos(direction),
            area.positionY,
            area.positionZ + delta*Math.sin(direction)
        );

        return true;
    }
    /**
     * 歩く
     * @private
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    private Walk(_elapsedTime:number) : boolean {
        // 目的地に近づく
        const toWalkMatrix:Matrix4x4 = Matrix4x4.identity;
        toWalkMatrix.column4.xyz = this.toWalkPosition_;
        const toPosition:Vector3 = toWalkMatrix.Multiplication(this.transform_.worldMatrix.invertMatrix).column4.xyz;
        const move:Vector3 = new Vector3(0, 0, 0);
            
        // TODO:最大回転量
        const maxRotation:number = 0.5;

        let rotation:number = 0.0;
        // 前に進む
        if(toPosition.z > 0.0){
            // TODO:最大移動量
            const maxMoveDistance:number = 0.5;

            // 移動量と回転量を計算
            const moveDistance:number = (toPosition.z>maxMoveDistance) ? (maxMoveDistance) : (toPosition.z);
            // 移動
            move.z += moveDistance * (_elapsedTime / 1000.0);

            // 回転量を計算
            rotation = maxRotation*(toPosition.x*toPosition.x)/(toPosition.x*toPosition.x + toPosition.z*toPosition.z);
            if(toPosition.x < 0.0){
                rotation = -rotation;
            }
        }
        else{
            // 回転量を計算
            rotation = (toPosition.x < 0.0) ? (-maxRotation) : (maxRotation);
        }

        // 移動、回転
        const transformMatrix:Matrix4x4 = Matrix4x4.CreateRotationYMatrix(-rotation * (_elapsedTime / 1000.0));
        transformMatrix.column4.xyz = move;
        this.transform_.worldMatrix = transformMatrix.Multiplication(this.transform_.worldMatrix);

        return true;
    }
    /**
     * 戦闘状態時の更新処理
     * @private
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof Enemy
     */
    private UpdateOfBattle(_elapsedTime:number) : boolean {
        this.UpdateOfAllTargetHate(_elapsedTime);
        const result = this.currentBattleMethod_(_elapsedTime);

        this.SendTransform(this.mapId);
        this.SendSimpleDisplay();
        return result;
    }
    /**
     * 全ターゲットのヘイト更新
     * @private
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof Enemy
     */
    private UpdateOfAllTargetHate(_elapsedTime:number) : boolean {
        // TODO: ヘイト減少量算出
        const downHate = 0.3 * _elapsedTime / 1000.0;

        this.targetArray_.forEach(function(
            _enemyTarget : EnemyTarget,
            _index : number,
            _array : EnemyTarget[]
        ) : void {
            _enemyTarget.hate = _enemyTarget.hate - downHate;
        });

        // ヘイトが高い順にソート
        this.targetArray_ = this.targetArray_.sort(function(
            _left : EnemyTarget,
            _right : EnemyTarget
        ) : number {
            return (_right.hate - _left.hate);
        });

        return true;
    }
    /**
     * 死んでいる時の更新処理
     * @private
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof Enemy
     */
    private UpdateOfDead(_elapsedTime:number) : boolean {
        this.restTime_ -= _elapsedTime;
        if(this.restTime_ < 0){
            this.Populate();
        }
        return true;
    }

    /**
     * バトル行動判定
     * @private
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof Enemy
     */
    private ButtleOfActionJudge(_elapsedTime:number) : boolean {
        // 各行動ポイントの計算
        const movePoint:number = this.CalculateBattleMovePoint();
        const useSkillPoint:number = this.CalculateBattleUseSkillPoint();

        // 点数が一番高い行動をする
        if(movePoint < useSkillPoint){
            this.isNextMoveOfButtleAction_ = true;
            this.OnChangeBattleModeOfSkillUse();
        }
        else{
            this.isNextMoveOfButtleAction_ = false;
            this.OnChangeButtleModeOfMove();
        }

        return true;
    }
    /**
     * 戦闘行動ポイントの計算
     * @private
     * @returns {number} 戦闘行動ポイント
     * @memberof Enemy
     */
    private CalculateBattleMovePoint() : number {
        // TODO:
        return (this.isNextMoveOfButtleAction_ ? 1 : 0);
    }
    /**
     * 戦闘スキル使用ポイントの計算
     * @private
     * @returns {number} 戦闘スキル使用ポイント
     * @memberof Enemy
     */
    private CalculateBattleUseSkillPoint() : number {
        // TODO:
        return (this.isNextMoveOfButtleAction_ ? 0 : 1);
    }
    /**
     * バトル移動
     * @private
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof Enemy
     */
    private ButtleOfMove(_elapsedTime:number) : boolean {
        // 相手の場所に近づく
        const battleCharacter:Character|undefined = this.GetBattleCharacter();
        if(battleCharacter !== undefined){
            const battleCharacterInLocal:Matrix4x4 = battleCharacter.transform.worldMatrix.Multiplication(this.transform_.worldMatrix.invertMatrix);
            const toPosition:Vector3 = battleCharacterInLocal.column4.xyz;
            const move:Vector4 = new Vector4(0, 0, 0, 1);
            
            // TODO:最大回転量
            const maxRotation:number = 1.0;

            let rotation:number = 0.0;
            // 前に進む
            if(toPosition.z > 0.0){
                // TODO:最大移動量
                const maxMoveDistance:number = 1.0;

                // 移動量と回転量を計算
                const moveDistance:number = (toPosition.z>maxMoveDistance) ? (maxMoveDistance) : (toPosition.z);
                // 移動
                move.z += moveDistance * (_elapsedTime / 1000.0);

                // 回転量を計算
                rotation = maxRotation*(toPosition.x*toPosition.x)/(toPosition.x*toPosition.x + toPosition.z*toPosition.z);
            }
            else{
                // 回転量を計算
                rotation = (toPosition.x < 0.0) ? (-maxRotation) : (maxRotation);
            }

            // 移動、回転
            const transformMatrix:Matrix4x4 = Matrix4x4.CreateRotationYMatrix(-rotation * (_elapsedTime / 1000.0));
            transformMatrix.column4 = move;
            this.transform_.worldMatrix = transformMatrix.Multiplication(this.transform_.worldMatrix);
        }
        else{
            // 向かうキャラクタがいない
            console.error("enemy [id:" + this.id.toString() + "] didn't find the target.");
            this.OnChangeButtleModeOfActionJudge();
            return false;
        }

        // 行動判定へ
        this.restTime_ -= _elapsedTime;
        if(this.restTime_ < 0.0){
            this.OnChangeButtleModeOfActionJudge();
        }
        return true;
    }
    /**
     * 戦闘相手キャラクタの取得
     * @private
     * @returns {(Character|undefined)} 戦闘相手キャラクタ 居なければundefined
     * @memberof Enemy
     */
    private GetBattleCharacter() : Character|undefined {
        let battleCharacter:Character|undefined = undefined;
        this.targetArray_.every(function(
            _target : EnemyTarget,
            _priority : number,
            _array : EnemyTarget[]
        ) : boolean {
            if(_target.character.isDead){
                return true;
            }
            battleCharacter = _target.character;
            return false;
        });
        return battleCharacter;
    }
    /**
     * バトルスキルのキャストタイム消費
     * @private
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof Enemy
     */
    private ButtleOfSkillCastTimeConsumption(_elapsedTime:number) : boolean {
        this.restTime_ -= _elapsedTime;
        if(this.restTime_ < 0.0){
            //console.log("enemy [id:" + this.id.toString() + "] use skill.");

            // Comment: 攻撃判定はクライアントが行う

            // リキャストタイム消費モードへ
            const skill:SkillData|undefined = SkillDataAccessor.instance.Find(this.enemyStatus_.tribeStatus.useSkillId);
            if(skill === undefined){
                console.error('enemy [id:' + this.characterId_.toString() + '] don\'t use skill.');
                return true;
            }
            this.restTime_ = skill.recastTime;
            this.OnChangeBattleModeOfRecastTimeConsumption();
        }
        return true;
    }
    /**
     * バトルスキルのリキャストタイム消費
     * @private
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof Enemy
     */
    private ButtleOfSkillRecastTimeConsumption(_elapsedTime:number) : boolean {
        this.restTime_ -= _elapsedTime;
        if(this.restTime_ < 0.0){
            // 行動判定へ
            this.OnChangeButtleModeOfActionJudge();
        }
        return true;
    }
    /**
     * 使用中スキルを中断する
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public InterruptTheUsingSkill() : boolean {
        // スキルのキャストタイムでなければ失敗
        if(this.updateMode_ !== EnemyUpdateMode.Battle){
            return false;
        }
        else if(this.battleMode_ !== EnemyBattleMode.Cast){
            return false;
        }

        // (リキャスト)タイム消費モードへ
        this.restTime_ = Enemy.skillInterruptInterval_;
        this.OnChangeBattleModeOfRecastTimeConsumption();
        return true;
    }


    /**
     * ポップ
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public Populate() : boolean {
        this.ChangeTribe(EnemyTribeDataAccessor.instance.GetRandomID(), 1);

        // TODO:
        const area:EnemyPopAreaData|undefined = EnemyPopAreaDataAccessor.instance.Find(0);
        if(area === undefined){
            console.error('Couldn\'t get pop area.');
            return false;
        }

        this.mapId_ = area.mapId;

        this.transform.worldMatrix = Matrix4x4.CreateRotationYMatrix(2.0*Math.PI * (Math.random()-0.5));
        {
            const direction:number = 2.0*Math.PI * (Math.random()-0.5);
            const delta:number = area.areaRadius * Math.random();
            this.transform.position = new Vector3(
                area.positionX + delta*Math.cos(direction),
                area.positionY,
                area.positionZ + delta*Math.sin(direction)
            );
        }

        this.ChangeWalkPosition();

        this.restTime_ = 0;
        this.OnNormal();

        return true;
    }

    /**
     * ターゲット情報の取得
     * @private
     * @param {Character} _target ターゲットキャラクタ
     * @returns {(EnemyTarget|undefined)} ターゲット情報 なければundefined
     * @memberof Enemy
     */
    private FindTargetData(_target:Character) : EnemyTarget|undefined{
        return this.targetArray_.filter(function (
            _enemyTarget : EnemyTarget,
            _index : number,
            _array : EnemyTarget[]
        ) : boolean {
            return (_enemyTarget.character.id === _target.id);
        }).shift();
    }
    /**
     * ターゲット削除
     * @public
     * @param {Character} _target ターゲットキャラクタ
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public RemoveTarget(_target:Character) : boolean {
        let isRemoved:boolean = false;
        this.targetArray_ = this.targetArray_.filter(function (
            _enemyTarget : EnemyTarget,
            _index : number,
            _array : EnemyTarget[]
        ) : boolean {
            if(_enemyTarget.character.id === _target.id){
                isRemoved = true;
                return false;
            }
            return true;
        });
        return isRemoved;
    }


    /**
     * 位置情報送信
     * @private
     * @param {number} _toMapId 送信先マップID
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    private SendTransform(_toMapId:number) : boolean {
        const data : CommunicationData.SendData.CharacterTransform =
            new CommunicationData.SendData.CharacterTransform();
        
        data.user_id = this.id;
        data.map_id = this.mapId;
        data.x = this.transform.position.x;
        data.y = this.transform.position.y;
        data.z = this.transform.position.z;
        data.dir = this.transform.rotationY;

        return true;
        //return CharacterManager.instance.Send(this.id, _toMapId, JSON.stringify(data));
    }
    /**
     * 簡易表示情報送信
     * @private
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    private SendSimpleDisplay() : boolean {
        const data : CommunicationData.SendData.SimpleDisplayOfCharacter =
            new CommunicationData.SendData.SimpleDisplayOfCharacter();

        data.user_id = this.characterId_;
        data.hp = 100.0 * this.status.hitPoint / this.status.maxHitPoint;
        data.mp = 100.0 * this.status.magicPoint / this.status.maxMagicPoint;
        data.status = this.status.abnormalConditionStatus.flag;

        return true;
        //return CharacterManager.instance.Send(this.id, this.mapId, JSON.stringify(data));
    }
    /**
     * スキル使用情報送信
     * @private
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    private SendUseSkill() : boolean {
        const data : CommunicationData.SendData.SkillUse =
            new CommunicationData.SendData.SkillUse();

        data.user_id = this.characterId_;
        data.skill_id = this.enemyStatus_.tribeStatus.useSkillId;

        return CharacterManager.instance.Send(this.id, this.mapId, JSON.stringify(data));
    }
}
