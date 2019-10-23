/**
 * @fileoverview パーティの実装ファイル
 * @file Party.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Character} from './Character'
import {Player} from './Player'

/**
 * パーティ
 * @export
 * @class Party
 */
export class Party{
    /**
     * パーティID
     * @private
     * @type {number}
     * @memberof Party
     */
    private id_ : number;
    /**
     * パーティID
     * @public
     * @readonly
     * @type {number}
     * @memberof Party
     */
    public get id() : number {
        return this.id_;
    }
    /**
     * パーティキャラクタ配列
     * @private
     * @type {Array<Character>}
     * @memberof Party
     */
    private characterArray_ : Array<Character>;
    /**
     * パーティキャラクタ配列
     * @public
     * @readonly
     * @type {Array<Character>}
     * @memberof Party
     */
    public get characterArray() : Array<Character> {
        return this.characterArray_.concat([]);
    }
    /**
     * 優先度をリセットする
     * @private
     * @type {boolean}
     * @memberof Party
     */
    private isResetPriority_ : boolean;


    /**
     * コンストラクタ
     * @public
     * @constructor
     * @param {number} _id パーティID
     * @memberof Party
     */
    public constructor(_id:number){
        this.id_ = _id;
        this.characterArray_ = new Array<Character>();
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
        const index:number = this.characterArray_.indexOf(_player);
        if(index >= 0){
            // 既に追加されている
            return false;
        }

        // 優先度に穴が開いている場合にリセット
        if(this.isResetPriority_){
            this.ResetPriority();
        }

        // 優先度を最後にする
        _player.partyPriority = this.characterArray_.length;

        // 追加
        this.characterArray_.push(_player);
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
        const index:number = this.characterArray_.indexOf(_player);
        if(index < 0){
            // ここにはいない
            return false;
        }

        // 削除
        this.characterArray_.splice(index, 1);

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

        // 優先度をインデックスでリセット
        this.characterArray_.forEach(function(
            _character : Character,
            _index : number,
            _array : Character[]
        ) : void {
            if(_character === undefined){
                isSuccess = false;
                return;
            }
            const player:Player = _character as Player;
            player.partyPriority = _index;
        });

        this.isResetPriority_ = false;

        return isSuccess;
    }
}