/**
 * @fileoverview キャラクタステータスの実装ファイル
 * @file CharacterSutatus.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Status} from './Status'
import {AbnormalConditionStatus} from './AbnormalConditionStatus'

/**
 * キャラクタステータス
 * @export
 * @interface CharacterStatus
 * @extends {Status}
 */
export interface CharacterStatus extends Status {
    /**
     * レベル
     * @public
     * @readonly
     * @type {number}
     * @memberof Status
     */
    readonly level : number;

    /**
     * 状態異常ステータス
     * @public
     * @readonly
     * @type {AbnormalConditionStatus}
     * @memberof CharacterStatus
     */
    readonly abnormalConditionStatus : AbnormalConditionStatus;

    /**
     * 体力
     * @public
     * @type {number}
     * @memberof Status
     */
    hitPoint : number;
    /**
     * 魔力
     * @public
     * @returns {number}
     * @memberof Status
     */
    magicPoint : number;

    /**
     * 死んでいるか?
     * @public
     * @readonly
     * @type {boolean}
     * @memberof CharacterStatus
     */
    readonly isDead : boolean;
}
