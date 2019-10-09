/**
 * @fileoverview キャラクタマネージャの実装ファイル
 * @file CharacterManager.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Character} from './Character'
import {Player} from './Player'
import {Enemy} from './Enemy'
import { CommunicationData } from './CommunicationData';

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
     * 受信
     * @public
     * @param {string} _receiveData 受信データ
     * @returns {boolean} true:成功 false:失敗
     * @memberof CharacterManager
     */
    public Receive(_receiveData:string) : boolean {
        const data = CommunicationData.Converter.Convert(_receiveData);
        if(typeof data === 'undefined' || !data) return false;
        switch(data.command){
            case CommunicationData.SendData.CharacterTransform.id: 
            
            break;
        }
        this.characterArray_.forEach((_character: Character) => {
            
        })
        // TODO:        
        return true;
    }


    /**
     * キャラクタの取得
     * @public
     * @param {number} _searchCharacterId 取得するキャラクタのID
     * @returns {Character|undefined} 指定したIDのキャラクタ
     * @memberof CharacterManager
     */
    public GetCharacter(_searchCharacterId:number) : Character|undefined {
        if(_searchCharacterId in this.characterArray_){
            return this.characterArray_[_searchCharacterId];
        }
        else{
            return undefined;
        }
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
        _character.id = (lastCharacter === undefined) ? (0) : (lastCharacter.id + 1);
        this.characterArray_[_character.id] = _character;
        return true;
    }
}
