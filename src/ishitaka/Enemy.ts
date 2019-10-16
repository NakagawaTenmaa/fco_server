/**
 * @fileoverview 敵の実装ファイル
 * @file Enemy.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Character} from './Character'
import {CharacterStatus} from './CharacterStatus'
import {EnemyStatus} from './EnemyStatus'
import {Transform} from './Transform'
import {CharacterEffect} from './CharacterEffect'
import {EnemyTribeData,EnemyTribeDataAccessor} from './DatabaseAccessors/EnemyTribeDataAccessor'
import {CharacterManager} from './CharacterManager'
import {CommunicationData} from './CommunicationData';
import {EnemyPopAreaData, EnemyPopAreaDataAccessor} from './DatabaseAccessors/EnemyPopAreaDataAccessor'
import {Vector3} from './Vector3'
import {Matrix4x4} from './Matrix4x4'
import {SkillData, SkillDataAccessor} from './DatabaseAccessors/SkillDataAccessor'

/**
 * 敵更新モード
 * @enum {number}
 */
enum EnemyUpdateMode{
    /**
     * 通常モード
     * @memberof EnemyUpdateMode
     */
    Normal,
    /**
     * 戦闘モード
     * @memberof EnemyUpdateMode
     */
    Battle
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
     * 戦闘相手のキャラクタID
     * @private
     * @type {number}
     * @memberof Enemy
     */
    private battleCharacterId_ : number;
    /**
     * 現在のバトルメソッド
     * @private
     * @type {function}
     * @memberof Enemy
     */
    private currentBattleMethod_ : (_elapsedTime:number)=>boolean;


    /**
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof Enemy
     */
    public constructor(){
        this.characterId_ = -1;
        this.mapId_ = -1;
        this.transform_ = new Transform();
        this.enemyStatus_ = new EnemyStatus(this);
        this.updateMode_ = EnemyUpdateMode.Normal;
        this.currentUpdateMethod_ = this.UpdateOfNormal;
        this.restTime_ = 0;
        this.battleCharacterId_ = 0;
        this.currentBattleMethod_ = this.ButtleOfActionJudge;
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
     * 効果を受ける
     * @public
     * @param {CharacterEffect} _effect 効果
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public ReceiveAnEffect(_effect:CharacterEffect) : boolean {
        return _effect.Show(this);
    }


    /**
     * 通常状態になるときの処理
     * @public
     * @memberof Enemy
     */
    public OnNormal() : void {
        this.updateMode_ = EnemyUpdateMode.Normal;
        this.currentUpdateMethod_ = this.UpdateOfNormal;
        
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
        this.restTime_ = Enemy.repopulateInterval_;
        this.currentUpdateMethod_ = this.UpdateOfDead;
        
        console.log('enemy [id:' + this.characterId_.toString() + '] is dead mode.');
    }

    /**
     * 戦闘移動するときの処理
     * @public
     * @memberof Enemy
     */
    public OnChangeButtleModeOfMove() : void {
        this.currentBattleMethod_ = this.ButtleOfMove;

        console.log('enemy [id:' + this.characterId_.toString() + '] change battle mode of move.');
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

        this.currentBattleMethod_ = this.ButtleOfSkillCastTimeConsumption;

        // スキル使用情報送信
        this.SendUseSkill();

        console.log('enemy [id:' + this.characterId_.toString() + '] change battle mode of skill use.');
    }


    /**
     * 種族(またはレベル)の変更
     * @public
     * @param {number} _tribeID 種族ID
     * @param {number} _level レベル
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public ChangeTribe(_tribeID:number, _level:number) : boolean 
    /**
     * 種族(またはレベル)の変更
     * @public
     * @param {string} _tribeName 種族名
     * @param {number} _level レベル
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public ChangeTribe(_tribeName:string, _level:number) : boolean 
    /**
     * 種族(またはレベル)変更の実装
     * @public
     * @param {number|string} _tribeKey 種族キー
     * @param {number} _level レベル
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public ChangeTribe(_tribeKey:number|string, _level:number) : boolean {
        // データベース情報から読み込み
        const tribeData:EnemyTribeData|undefined =
            EnemyTribeDataAccessor.instance.Find(_tribeKey);

        if(tribeData === undefined){
            if((typeof _tribeKey) === 'number'){
                console.error('Couldn\'t find enemy data. [id:' + _tribeKey.toString() + ']');
            }
            else if((typeof _tribeKey) === 'string'){
                console.error('Couldn\'t find enemy data. [name:' + _tribeKey + ']');
            }
            return false;
        }

        if(!(this.enemyStatus_.tribeStatus.ChangeTribe(tribeData, _level))){
            return false;
        }
        this.enemyStatus_.Initialize();
        return true;
    }


    /**
     * 通常状態時の更新処理
     * @private
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof Enemy
     */
    private UpdateOfNormal(_elapsedTime:number) : boolean {
        this.status.hitPoint -= 1.0;
        // TODO:通常移動
        // TODO:バトルに移行するか判定

        this.SendTransform(this.mapId);
        this.SendSimpleDisplay();
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
        const result = this.currentBattleMethod_(_elapsedTime);

        this.SendTransform(this.mapId);
        this.SendSimpleDisplay();
        return result;
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
        // TODO: 各行動点数計算
        const movePoint = 0;
        const useSkillPoint = 0;

        // 点数の高いほうの行動をする
        if(movePoint < useSkillPoint){
            this.OnChangeBattleModeOfSkillUse();
        }
        else{
            this.OnChangeButtleModeOfMove();
        }

        return true;
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
        const battleCharacter:Character|undefined = CharacterManager.instance.GetCharacter(this.battleCharacterId_);
        if(battleCharacter !== undefined){
            const battleCharacterInLocal:Matrix4x4 = battleCharacter.transform.worldMatrix.invertMatrix.Multiplication(this.transform_.worldMatrix);
            const toPosition:Vector3 = battleCharacterInLocal.column4.xyz;
            
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
                this.transform_.worldMatrix.column4.z += moveDistance;

                // 回転量を計算
                rotation = maxRotation*(toPosition.x*toPosition.x)/(toPosition.x*toPosition.x + toPosition.z*toPosition.z);
            }
            else{
                // 回転量を計算
                rotation = (toPosition.x < 0.0) ? (-maxRotation) : (maxRotation);
            }

            // 回転
            this.transform_.worldMatrix = this.transform_.worldMatrix.Multiplication(Matrix4x4.CreateRotationMatrix(rotation));
        }

        // 行動判定へ
        this.currentBattleMethod_ = this.ButtleOfActionJudge;
        return true;
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
            // スキル使用
            this.UseSkill();
            // リキャストタイム消費モードへ
            const skill:SkillData|undefined = SkillDataAccessor.instance.Find(this.enemyStatus_.tribeStatus.useSkillId);
            if(skill === undefined){
                console.error('enemy [id:' + this.characterId_.toString() + '] don\'t use skill.');
                return true;
            }
            this.restTime_ = skill.recastTime;
            this.currentBattleMethod_ = this.ButtleOfSkillRecastTimeConsumption
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
            this.currentBattleMethod_ = this.ButtleOfActionJudge;
        }
        return true;
    }
    
    /**
     * スキル使用
     * @private
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof Enemy
     */
    private UseSkill() : void {
        console.log('enemy [id:' + this.characterId_.toString() + '] is use skill.');
    }


    /**
     * ポップ
     * @private
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    private Populate() : boolean {
        this.ChangeTribe(EnemyTribeDataAccessor.instance.GetRandomID(), 1);

        const area:EnemyPopAreaData|undefined = EnemyPopAreaDataAccessor.instance.Find(0);
        if(area === undefined){
            console.error('Couldn\'t get pop area.');
            return false;
        }

        this.mapId_ = area.mapId;

        this.transform.worldMatrix = Matrix4x4.CreateRotationMatrix(2.0*Math.PI * (Math.random()-0.5));
        {
            const direction:number = 2.0*Math.PI * (Math.random()-0.5);
            const delta:number = area.popAreaRadius * Math.random();
            this.transform.position = new Vector3(
                area.positionX + delta*Math.cos(direction),
                area.positionY,
                area.positionZ + delta*Math.sin(direction)
            );
        }

        this.restTime_ = 0;
        this.OnNormal();

        return true;
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

        const x : number = this.transform.worldMatrix.column1.x;
        const z : number = this.transform.worldMatrix.column1.z;
        data.dir = Math.atan2(z, x);

        return CharacterManager.instance.Send(this.id, _toMapId, JSON.stringify(data));
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

        return CharacterManager.instance.Send(this.id, this.mapId, JSON.stringify(data));
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
