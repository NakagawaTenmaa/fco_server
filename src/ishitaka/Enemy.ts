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
import {EnemyPopAreaData} from './DatabaseAccessors/EnemyPopAreaDataAccessor'
import {Vector3} from './Vector3'
import {Matrix4x4} from './Matrix4x4'
import {SkillData, SkillDataAccessor} from './DatabaseAccessors/SkillDataAccessor'
import {SkillEffectManager} from './SkillEffectManager'
import {SkillEffect} from './SkillEffect'
import {Battlefield} from './Battlefield'
import {BattlefieldManager} from './BattlefieldManager'
import {EnemyUpdater} from './EnemyUpdater'
import {EnemyUpdateMode} from './EnemyUpdate'
import {EnemyPopArea} from './EnemyPopArea'
import {EnemyPopAreaManager} from './EnemyPopAreaManager'

/**
 * 敵
 * @export
 * @class Enemy
 * @implements {Character}
 */
export class Enemy implements Character{
    /**
     * 最大ポップ挑戦数
     * @private
     * @static
     * @type {number}
     * @memberof Enemy
     */
    private static readonly maxTryPopCount : number = 100;

    
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
     * ポップエリア
     * @private
     * @type {(EnemyPopArea|undefined)}
     * @memberof Enemy
     */
    private popArea_ : EnemyPopArea|undefined;
    /**
     * ポップエリア
     * @private
     * @readonly
     * @type {(EnemyPopArea|undefined)}
     * @memberof Enemy
     */
    private get popArea() : EnemyPopArea|undefined {
        return this.popArea_;
    }
    /**
     * マップID
     * @public
     * @readonly
     * @type {number}
     * @memberof Enemy
     */
    public get mapId() : number {
        if(this.popArea === undefined){
            return -1;
        }
        return this.popArea.data.mapId;
    }
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
     * スキルのキャストタイム
     * @public
     * @readonly
     * @type {number}
     * @memberof Enemy
     */
    public get skillCastTime() : number {
        const skill:SkillData|undefined = SkillDataAccessor.instance.Find(this.enemyStatus_.tribeStatus.useSkillId);
        if(skill === undefined){
            return 0.0;
        }
        return skill.castTime;
    }
    /**
     * スキルのリキャストタイム
     * @public
     * @readonly
     * @type {number}
     * @memberof Enemy
     */
    public get skillRecastTime() : number {
        const skill:SkillData|undefined = SkillDataAccessor.instance.Find(this.enemyStatus_.tribeStatus.useSkillId);
        if(skill === undefined){
            return 0.0;
        }
        return skill.recastTime;
    }
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
     * 敵の更新者
     * @private
     * @type {EnemyUpdater}
     * @memberof Enemy
     */
    private updater_ : EnemyUpdater;
    /**
     * 敵の更新者
     * @public
     * @type {EnemyUpdater}
     * @memberof Enemy
     */
    public get updater() : EnemyUpdater {
        return this.updater_;
    }


    /**
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof Enemy
     */
    public constructor(){
        this.characterId_ = -1;
        this.battlefieldId_ = -1;
        this.popArea_ = undefined;
        this.transform_ = new Transform();
        this.enemyStatus_ = new EnemyStatus(this);
        this.tribeId_ = 0;
        this.updater_ = new EnemyUpdater(this);
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
        const isSuccess = this.updater.Update(_elapsedTime);
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
     * 通常状態になるときの処理
     * @public
     * @memberof Enemy
     */
    public OnNormal() : void {
        this.updater.ChangeMode(EnemyUpdateMode.Normal);
    }
    /**
     * 死んだときの処理
     * @public
     * @memberof Enemy
     */
    public OnDead() : void {
        this.updater.ChangeMode(EnemyUpdateMode.Dead);
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
        if(this.updater.currentState.mode !== EnemyUpdateMode.Battle){
            this.updater.ChangeMode(EnemyUpdateMode.Battle);
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
        this.updater.battleState.ChangeHate(_target, _hateDifference);
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
        else{
            this.tribeId_ = EnemyTribeDataAccessor.instance.GetId(_tribeKey);
        }

        if(!(this.enemyStatus_.tribeStatus.ChangeTribe(tribeData))){
            return false;
        }
        this.enemyStatus_.Initialize();
        return true;
    }

    /**
     * 使用中スキルを中断する
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public InterruptTheUsingSkill() : boolean {
        // 戦闘モードでなければ失敗
        if(this.updater.currentState.mode !== EnemyUpdateMode.Battle){
            return false;
        }
        return this.updater.battleState.updater.OnInterruptSkill();
    }


    /**
     * ポップ
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public Populate() : boolean {
        // エリアから外れる
        const currentPopArea:EnemyPopArea|undefined = this.popArea;
        if(currentPopArea !== undefined){
            currentPopArea.OnDeadEnemy(this.tribeId);
        }

        // 種族IDとエリアの選定
        let tryPopCount = 0;
        let popAreaArray:Array<EnemyPopArea> = new Array<EnemyPopArea>();
        let area:EnemyPopArea|undefined = this.popArea;
        while(tryPopCount < Enemy.maxTryPopCount){
            this.ChangeTribe(EnemyTribeDataAccessor.instance.GetRandomID());

            popAreaArray = EnemyPopAreaManager.instance.FindPopAreaArray(this.tribeId);
            if(popAreaArray.length == 0){
                ++tryPopCount;
                continue;
            }

            const getting:number = Math.floor(popAreaArray.length * Math.random());
            let i:number = 0;
            popAreaArray.every(
                function(
                    _area : EnemyPopArea,
                    _id : number,
                    _array : EnemyPopArea[]
                ) : boolean {
                    if(i === 0){
                        area = _area;
                    }
                    if(i == getting){
                        area = _area;
                        return false;
                    }
                    ++i;
                    return true;
                }
            );
            break;
        }
        if(area === undefined){
            console.error('Couldn\'t get pop area.');
            return false;
        }

        this.popArea_ = area;

        this.transform.worldMatrix = Matrix4x4.CreateRotationYMatrix(2.0*Math.PI * (Math.random()-0.5));
        {
            const direction:number = 2.0*Math.PI * (Math.random()-0.5);
            const delta:number = area.data.areaRadius * Math.random();
            this.transform.position = new Vector3(
                area.data.positionX + delta*Math.cos(direction),
                area.data.positionY,
                area.data.positionZ + delta*Math.sin(direction)
            );
        }

        //console.log("Enemy pop. [id:" + this.id.toString() + ", map:" + this.mapId.toString() + "]");
        this.updater.ChangeMode(EnemyUpdateMode.Normal);

        return true;
    }
    /**
     * ターゲット削除
     * @public
     * @param {Character} _target ターゲットキャラクタ
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public RemoveTarget(_target:Character) : boolean {
        return this.updater.battleState.RemoveTarget(_target);
    }


    /**
     * スキルリクエスト情報送信
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public SendUseSkillRequest() : boolean {
        const data : CommunicationData.SendData.EnemyUseSkillRequest =
            new CommunicationData.SendData.EnemyUseSkillRequest();

        data.enemy_id = this.characterId_;
        data.skill_id = this.enemyStatus_.tribeStatus.useSkillId;

        return CharacterManager.instance.SendAll(JSON.stringify(data));
    }
    /**
     * スキル使用情報送信
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public SendUseSkill() : boolean {
        const data : CommunicationData.SendData.EnemyUseSkill =
            new CommunicationData.SendData.EnemyUseSkill();

        data.enemy_id = this.characterId_;
        data.skill_id = this.enemyStatus_.tribeStatus.useSkillId;

        return CharacterManager.instance.SendAll(JSON.stringify(data));
    }
}
