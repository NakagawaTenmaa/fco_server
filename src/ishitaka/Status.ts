/**
 * @fileoverview ステータスの実装ファイル
 * @file Sutatus.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

/**
 * ステータス
 * @export
 * @interface Status
 */
export interface Status{
    /**
     * 最大体力
     * @readonly
     * @type {number}
     * @memberof Status
     */
    readonly maxHitPoint : number;
    /**
     * 最大魔力
     * @readonly
     * @type {number}
     * @memberof Status
     */
    readonly maxMagicPoint : number;
    /**
     * 物理攻撃力
     * @readonly
     * @type {number}
     * @memberof Status
     */
    readonly strength : number;
    /**
     * 物理防御力
     * @readonly
     * @type {number}
     * @memberof Status
     */
    readonly vitality : number;
    /**
     * 魔法攻撃力
     * @readonly
     * @type {number}
     * @memberof Status
     */
    readonly intelligence : number;
    /**
     * 魔法防御力
     * @readonly
     * @type {number}
     * @memberof Status
     */
    readonly mind : number;
    /**
     * 器用さ
     * @readonly
     * @type {number}
     * @memberof Status
     */
    readonly dexterity : number;
    /**
     * 敏捷性
     * @readonly
     * @type {number}
     * @memberof Status
     */
    readonly agility : number;
}
