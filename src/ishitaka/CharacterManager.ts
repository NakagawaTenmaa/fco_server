/**
 * @fileoverview キャラクタマネージャの実装ファイル
 * @file CharacterManager.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Character} from './Character'
import {Player} from './Player'
import {Enemy} from './Enemy'
import {CommunicationData, SendEnemyData} from './CommunicationData';
import WebSocket = require('ws');
import {Vector3} from './Vector3';
import {PartyManager} from './PartyManager';
import {Party} from './Party';
import { UserModel } from './../model/userModel'

/**
 * キャラクタマネージャ
 * @export
 * @class CharacterManager
 */
export class CharacterManager{
    // ユーザーのモデル
    private userModel = new UserModel();

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
    private static readonly enemyCount_ : number = 3;


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
            enemy.Initialize();
            this.AddCharacter(enemy);
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
                    if(!(_character.Finalize())){
                        console.error('Error: Character::Finalize()');
                        isSuccess = false;
                    }
                }
                return isContinued;
            }
        );
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
            if(user !== undefined) {
                user.transform.position = new Vector3(data.x,data.y,data.z);
                user.dir = data.dir;
            }

            let sendData:CommunicationData.SendData.CharacterTransform = new CommunicationData.SendData.CharacterTransform();
            sendData.x = data.x;
            sendData.y = data.y;
            sendData.z = data.z;
            sendData.dir = data.dir;
            sendData.user_id = data.user_id;
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
    public LoadCharacter(_ws: WebSocket, _characterId: number): boolean{
        // ソケットの設定
        const player: Player | undefined = this.playerArray_.find((_player: Player) => { return _player.id === _characterId; })
        if(typeof player === 'undefined') return false;
        player.webSocket = _ws;
        player.LoadSaveData();
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
        return this.characterArray_[_searchCharacterId];
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
    public PlayerLogout(_characterId: number){
        const player = this.FindPlayer(_characterId);
        if(typeof player === 'undefined') return false;
        this.userModel.changeStatus(player.dbId, 0);
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
            
            delete this.characterArray_[_characterId];
            return true;
        }
        return false;
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
            let enemyData = new SendEnemyData(); 
            enemyData.master_id = _enemy.tribeId;
            enemyData.x = _enemy.transform.position.x;
            enemyData.y = _enemy.transform.position.y;
            enemyData.z = _enemy.transform.position.z;
            enemyData.dir = _enemy.transform.rotationY;
            enemyData.hp = _enemy.status.hitPoint;
            enemyData.unique_id = _enemy.id;

            data.enemys.push(enemyData);
        })

        this.SendOne(_characterid,JSON.stringify(data));
    }
    
    /**
     * IDからプレイヤーの検索
     * @privet 
     * @param {number} プレイヤーのID
     * @returns {Player} 検索結果
     * @memberof CharacterManager
     */
    private FindPlayer(_characterId: number): Player | undefined{
        return this.playerArray_.find((player: Player) => player.id === _characterId);
    }

    /**
     * スキル使用情報の取得
     * @private
     * @param {CommunicationData.ReceiveData.UseSkillCtoS} _useSkill スキル使用情報
     * @memberof CharacterManager
     */
    private ReceiveUseSkill(_useSkill:any/*CommunicationData.ReceiveData.UseSkillCtoS*/){
        const useCharacter:Character = this.characterArray_[_useSkill.user_id];
        
        if(useCharacter.UseSkill(_useSkill.skill_id, _useSkill.receiver_id)){
            // TODO:成功時処理
        }
        else{
            // TODO:失敗時処理
        }
    }
}
