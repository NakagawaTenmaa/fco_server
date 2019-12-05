/**
 * @fileoverview 敵戦闘更新インターフェースの実装ファイル
 * @file EnemyBattleUpdate.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

/**
 * 敵戦闘更新モード
 * @export
 * @enum {number}
 */
export enum EnemyBattleUpdateMode{
    /**
     * 行動判定
     * @memberof EnemyBattleUpdateMode
     */
    JudgeAction,
    /**
     * 移動
     * @memberof EnemyBattleUpdateMode
     */
    Move,
    /**
     * スキルスタンバイ
     * @memberof EnemyBattleUpdateMode
     */
    SkillStandby,
    /**
     * スキル硬直
     * @memberof EnemyBattleUpdateMode
     */
    SkillRigid,
    /**
     * スキル中断
     * @memberof EnemyBattleUpdateMode
     */
    SkillInterruption
}

/**
 * 敵戦闘更新インターフェース
 * @export
 * @interface EnemyBattleUpdate
 */
export interface EnemyBattleUpdate{
    /**
     * モード
     * @public
     * @readonly
     * @type {EnemyBattleUpdateMode}
     * @memberof EnemyBattleUpdate
     */
    readonly mode : EnemyBattleUpdateMode;

    /**
     * 変更された
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyBattleUpdate
     */
    HasChanged() : boolean;
    /**
     * 変更される
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyBattleUpdate
     */
    OnChange() : boolean;
    /**
     * 更新処理
     * @public
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof EnemyBattleUpdate
     */
    Update(_elapsedTime:number) : boolean;
}
