/**
 * @fileoverview 状態異常ステータスの実装ファイル
 * @file AbnormalConditionStatus.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Status} from './Status'

/**
 * 状態異常ステータス
 * @export
 * @class AbnormalConditionStatus
 * @implements {Status}
 */
export class AbnormalConditionStatus implements Status{
    /**
     * 最大体力
     * @public
     * @readonly
     * @type {number}
     * @memberof AbnormalConditionStatus
     */
    public get maxHitPoint() : number {
        return 0;
    }
    /**
     * 最大魔力
     * @public
     * @readonly
     * @type {number}
     * @memberof AbnormalConditionStatus
     */
    public get maxMagicPoint() : number {
        return 0;
    }
    /**
     * 物理攻撃力
     * @public
     * @readonly
     * @type {number}
     * @memberof AbnormalConditionStatus
     */
    public get strength() : number {
        return 0;
    }
    /**
     * 物理防御力
     * @public
     * @readonly
     * @type {number}
     * @memberof AbnormalConditionStatus
     */
    public get vitality() : number {
        return 0;
    }
    /**
     * 魔法攻撃力
     * @public
     * @readonly
     * @type {number}
     * @memberof AbnormalConditionStatus
     */
    public get intelligence() : number {
        return 0;
    }
    /**
     * 魔法防御力
     * @public
     * @readonly
     * @type {number}
     * @memberof AbnormalConditionStatus
     */
    public get mind() : number {
        return 0;
    }
    /**
     * 器用さ
     * @public
     * @readonly
     * @type {number}
     * @memberof AbnormalConditionStatus
     */
    public get dexterity() : number {
        return 0;
    }
    /**
     * 敏捷性
     * @public
     * @readonly
     * @type {number}
     * @memberof AbnormalConditionStatus
     */
    public get agility() : number {
        return 0;
    }

    /**
     * 状態異常フラグ
     * @public
     * @readonly
     * @type {number}
     * @memberof AbnormalConditionStatus
     */
    public get flag() : number {
        return 0;
    }


    /**
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof AbnormalConditionStatus
     */
    public constructor(){
        // 何もしない
    }


    /**
     * 初期化
     * @public
     * @memberof AbnormalConditionStatus
     */
    public Initialize() : void {
        // 何もしない
    }
}
