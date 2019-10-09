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
import { Matrix4x4 } from './Matrix4x4'

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
    private static readonly repopulateInterval_ : number = 3.0;


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
     * 現在の更新メソッド
     * @private
     * @type {function}
     * @memberof Enemy
     */
    private currentUpdateMethod_ : (_elapsedTime:number)=>boolean;
    /**
     * リポップタイム
     * @private
     * @type {number}
     * @memberof Enemy
     */
    private repopulateTime_ : number;


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
        this.enemyStatus_ = new EnemyStatus();
        this.currentUpdateMethod_ = this.UpdateOfNormal;
        this.repopulateTime_ = 0;
    }


    /**
     * 初期化処理
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public Initialize() : boolean {
        this.enemyStatus_.Initialize();
        this.currentUpdateMethod_ = this.UpdateOfNormal;
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
     * 死んだときの処理
     * @private
     * @memberof Enemy
     */
    private OnDead() : void {
        this.repopulateTime_ = Enemy.repopulateInterval_;
        this.currentUpdateMethod_ = this.UpdateOfDead;
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
        // TODO:
        this.enemyStatus_.hitPoint = Math.floor(0.5 * this.enemyStatus_.hitPoint);

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
        // TODO:
        this.SendTransform(this.mapId);
        this.SendSimpleDisplay();
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
        this.repopulateTime_ -= _elapsedTime;
        if(this.repopulateTime_ < 0){
            this.Populate();
        }
        return true;
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

        this.mapId_ = area.mapID_;
        {
            const direction:number = 2.0*Math.PI * (Math.random()-0.5);
            const rotation:Matrix4x4 = Matrix4x4.identity;
            const cosValue:number = Math.cos(direction);
            const sinValue:number = Math.sin(direction);
            rotation.column1.x = cosValue;
            rotation.column1.z = sinValue;
            rotation.column3.x = -sinValue;
            rotation.column3.z = cosValue;
            this.transform.worldMatrix = rotation;
        }
        {
            const direction:number = 2.0*Math.PI * (Math.random()-0.5);
            const delta:number = area.popAreaRadius_ * Math.random();
            this.transform.position = new Vector3(
                area.positionX_ + delta*Math.cos(direction),
                0.0,
                area.positionZ_ + delta*Math.sin(direction)
            );
        }

        this.repopulateTime_ = 0;

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
}
