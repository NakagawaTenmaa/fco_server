/**
 * @fileoverview 敵更新インターフェースの実装ファイル
 * @file EnemyUpdate.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

/**
 * 敵更新モード
 * @export
 * @enum {number}
 */
export enum EnemyUpdateMode{
    /**
     * 通常モード
     * @memberof EnemyUpdateMode
     */
    Normal,
    /**
     * 戦闘モード
     * @memberof EnemyUpdateMode
     */
    Battle,
    /**
     * 死亡モード
     * @memberof EnemyUpdateMode
     */
    Dead
}

/**
 * 敵更新インターフェース
 * @export
 * @interface EnemyUpdate
 */
export interface EnemyUpdate{
    /**
     * モード
     * @public
     * @readonly
     * @type {EnemyUpdateMode}
     * @memberof EnemyUpdate
     */
    readonly mode : EnemyUpdateMode;

    /**
     * 変更された
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyUpdate
     */
    HasChanged() : boolean;
    /**
     * 変更される
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyUpdate
     */
    OnChange() : boolean;
    /**
     * 更新処理
     * @public
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof EnemyUpdate
     */
    Update(_elapsedTime:number) : boolean;
}
