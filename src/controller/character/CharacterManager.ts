/**
 * @fileoverview キャラクタマネージャの実装ファイル
 * @file CharacterManager.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import WebSocket = require('ws');
import { Character, CharacterType } from './Character'
import { Player } from '../player/Player';
import { Enemy } from '../enemy/Enemy';
import { PartyManager } from '../party/PartyManager';
import { BattlefieldManager } from '../battle/BattlefieldManager';
import { Vector3 } from './../utility/Vector3';
import { CommunicationData, SendEnemyData, PacketPlayer } from '../CommunicationData';
import { Party } from '../party/Party';
import { UserModel } from '../../model/userModel';
import { DropItemDataAccessor } from './../DatabaseAccessors/DropItemAccessor';
import { UserMaster } from '../../model/userMaster';
// import { EnemyDrop } from '../object/enemyDrop';
// import { EnemyDropModel } from '../../model/enemyDropModel';


/**
 * キャラクタマネージャ
 * @export
 * @class CharacterManager
 */
export class CharacterManager{
    /**
     * シングルトンインスタンス
     * @private
     * @static
     * @type {CharacterManager}
     * @memberof CharacterManager
     */
    private static instance_ ?: CharacterManager;
    /**
     * シングルトンインスタンス
     * @public
     * @static
     * @readonly
     * @type {CharacterManager}
     * @memberof CharacterManager
     */
    public static get instance() : CharacterManager {
        if(CharacterManager.instance_ === undefined){
            CharacterManager.instance_ = new CharacterManager();
        }
        return CharacterManager.instance_;
    }

    /**
     * 敵の数
     * @private
     * @static
     * @type {number}
     * @memberof CharacterManager
     */
    private static readonly enemyCount_ : number = 5;


    /**
     * キャラクタ配列
     * @private
     * @type {Array<Character>}
     * @memberof CharacterManager
     */
    private characterArray_ : Array<Character>;
    /**
     * プレイヤ配列
     * @private
     * @type {Array<Player>}
     * @memberof CharacterManager
     */
    private playerArray_ : Array<Player>;
    /**
     * 敵配列
     * @private
     * @type {Array<Enemy>}
     * @memberof CharacterManager
     */
    private enemyArray_ : Array<Enemy>;


    /**
     * デフォルトコンストラクタ
     * @private
     * @constructor
     * @memberof CharacterManager
     */
    private constructor(){
        this.characterArray_ = new Array<Character>();
        this.playerArray_ = new Array<Player>();
        this.enemyArray_ = new Array<Enemy>();
    }
        
    /**
     * 初期化処理
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof CharacterManager
     */
    public Initialize() : boolean {
        let i:number = 0;
        // 敵の生成
        for(i=0; i<CharacterManager.enemyCount_; ++i){
            const enemy:Enemy = new Enemy();
            this.AddCharacter(enemy);
            enemy.Initialize();
        }
        return true;
    }

    /**
     * 更新処理
     * @public
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:成功 false:失敗
     * @memberof CharacterManager
     */
    public Update(_elapsedTime:number) : boolean {
        if(!_elapsedTime){
            _elapsedTime = 1000.0 / 60.0;
        }

        let isSuccess = true;
        this.characterArray_ = this.characterArray_.filter(
            function(
                _character : Character,
                _index : number, 
                _characterArray : Character[]
            ) : boolean {
                if(_character == null) return false;

                const isContinued:boolean = _character.Update(_elapsedTime);
                if(!isContinued){
                    console.error("Error of Character::Update() [id:" + _character.id.toString() + "]");
                    if(!(_character.Finalize())){
                        console.error('Error: Character::Finalize()');
                        isSuccess = false;
                    }
                }
                return isContinued;
            }
        );

        PartyManager.instance.Update();
        BattlefieldManager.instance.Update();
        return isSuccess;
    }

    /**
     * 終了処理
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof CharacterManager
     */
    public Finalize() : boolean {
        let isSuccess = true;
        this.characterArray_.every(
            function(
                _character : Character,
                _index : number, 
                _characterArray : Character[]
            ) : boolean {
                if(!(_character.Finalize())){
                    console.error('Error: Character::Finalize()');
                    isSuccess = false;
                }
                return true;
            }
        );
        this.characterArray_ = new Array<Character>();
        return isSuccess;
    }

    /**
     * 送信
     * @public
     * @param {number} _sendCharacterId 送信するキャラクタのID
     * @param {number} _toMapId 送信先マップのID
     * @param {string} _sendData 送信データ
     * @returns {boolean} true:成功 false:失敗
     * @memberof CharacterManager
     */
    public Send(_sendCharacterID:number, _toMapId:number, _sendData:string) : boolean {
        let isSuccess = true;
        this.playerArray_.every(
            function(
                _player : Player,
                _index : number, 
                _playerArray : Player[]
            ) : boolean {
                // 自身には送らない
                if(_sendCharacterID === _player.id) return true;
                // 送り先のマップにいるプレイヤのみに送信する
                if(_toMapId === _player.mapId){
                    if(!(_player.SendToClient(_sendData))){
                        isSuccess = false;
                    }
                }
                return true;
            }
        );
        return isSuccess;
    }

    /**
     * 個人に送信
     * @public
     * @param {number} _characterId
     * @param {string} _sendData
     * @returns {boolean}
     * @memberof CharacterManager
     */
    public SendOne(_characterId: number, _sendData: string): boolean{
        const player = this.FindPlayer(_characterId);
        if(typeof player === 'undefined') return false;
        return player.SendToClient(_sendData);
    }

  
    /**
     * 全員に送信
     * @public
     * @param {string} _sendData 送信データ
     * @returns {boolean}
     * @memberof CharacterManager
     */
    public SendAll(_sendData: string): boolean {
        let isSuccess: boolean = true;
        this.playerArray_.forEach((player: Player) => {
            if(!player.SendToClient(_sendData)) {
                isSuccess = false;
            }
        });
        return isSuccess;
    }

    /**
     * 一人以外に送信
     * @param {number} _userId
     * @param {string} _sendData
     * @memberof CharacterManager
     */
    public SendOther(_userId: number, _sendData: string): boolean{
        let isSuccess: boolean = true;
        this.playerArray_.forEach((_player: Player) => {
            if(_player.id !== _userId) {
                if(!_player.SendToClient(_sendData)) {
                    isSuccess = false;
                }
            }
        })
        return isSuccess;
    }

    /**
     * 受信
     * @public
     * @param {string} _receiveData 受信データ
     * @returns {boolean} true:成功 false:失敗
     * @memberof CharacterManager
     */
    public Receive(_receiveData:string) : boolean {
        const data = CommunicationData.Converter.Convert(_receiveData);
        let isSuccess = true;

        // コンバートエラー
        if(typeof data === 'undefined' || !data) return false;

        // 移動処理
        if(data instanceof CommunicationData.ReceiveData.CharacterTransform){
            const user: Player| undefined = this.FindPlayer(data.user_id);
            if(user === undefined) return false;
            
            user.transform.position = new Vector3(data.x,data.y,data.z);
            user.dir = data.dir;

            let sendData:CommunicationData.SendData.CharacterTransform = new CommunicationData.SendData.CharacterTransform();
            sendData.x = data.x;
            sendData.y = data.y;
            sendData.z = data.z;
            sendData.dir = data.dir;
            sendData.user_id = data.user_id;
            sendData.name = user.name;
            isSuccess = this.SendAll(JSON.stringify(sendData));
        }
        return isSuccess;
    }

    /**
     * プレイヤーの初期設定
     * @public
     * @param {WebSocket} _ws ウェブソケット
     * @returns {void}
     */
    public async LoadCharacter(_ws: WebSocket, _characterId: number): Promise<boolean>{
        const saveData = await UserMaster.findOne(_characterId);
        console.log(saveData);
        const player: Player | undefined = this.playerArray_.find((_player: Player) => { return _player.id === _characterId; })
        if(typeof player === 'undefined') return false;
        if(saveData === undefined || typeof saveData === 'undefined'){
            player.transform.position = new Vector3(-210, 0, -210);
            player.modelId = 0;
        } else {
            player.transform.position = new Vector3(saveData.x, saveData.y, saveData.z);
            player.modelId = saveData.model_id;
        }
        player.webSocket = _ws;
        
        let res: CommunicationData.SendData.SaveLoadStoC = new CommunicationData.SendData.SaveLoadStoC();
        res.x = player.transform.position.x;
        res.y = player.transform.position.y;
        res.z = player.transform.position.z;
        res.model_id = player.modelId;
        this.SendOne(_characterId, JSON.stringify(res));
        return true;
    }

    /**
     * キャラクタの検索
     * @public
     * @param {number} _searchCharacterId 検索するキャラクタのID
     * @returns {Character|undefined} 対応するキャラクタ 居なければundefined
     * @memberof CharacterManager
     */
    public FindCharacter(_searchCharacterId:number) : Character|undefined {
        return this.characterArray_.find((character: Character) => character.id === _searchCharacterId);
    }

    /**
     * プレイヤを追加
     * @public
     * @param {Player} _player 追加するプレイヤ
     * @returns {boolean} true:成功 false:失敗
     * @memberof CharacterManager
     */
    public AddCharacter(_player:Player) : boolean
    /**
     * 敵を追加
     * @public
     * @param {Enemy} _enemy 追加する敵
     * @returns {boolean} true:成功 false:失敗
     * @memberof CharacterManager
     */
    public AddCharacter(_enemy:Enemy) : boolean
    /**
     * キャラクタの追加の実装
     * @param {(Player|Enemy)} _character
     * @returns {boolean} true:成功 false:失敗
     * @memberof CharacterManager
     */
    public AddCharacter(_character:Player|Enemy) : boolean {
        if(_character instanceof Player){
            this.playerArray_.push(_character);
        }
        else if(_character instanceof Enemy){
            this.enemyArray_.push(_character);
        }
        else{
            console.error('Couldn\'t add character.');
            return false;
        }
        
        const lastCharacter : Character|undefined = this.characterArray_.slice(-1).shift();
        let checkId:number = (lastCharacter === undefined) ? (0) : (lastCharacter.id + 1);
        
        while(checkId in this.characterArray_){
            // 使われているなら次のIDへ
            checkId = (checkId+1) % Number.MAX_SAFE_INTEGER;
        }

        _character.id = checkId;
        this.characterArray_[_character.id] = _character;

        if(_character instanceof Player){
            // パーティを追加
            const party:Party = PartyManager.instance.Create(checkId);
            party.AddPlayer(_character);
        }

        return true;
    }

    /**
     * プレイヤーのログアウト
     * @param {number} _characterId
     * @memberof CharacterManager
     */
    public async PlayerLogout(_characterId: number){
        const player = this.FindPlayer(_characterId);
        if(typeof player === 'undefined') return false;
        UserModel.changeStatus(player.dbId, 0);
        await UserMaster.updateModel(_characterId, -200, 0, -200, 0);
        this.RemoveCharacter(_characterId);
    }

    /**
     * キャラクタの削除
     * @public
     * @param {number} _characterId キャラクタID
     * @returns {boolean} true:成功 false:失敗
     * @memberof CharacterManager
     */
    public RemoveCharacter(_characterId:number) : boolean{
        if(_characterId in this.characterArray_){
            const character:Character = this.characterArray_[_characterId];
            character.Finalize();
            switch(character.type){
                case CharacterType.Player:
                    this.RemovePlayer(_characterId);
                    break;

                case CharacterType.Enemy:
                    this.RemoveEnemy(_characterId);
                    break;

                default:
                    console.log("delete charcter");
                    break;
            }
            delete this.characterArray_[_characterId];
            return true;
        }
        return false;
    }
    /**
     * プレイヤの削除
     * @private
     * @param {number} _characterId キャラクタID
     * @returns {boolean} true:成功 false:失敗
     * @memberof CharacterManager
     */
    private RemovePlayer(_characterId:number) : boolean{
        let isNotDeleted:boolean = false;
        this.playerArray_ = this.playerArray_.filter(
            (_player:Player)=>{
                const isNotDelete:boolean = (_player.id !== _characterId);
                isNotDeleted = isNotDeleted && isNotDelete;
                return isNotDelete;
            }
        );

        if(isNotDeleted){
            return false;
        }
        console.log("delete player.");
        return true;
    }
    /**
     * 敵の削除
     * @private
     * @param {number} _characterId キャラクタID
     * @returns {boolean} true:成功 false:失敗
     * @memberof CharacterManager
     */
    private RemoveEnemy(_characterId:number) : boolean{
        let isNotDeleted:boolean = false;
        this.enemyArray_ = this.enemyArray_.filter(
            (_enemy:Enemy)=>{
                const isNotDelete:boolean = (_enemy.id !== _characterId);
                isNotDeleted = isNotDeleted && isNotDelete;
                return isNotDelete;
            }
        );

        if(isNotDeleted){
            return false;
        }
        console.log("delete enemy.");
        return true;
    }
    

    /**
     * 敵の送信
     * @param {number} _userid
     * @param {number} _mapid
     * @memberof CharacterManager
     */
    public SendEnemy(_characterid: number, _mapid: number){
        let data: CommunicationData.SendData.EnemysData = new CommunicationData.SendData.EnemysData();
        this.enemyArray_.forEach((_enemy: Enemy) => {
            if(!_enemy.isDead){ 
                let enemyData = new SendEnemyData(); 
                enemyData.master_id = _enemy.tribeId;
                enemyData.x = _enemy.transform.position.x;
                enemyData.y = _enemy.transform.position.y;
                enemyData.z = _enemy.transform.position.z;
                enemyData.dir = _enemy.transform.rotationY;
                enemyData.hp = _enemy.status.hitPoint;
                enemyData.unique_id = _enemy.id;

                data.enemys.push(enemyData);
            }
        })
        this.SendOne(_characterid,JSON.stringify(data));
    }

    
    /**
     * 状態の取得
     * @memberof CharacterManager
     */
    public FindStatus(_data: CommunicationData.ReceiveData.PlayerStatus){
        // 送ったプレイヤーの取得
        const player: Player | undefined = this.FindPlayer(_data.user_id);
        if(player === undefined) return;
        
        let data: CommunicationData.SendData.SimpleDisplayOfCharacter = new CommunicationData.SendData.SimpleDisplayOfCharacter();
        if(_data.type === 0){
            const status: CommunicationData.SendData.StatusData = new CommunicationData.SendData.StatusData(); 
            status.charcter_id = _data.user_id;
            status.hp = player.status.hitPoint;
            status.mp = player.status.magicPoint;
            status.status = 0;
            data.status.push(status);
        } else if(_data.type === 1){
            // TODO: 他のキャラ
        } else if(_data.type === 2){
            // TODO: 敵のキャラ
        }

        this.SendOne(player.id, JSON.stringify(data));
    }
    
    /**
     * IDからプレイヤーの検索
     * @privet 
     * @param {number} プレイヤーのID
     * @returns {Player} 検索結果
     * @memberof CharacterManager
     */
    public FindPlayer(_characterId: number): Player | undefined{
        return this.playerArray_.find((player: Player) => player.id === _characterId);
    }


    /**
     * IDから敵の検索
     * @private
     * @param {number} _enemyId
     * @returns {(Enemy | undefined)}
     * @memberof CharacterManager
     */
    private FindEnemy(_enemyId: number) : Enemy | undefined{
        return this.enemyArray_.find((_enemy: Enemy) => _enemy.id === _enemyId);
    }

    /**
     * スキル使用情報の取得
     * @private
     * @param {CommunicationData.ReceiveData.UseSkillCtoS} _useSkill スキル使用情報
     * @memberof CharacterManager
     */
    public async ReceiveUseSkill(_useSkill: CommunicationData.ReceiveData.Attack){
        const useCharacter:Character | undefined = this.FindCharacter(_useSkill.user_id);
        if(useCharacter === undefined) {
            console.log("attack none charcter id:" + _useSkill.user_id.toString());
            return;
        }

        {
            // 他プレイヤにスキル使用を通知
            const sendUseSkill = new CommunicationData.SendData.OtherPlayerUseSkill();
            sendUseSkill.user_id = _useSkill.user_id;
            sendUseSkill.skill_id = _useSkill.skill_id;
            this.SendOther(_useSkill.user_id ,JSON.stringify(sendUseSkill));
        }

        if(useCharacter.UseSkill(_useSkill.skill_id, _useSkill.enemy_id)){      
//            console.log(
//                "Character can use skill. [" +
//                _useSkill.user_id.toString() + "->" + _useSkill.enemy_id.toString() +
//                "]"
//            );
            
            // 攻撃を受けた相手の取得
            const receiveCharacter = this.FindCharacter(_useSkill.enemy_id);
            if(receiveCharacter === undefined) return;
            
            let data;
            if(receiveCharacter.status.hitPoint > 0){
                data = new CommunicationData.SendData.EnemyAlive();
                data.hp = Math.ceil(receiveCharacter.status.hitPoint);
                data.unique_id = receiveCharacter.id;
                data.status = 0;
            } else {
                // 倒れたときの処理
                if(receiveCharacter instanceof Enemy){
                    // 敵の時の処理
                    data = new CommunicationData.SendData.EnemyDie();
                    data.drop = DropItemDataAccessor.instance.randomDropId(1);
                    data.unique_id = receiveCharacter.id;
                } else if(receiveCharacter instanceof Player){
                    // プレイヤーの時の処理
                } else console.error("not player and enemy");
            }
            this.SendAll(JSON.stringify(data));
        }
        else{
            console.error("Attack miss");
//            console.log("character array {");
//            this.characterArray_.forEach(
//                (_character:Character)=>{
//                    console.log("  " + _character.id.toString());
//                }
//            );
//            console.log("}");
        }
    }


    /**
     * プレイヤーの初期化
     * @memberof CharacterManager
     */
    public initPlayer(_userId: number){
        // ユーザーにログイン許可
        let user: CommunicationData.SendData.OtherPlayerList = new CommunicationData.SendData.OtherPlayerList();
        this.playerArray_.forEach((_player: Player) =>{
            user.players.push(new PacketPlayer(
                _player.transform.position.x,
                _player.transform.position.y,
                _player.transform.position.z,
                _player.modelId,
                _player.name
                ));
        })
        this.SendOne(_userId, JSON.stringify(user));
        
        // 他の人に新規通達
        let other: CommunicationData.SendData.NewOtherUser = new CommunicationData.SendData.NewOtherUser();
        const player = this.FindPlayer(_userId);
        if(player === undefined) {
            console.error("init not player");
            return;
        }
        other.x = player.transform.position.x;
        other.y = player.transform.position.y;
        other.z = player.transform.position.z;
        other.user_id = _userId;
        other.model_id = player.modelId;
        other.name = player.name;
        this.SendOther(_userId, JSON.stringify(other));
    }
}
