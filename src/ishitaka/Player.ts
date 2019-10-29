/**
 * @fileoverview プレイヤーの実装ファイル
 * @file Player.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Character,CharacterType} from './Character'
import {CharacterStatus} from './CharacterStatus'
import {PlayerStatus} from './PlayerStatus'
import {Transform} from './Transform'
import {CharacterManager} from './CharacterManager'
import {CommunicationData} from './CommunicationData';
import {JobData,JobDataAccessor} from './DatabaseAccessors/JobDataAccessor'
import WebSocket = require('ws')
import {  } from '../model/characterDataModel';
import { Vector3 } from './Vector3'
import { Weapon } from '../controller/object/playerWeapon'
import {PartyManager} from './PartyManager'
import {Party} from './Party'
import {SkillEffectManager} from './SkillEffectManager'
import {SkillEffect} from './SkillEffect'
import {Battlefield} from './Battlefield'
import {BattlefieldManager} from './BattlefieldManager'

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
     * キャラクタ種類
     * @public
     * @readonly
     * @type {CharacterType}
     * @memberof Player
     */
    public get type() : CharacterType {
        return CharacterType.Player;
    }
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
     * パーティID
     * @private
     * @type {number}
     * @memberof Player
     */
    private partyId_ : number;
    /**
     * パーティID
     * @public
     * @readonly
     * @type {number}
     * @memberof Player
     */
    public get partyId() : number {
        return this.partyId_;
    }
    /**
     * パーティ優先度
     * @private
     * @type {number}
     * @memberof Player
     */
    private partyPriority_ : number;
    /**
     * パーティ優先度
     * @public
     * @readonly
     * @type {number}
     * @memberof Player
     */
    public get partyPriority() : number {
        return this.partyPriority_;
    }
    public set partyPriority(_priority:number){
        this.partyPriority_ = _priority;
    }
    /**
     * 戦場ID
     * @private
     * @type {number}
     * @memberof Player
     */
    private battlefieldId_ : number;
    /**
     * 戦場ID
     * @public
     * @readonly
     * @type {number}
     * @memberof Player
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
     * ターゲットID
     * @private
     * @type {number}
     * @memberof Player
     */
    private targetId_ : number;
    /**
     * ターゲットID
     * @public
     * @type {number}
     * @memberof Player
     */
    public get targetId() : number {
        return this.targetId_;
    }
    public set targetId(_id:number){
        this.targetId_ = _id;
    }
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
        this.partyId_ = -1;
        this.partyPriority_ = -1;
        this.battlefieldId_ = -1;
        this.targetId_ = -1;
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
        //this.SendTransform(this.mapId);
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
        if(this.ws_ === null) return false;
        this.ws_.send(_sendData);
        //console.log('send:'+_sendData+' -> user_id:'+this.id.toString());
        return true;
    }


    /**
     * スキルが使用できるか?
     * @public
     * @param {number} _skillId 確認するスキルのID
     * @returns {boolean} true:できる false:できない
     * @memberof Player
     */
    public IsUsableSkill(_skillId:number) : boolean {
        // TODO:
        return true;
    }

    /**
     * スキル使用
     * @public
     * @param {number} _skillId 使うスキルのID
     * @param {number} _receiverId スキルを受けるキャラクタのID
     * @returns {boolean} true:成功 false:失敗
     * @memberof Player
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
        
        return skillEffect.Show(this, receiver);
    }

    /**
     * ダメージを受ける
     * @public
     * @param {Character} _attacker 攻撃キャラクタ
     * @param {number} _hitPointDamage 体力ダメージ
     * @param {number} _magicPointDamage 魔力ダメージ
     * @returns {boolean} true:成功 false:失敗
     * @memberof Player
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

        return true;
    }
    
    /**
     * 戦場に入る
     * @public
     * @param {number} _battlefieldId 戦場ID
     * @param {boolean} _isCall 周りに通知するかのフラグ
     * @returns {boolean} true:成功 false:失敗
     * @memberof Player
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
            
            const toBattlefield:Battlefield|undefined = BattlefieldManager.instance.Search(_battlefieldId);
            if(toBattlefield === undefined){
                return false;
            }
            if(this.isJoinedBattlefield){
                // 現在戦場に入っている場合なら、同じ戦場にいるキャラクタを引きずり込む
                const currentBattlefield:Battlefield|undefined = BattlefieldManager.instance.Search(this.battlefieldId_);
                if(currentBattlefield === undefined){
                    return false;
                }

                // 先戦場の戦場に全キャラクタを移動して元の戦場を削除
                currentBattlefield.MoveAllCharacters(toBattlefield);
                BattlefieldManager.instance.Delete(currentBattlefield.id);
            }
            else{
                // 同じパーティのキャラクタを引きずり込む
                const myParty:Party|undefined = PartyManager.instance.Search(this.partyId_);
                if(myParty === undefined){
                    return false;
                }
                toBattlefield.AddParty(myParty);
            }
        }
        
        this.battlefieldId_ = _battlefieldId;
        return true;
    }

    /**
     * ヘイト変更
     * @public
     * @param {Character} _target ターゲット
     * @param {number} _hateDifference ヘイト差分
     * @memberof Enemy
     */
    public ChangeHate(_target:Character, _hateDifference:number) : void {
        // 何もしない
    }

    /**
     * パーティに参加する
     * @public
     * @param {number} _partyId 参加するパーティのID
     * @returns {boolean} true:参加した false:参加しなかった
     * @memberof Player
     */
    public JoinParty(_partyId:number) : boolean {
        const beforeParty:Party|undefined = PartyManager.instance.Search(this.partyId_);
        if(beforeParty === undefined){
            return false;
        }
        if(!(beforeParty.RemovePlayer(this))){
            return false;
        }

        let afterParty:Party|undefined = PartyManager.instance.Search(_partyId);
        if(afterParty === undefined){
            afterParty = PartyManager.instance.Create(_partyId);
        }

        const isSuccess:boolean = afterParty.AddPlayer(this);
        if(isSuccess){
            this.partyId_ = _partyId;
        }
        else{
            console.error('Couldn\'t join the party.');
        }

        return isSuccess;
    }
    /**
     * パーティから去る
     * @public
     * @returns {boolean} true:去った false:去らなかった
     * @memberof Player
     */
    public leaveParty() : boolean {
        const beforeParty:Party|undefined = PartyManager.instance.Search(this.partyId_);
        if(beforeParty === undefined){
            return false;
        }
        if(!(beforeParty.RemovePlayer(this))){
            return false;
        }

        let afterParty:Party|undefined = PartyManager.instance.Search(this.characterId_);
        if(afterParty === undefined){
            afterParty = PartyManager.instance.Create(this.characterId_);
        }

        const isSuccess:boolean = afterParty.AddPlayer(this);
        if(isSuccess){
            this.partyId_ = this.characterId_;
        }
        else{
            console.error('Couldn\'t join the party.');
        }

        return isSuccess;
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

        return true;
        //return CharacterManager.instance.Send(this.id, this.mapId, JSON.stringify(data));
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

        return true;
        //return CharacterManager.instance.Send(this.id, this.mapId, JSON.stringify(data));
    }
}
