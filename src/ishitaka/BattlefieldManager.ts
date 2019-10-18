/**
 * @fileoverview 戦場マネージャの実装ファイル
 * @file BattlefieldManager.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Battlefield} from './Battlefield'

/**
 * 戦場マネージャ
 * @export
 * @class BattlefieldManager
 */
export class BattlefieldManager{
    /**
     * シングルトンインスタンス
     * @private
     * @static
     * @type {BattlefieldManager}
     * @memberof BattlefieldManager
     */
    private static instance_ ?: BattlefieldManager;
    /**
     * シングルトンインスタンス
     * @public
     * @static
     * @readonly
     * @type {BattlefieldManager}
     * @memberof BattlefieldManager
     */
    public static get instance() : BattlefieldManager {
        if(BattlefieldManager.instance_ === undefined){
            BattlefieldManager.instance_ = new BattlefieldManager();
        }
        return BattlefieldManager.instance_;
    }

    /**
     * 戦場配列
     * @private
     * @type {Array<Battlefield>}
     * @memberof BattlefieldManager
     */
    private battlefieldArray_ : Array<Battlefield>;


    /**
     * デフォルトコンストラクタ
     * @private
     * @constructor
     * @memberof BattlefieldManager
     */
    private constructor(){
        this.battlefieldArray_ = new Array<Battlefield>();
    }


    /**
     * 検索
     * @param {number} _id 探す戦場のID
     * @returns {(Battlefield|undefined)} 対応する戦場 見つからなければundefined
     * @memberof BattlefieldManager
     */
    public Search(_id:number) : Battlefield|undefined {
        return this.battlefieldArray_[_id];
    }
}