/**
 * @fileoverview データベースアクセサーの実装ファイル
 * @file DatabaseAccessor.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

/**
 * データベースアクセサー
 * @export
 * @interface DatabaseAccessor
 */
export interface DatabaseAccessor{
    /**
     * データベースに同期する
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof DatabaseAccessor
     */
    SynchronizeToTheDatabase() : boolean;
}
