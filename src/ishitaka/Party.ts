/**
 * @fileoverview パーティの実装ファイル
 * @file Party.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {CharacterManager} from './CharacterManager'
import {Character} from './Character'
import {Player} from './Player'

/**
 * パーティ
 * @export
 * @class Party
 */
export class Party{
    /**
     * パーティキャラクタID配列
     * @private
     * @type {Array<number>}
     * @memberof Party
     */
    private characterIdArray_ : Array<number>;
    /**
     * パーティキャラクタID配列
     * @public
     * @readonly
     * @type {Array<number>}
     * @memberof Party
     */
    public get characterIdArray() : Array<number> {
        return this.characterIdArray_.concat([]);
    }
    /**
     * 優先度をリセットする
     * @private
     * @type {boolean}
     * @memberof Party
     */
    private isResetPriority_ : boolean;


    /**
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof Party
     */
    public constructor(){
        this.characterIdArray_ = new Array<number>();
        this.isResetPriority_ = false;
    }

    /**
     * プレイヤの追加
     * @param {Player} _player プレイヤ
     * @returns {boolean} true:追加した false:追加しなかった
     * @memberof Party
     */
    public AddPlayer(_player:Player) : boolean {
        // キャラクタがいるか探す
        const index:number = this.characterIdArray_.indexOf(_player.id);
        if(index >= 0){
            // 既に追加されている
            return false;
        }

        // 優先度に穴が開いている場合にリセット
        if(this.isResetPriority_){
            this.ResetPriority();
        }

        // 優先度を最後にする
        _player.partyPriority = this.characterIdArray_.length;

        // 追加
        this.characterIdArray_.push(_player.id);
        return true;
    }
    /**
     * キャラクタの削除
     * @param {Player} _player プレイヤ
     * @returns {boolean} true:削除した false:削除しなかった
     * @memberof Battlefield
     */
    public RemovePlayer(_player:Player) : boolean {
        // キャラクタがいるか探す
        const index:number = this.characterIdArray_.indexOf(_player.id);
        if(index < 0){
            // ここにはいない
            return false;
        }

        // 削除
        this.characterIdArray_.splice(index, 1);

        this.isResetPriority_ = true;
        return true;
    }

    /**
     * 優先度をリセット
     * @private
     * @returns {boolean} true:成功 false:失敗
     * @memberof Party
     */
    private ResetPriority() : boolean {
        let isSuccess:boolean = true;
        const characterManager:CharacterManager = CharacterManager.instance;

        // 優先度をインデックスでリセット
        this.characterIdArray_.forEach(function(
            _id : number,
            _index : number,
            _array : number[]
        ) : void {
            const character:Character|undefined = characterManager.GetCharacter(_id);
            if(character === undefined){
                isSuccess = false;
                return;
            }
            const player:Player = character as Player;
            player.partyPriority = _index;
        });

        this.isResetPriority_ = false;

        return isSuccess;
    }
}