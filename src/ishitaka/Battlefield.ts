/**
 * @fileoverview 戦場の実装ファイル
 * @file Battlefield.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */


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
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof Battlefield
     */
    public constructor(){
        this.characterIdArray_ = new Array<number>();
    }
}