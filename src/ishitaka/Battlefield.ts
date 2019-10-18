/**
 * @fileoverview 戦場の実装ファイル
 * @file Battlefield.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Character,CharacterType} from './Character'

/**
 * 戦場
 * @export
 * @class Battlefield
 */
export class Battlefield{
    /**
     * 戦場キャラクタID配列
     * @private
     * @type {Array<number>}
     * @memberof Battlefield
     */
    private characterIdArray_ : Array<number>;
    /**
     * 戦場キャラクタID配列
     * @public
     * @readonly
     * @type {Array<number>}
     * @memberof Battlefield
     */
    public get characterIdArray() : Array<number> {
        return this.characterIdArray_.concat([]);
    }
    /**
     * プレイヤの数
     * @private
     * @type {number}
     * @memberof Battlefield
     */
    private playerCount_ : number;
    /**
     * プレイヤの数
     * @public
     * @readonly
     * @type {number}
     * @memberof Battlefield
     */
    public get playerCount() : number {
        return this.playerCount_;
    }
    /**
     * 敵の数
     * @private
     * @type {number}
     * @memberof Battlefield
     */
    private enemyCount_ : number;
    /**
     * 敵の数
     * @public
     * @readonly
     * @type {number}
     * @memberof Battlefield
     */
    public get enemyCount() : number {
        return this.enemyCount_;
    }


    /**
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof Battlefield
     */
    public constructor(){
        this.characterIdArray_ = new Array<number>();
        this.playerCount_ = 0;
        this.enemyCount_ = 0;
    }

    /**
     * キャラクタの追加
     * @param {Character} _character キャラクタ
     * @returns {boolean} true:追加した false:追加しなかった
     * @memberof Battlefield
     */
    public AddCharacter(_character:Character) : boolean {
        // キャラクタがいるか探す
        const index:number = this.characterIdArray_.indexOf(_character.id);
        if(index >= 0){
            // 既に追加されている
            return false;
        }

        // 追加
        this.characterIdArray_.push(_character.id);

        // 種類に合わせてカウントアップ
        switch(_character.type){
        case CharacterType.Player:
            {
                this.playerCount_ += 1;
                break;
            }
        case CharacterType.Enemy:
            {
                this.enemyCount_ += 1;
                break;
            }
        }

        return true;
    }
    /**
     * キャラクタの削除
     * @param {Character} _character キャラクタ
     * @returns {boolean} true:削除した false:削除しなかった
     * @memberof Battlefield
     */
    public RemoveCharacter(_character:Character) : boolean {
        // キャラクタがいるか探す
        const index:number = this.characterIdArray_.indexOf(_character.id);
        if(index < 0){
            // ここにはいない
            return false;
        }

        // 削除
        this.characterIdArray_.splice(index, 1);

        // 種類に合わせてカウントダウン
        switch(_character.type){
        case CharacterType.Player:
            {
                this.playerCount_ -= 1;
                break;
            }
        case CharacterType.Enemy:
            {
                this.enemyCount_ -= 1;
                break;
            }
        }

        return true;
    }
}