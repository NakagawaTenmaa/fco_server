/**
 * @fileoverview プレイヤーの実装ファイル
 * @file Player.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Character,CharacterType} from './../character/Character'
import {CharacterStatus} from './../character/CharacterStatus'
import {PlayerStatus} from './PlayerStatus'
import {Transform} from './../utility/Transform'
import {CharacterManager} from './../character/CharacterManager'
import {CommunicationData} from './../CommunicationData';
import {JobData,JobDataAccessor} from './../DatabaseAccessors/JobDataAccessor'
import WebSocket = require('ws')
import {Vector3} from './../utility/Vector3'
import {Weapon} from './../object/playerWeapon'
import {PartyManager} from './../party//PartyManager'
import {Party} from './../party/Party'
import {SkillEffectManager} from './../skill/SkillEffectManager'
import {SkillEffect} from './../skill/SkillEffect'
import {Battlefield} from './../battle/Battlefield'
import {BattlefieldManager} from './../battle/BattlefieldManager'
import { AccessoryData, AccessoryDataAccessor } from '../DatabaseAccessors/AccessoryAccessor'
import { Inventory } from './Inventory'

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

    private modelId_: number;

    public get modelId() : number { return this.modelId_; }
    public set modelId(_id: number) { this.modelId_ = _id; }

    private name_: string;
    public get name(): string{ return this.name_; }
    public set name(_name: string){ this.name_ = _name; }

    // インベントリ
    private inventory_ : Inventory;

    /**
     * パーティID
     * @private
     * @type {number}
     * @memberof Player
     */
    private partyId_ : number;
    /**
     * パーティ
     * @private
     * @type {Party|undefined}
     * @memberof Player
     */
    private party_ : Party|undefined;
    /**
     * パーティ
     * @public
     * @readonly
     * @type {Party|undefined}
     * @memberof Player
     */
    public get party() : Party|undefined {
        return this.party_;
    }
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
     * パーティIDの設定
     * @private
     * @param {number} _partyId
     * @memberof Player
     */
    private SetPartyId(_partyId : number) : void {
        this.partyId_ = _partyId;

        if(_partyId < 0){
            this.party_ = undefined
        }
        else{
            this.party_ = PartyManager.instance.Search(_partyId);
        }
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
     * @public
     * @readonly
     * @type {number}
     * @memberof Player
     */
    public get battlefieldId() : number {
        if(this.party_ === undefined){
            return (-1);
        }
        return this.party_.battlefieldId;
    }
    /**
     * 戦場にいるか
     * @public
     * @readonly
     * @type {boolean}
     * @memberof Player
     */
    public get isJoinedBattlefield() : boolean {
        return (this.battlefieldId >= 0);
    }
    /**
     * 戦場
     * @public
     * @readonly
     * @type {Battlefield|undefined}
     * @memberof Player
     */
    public get battlefield() : Battlefield|undefined {
        if(this.party_ === undefined){
            return undefined;
        }
        return this.party_.battlefield;
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
     * レベル
     * @public
     * @readonly
     * @type {number}
     * @memberof Player
     */
    public get level() : number {
        return this.playerStatus_.levelStatus.level;
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
        this.party_ = undefined;
        this.partyPriority_ = -1;
        this.targetId_ = -1;
        this.mapId_ = 0;
        this.transform_ = new Transform();
        this.playerStatus_ = new PlayerStatus();
        this.name_ = "";
        this.modelId_ = 0;
        this.playerStatus_.levelStatus.ChangeLevel(1);
        this.inventory_ = new Inventory();
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
        // 所属しているパーティから抜ける
        const currentParty:Party|undefined = this.party_;
        if(currentParty !== undefined){
            currentParty.RemovePlayer(this);
            this.SetPartyId(-1);
        }

        if(this.isJoinedBattlefield){
            // 戦場に入っていたならその戦場のターゲットから外す
            const currentBattlefield:Battlefield|undefined = this.battlefield;
            if(currentBattlefield !== undefined){
                currentBattlefield.ClearEnemyTarget(this);
                this.OnRemovedBattlefield();
            }
        }
        return true;
    }
    
    /**
     * 死んだときの処理
     * @public
     * @memberof Enemy
     */
    public OnDead() : void {
        // nothing
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
        _skillId = _skillId - 0;
        _receiverId = _receiverId - 0;

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
     * @memberof Player
     */
    public ReceiveDamage(_attacker:Character, _hitPointDamage:number, _magicPointDamage:number) : boolean {
        // HP,MP更新
        this.status.hitPoint = this.status.hitPoint - _hitPointDamage;
        this.status.magicPoint = this.status.magicPoint - _magicPointDamage;

        if(this.isJoinedBattlefield){
            // 自身が戦場に入っているなら
            // 攻撃してきたキャラクタを自身と同じ戦場に引きずり込む
            _attacker.JoinBattlefield(this.battlefieldId, true);
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
        if(_battlefieldId === this.battlefieldId){
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
                const currentBattlefield:Battlefield|undefined = this.battlefield;
                if(currentBattlefield === undefined){
                    return false;
                }

                // 先戦場の戦場に全キャラクタを移動して元の戦場を削除
                currentBattlefield.MoveAllCharacters(toBattlefield);
                BattlefieldManager.instance.Delete(currentBattlefield.id);
            }
            else{
                // 同じパーティのキャラクタを引きずり込む
                const myParty:Party|undefined = this.party;
                if(myParty === undefined){
                    return false;
                }
                toBattlefield.AddParty(myParty);
            }
        }
        return true;
    }
    /**
     * 戦場から出た
     * @public
     * @memberof Player
     */
    public OnRemovedBattlefield() : void {
        // nothing
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
        const beforeParty:Party|undefined = this.party;
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
            this.SetPartyId(_partyId);
        }
        else{
            console.error('Couldn\'t join the new party.');
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
        const beforeParty:Party|undefined = this.party;
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
            this.SetPartyId(this.characterId_);
        }
        else{
            console.error('Couldn\'t join the my party.');
        }

        return isSuccess;
    }

    /**
     * マップの移動
     * @param {number} _mapId
     * @memberof Player
     */
    public changeMap(_mapId: number){
        if(this.ws_ === null) return;
        this.mapId_ = _mapId;

        this.ws_.send(JSON.stringify(new CommunicationData.SendData.MoveingMapOk()));
    }

    /**
     * アクセサリーの変更
     * @param {number} _pointId
     * @param {number} _accessoryId
     * @returns
     * @memberof Player
     */
    public changeAccessory(_pointId: number, _accessoryId: number){
        const accessoryData : AccessoryData | undefined = AccessoryDataAccessor.instance.Find(0);
        if(accessoryData === undefined) return;

        this.playerStatus_.ChangeAccessory(accessoryData ,_pointId);
    }

    /**
     * アクセサリーの取得
     * @param {number} _accessoryId
     * @param {number} _index
     * @memberof Player
     */
    public addInventory(_accessoryId: number, _index: number = -1){
        let result = false;
        if(this.ws_ === null) return;
        if(_index === -1) result = this.inventory_.addLast(_accessoryId);
        else result = this.inventory_.add(_accessoryId, _index);
        
        if(result) this.ws_.send(new CommunicationData.SendData.SelectRewardOk()); 
    }
     
    /**
     * アクセサリーを破棄
     * @param {number} _index
     * @memberof Player
     */
    public releaseItem(_index: number){
        this.inventory_.releaseItem(_index);
    }
    
    /**
     * 永久インベ一覧を取得
     * @returns {Array<number>}
     * @memberof Player
     */
    public getInventory(): Array<number>{
        return this.inventory_.getItemList();
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

        /*
            data.user_id = this.characterId_;
            data.hp = 100.0 * this.status.hitPoint / this.status.maxHitPoint;
            data.mp = 100.0 * this.status.magicPoint / this.status.maxMagicPoint;
            data.status = this.status.abnormalConditionStatus.flag;
        */
        return true;
        //return CharacterManager.instance.Send(this.id, this.mapId, JSON.stringify(data));
    }
}
