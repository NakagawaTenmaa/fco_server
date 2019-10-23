/**
 * @fileoverview プレイヤーの実装ファイル
 * @file Player.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Character} from './Character'
import {CharacterStatus} from './CharacterStatus'
import {PlayerStatus} from './PlayerStatus'
import {Transform} from './Transform'
import {CharacterEffect} from './CharacterEffect'
import {CharacterManager} from './CharacterManager'
import {CommunicationData} from './CommunicationData';
import {JobData,JobDataAccessor} from './DatabaseAccessors/JobDataAccessor'
import WebSocket = require('ws')
import {  } from '../model/characterDataModel';
import { Vector3 } from './Vector3'
import { Weapon } from '../controller/object/playerWeapon'
/**
 * プレイヤー
 * @export
 * @class Player
 * @implements {Character}
 */
export class Player implements Character{
    /**
     * webソケット
     * @private
     * @type {PlayerWebSocket | null}
     * @memberof Player
     */
    private ws_: WebSocket | null;
    public set webSocket(_ws: WebSocket) { this.ws_ = _ws; }
    /**
     * DB用ID
     * @private
     * @type {number}
     * @memberof Player
     */
    private dbId_: number;
    public get dbId(): number { return this.dbId_; }
    public set dbId(_id: number) { this.dbId_ = _id; }
    /**
     * キャラクタID
     * @private
     * @type {number}
     * @memberof Player
     */
    private characterId_ : number;
    /**
     * キャラクタID
     * @public
     * @type {number}
     * @memberof Player
     */
    public get id() : number { return this.characterId_; }
    public set id(_id:number){ this.characterId_ = _id; }
    /**
     * マップID
     * @private
     * @type {number}
     * @memberof Player
     */
    private mapId_ : number;
    /**
     * マップID
     * @public
     * @readonly
     * @type {number}
     * @memberof Player
     */
    public get mapId() : number { return this.mapId_; }
    /**
     * トランスフォーム
     * @private
     * @type {Transform}
     * @memberof Player
     */
    private transform_ : Transform;
    /**
     * トランスフォーム
     * @public
     * @readonly
     * @type {Transform}
     * @memberof Player
     */
    public get transform() : Transform { return this.transform_; }
    /**
     * プレイヤーステータス
     * @private
     * @type {PlayerStatus}
     * @memberof Player
     */
    private playerStatus_ : PlayerStatus;
    /**
     * キャラクタステータス
     * @public
     * @readonly
     * @type {CharacterStatus}
     * @memberof Player
     */
    public get status() : CharacterStatus { return this.playerStatus_; }

    private playerDir_ : number;
    public get dir(): number { return this.playerDir_; }
    public set dir(_dir: number) { this.playerDir_ = _dir; }

    /**
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof Player
     */
    public constructor(){
        this.playerDir_ = -1;
        this.ws_ = null;
        this.dbId_ = -1;
        this.characterId_ = -1;
        this.mapId_ = 0;
        this.transform_ = new Transform();
        this.playerStatus_ = new PlayerStatus();
    }


    /**
     * 初期化処理
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof Player
     */
    public Initialize() : boolean {
        this.ChangeJob(0);
        this.playerStatus_.Initialize();
        return true;
    }

    /**
     * 更新処理
     * @public
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof Player
     */
    public Update(_elapsedTime:number) : boolean {
        if(!(this.Synchronize())) return false;
        this.SendTransform(this.mapId);
        this.SendSimpleDisplay();
        return true;
    }

    /**
     * 終了処理
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof Player
     */
    public Finalize() : boolean {
        return true;
    }


    /**
     * クライアントにデータを送信
     * @public
     * @param {string} _sendData 送信データ
     * @returns {boolean} true:成功 false:失敗
     * @memberof Player
     */
    public SendToClient(_sendData:string) : boolean {
        // TODO:
        if(this.ws_ === null) return false;
        const data:CommunicationData.AllTypes|undefined = CommunicationData.Converter.Convert(_sendData);
        /*
        if(data === undefined){
            console.log('Undefined data.');
        }
        else if(data instanceof CommunicationData.SendData.CharacterTransform){
            console.log('Character transform data.');
        }
        else if(data instanceof CommunicationData.SendData.SimpleDisplayOfCharacter){
            console.log('Simple display data.');
        }
        else if(data instanceof CommunicationData.SendData.ModelSetting){
            console.log('Model setting data.');
        }
        else if(data instanceof CommunicationData.SendData.SkillUse){
            console.log('Skill use data.');
        } 
        else if(data instanceof CommunicationData.SendData.LoadCharacter){
            console.log('Load data');
        } 
        else if(data instanceof CommunicationData.SendData.InitCharacter){
            console.log('Init user data');
        }
        else{
            console.log('Any data.');
        }
        */
        this.ws_.send(_sendData);
        console.log('send:'+_sendData+' -> user_id:'+this.id.toString());
        return true;
    }


    /**
     * 効果を受ける
     * @public
     * @param {CharacterEffect} _effect 効果
     * @returns {boolean} true:成功 false:失敗
     * @memberof Player
     */
    public ReceiveAnEffect(_effect:CharacterEffect) : boolean {
        return _effect.Show(this);
    }

    
    /**
     * セーブデータの読み込み
     * @public
     * @param {}
     * @returns {boolean} true:成功 false:失敗
     * @memberof Player
     */
    public LoadSaveData(): boolean{
        // TODO: Modelから取得するように変更 いったんデバッグ用で作作成
        const model: any = { 
            position :{ x: 0,y: 0, z:0 },
            weapon : { head: 0, hand: 0 },
            mapId: 0,
            exp: 0
        }
        this.transform.position = new Vector3(model.position.x, model.position.y, model.position.z);
        // TODO: 武器etc...の読み込み実装予定
        let data: CommunicationData.SendData.LoadCharacter = new CommunicationData.SendData.LoadCharacter();
        data.exp = model.exp;
        data.lv =1;
        data.position = this.transform.position;
        data.weapon = new Weapon();
        return CharacterManager.instance.SendOne(this.id, JSON.stringify(data));
    }


    /**
     * 同期する
     * @private
     * @returns {boolean} true:成功 false:失敗
     * @memberof Player
     */
    private Synchronize() : boolean {
        // TODO: 同期処理
        return true;
    }

    /**
     * 職業の変更
     * @public
     * @param {number} _jobID 職業ID
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public ChangeJob(_jobID:number) : boolean 
    /**
     * 職業の変更
     * @public
     * @param {string} _jobName 職業名
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public ChangeJob(_jobName:string) : boolean 
    /**
     * 職業変更の実装
     * @public
     * @param {number|string} _jobKey 職業キー
     * @returns {boolean} true:成功 false:失敗
     * @memberof Enemy
     */
    public ChangeJob(_jobKey:number|string) : boolean {
        // データベース情報から読み込み
        const jobData:JobData|undefined =　JobDataAccessor.instance.Find(_jobKey);

        if(jobData === undefined){
            if((typeof _jobKey) === 'number'){
                console.error('Couldn\'t find job data. [id : ' + _jobKey.toString() + ']');
            }
            else if((typeof _jobKey) === 'string'){
                console.error('Couldn\'t find job data. [name:' + _jobKey + ']');
            }
            return false;
        }

        this.playerStatus_.ChangeJob(jobData);
        return true;
    }

    /**
     * 位置情報送信
     * @private
     * @param {number} _toMapId 送信先マップID
     * @returns {boolean} true:成功 false:失敗
     * @memberof Player
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

        return CharacterManager.instance.Send(this.id, this.mapId, JSON.stringify(data));
    }

    /**
     * 簡易表示情報送信
     * @private
     * @returns {boolean} true:成功 false:失敗
     * @memberof Player
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
