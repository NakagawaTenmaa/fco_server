/**
 * @fileoverview パーティマネージャの実装ファイル
 * @file PartyManager.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Party} from './Party'

/**
 * パーティマネージャ
 * @export
 * @class PartyManager
 */
export class PartyManager{
    /**
     * シングルトンインスタンス
     * @private
     * @static
     * @type {PartyManager}
     * @memberof PartyManager
     */
    private static instance_ ?: PartyManager;
    /**
     * シングルトンインスタンス
     * @public
     * @static
     * @readonly
     * @type {PartyManager}
     * @memberof PartyManager
     */
    public static get instance() : PartyManager {
        if(PartyManager.instance_ === undefined){
            PartyManager.instance_ = new PartyManager();
        }
        return PartyManager.instance_;
    }

    /**
     * パーティ配列
     * @private
     * @type {Array<Party>}
     * @memberof PartyManager
     */
    private partyArray_ : Array<Party>;


    /**
     * デフォルトコンストラクタ
     * @private
     * @constructor
     * @memberof PartyManager
     */
    private constructor(){
        this.partyArray_ = new Array<Party>();
    }


    /**
     * 検索
     * @param {number} _id 探すパーティのID
     * @returns {(Party|undefined)} 対応するパーティ 見つからなければundefined
     * @memberof PartyManager
     */
    public Search(_id:number) : Party|undefined {
        return this.partyArray_[_id];
    }
}