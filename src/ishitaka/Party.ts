/**
 * @fileoverview パーティの実装ファイル
 * @file Party.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */


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
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof Party
     */
    public constructor(){
        this.characterIdArray_ = new Array<number>();
    }
}