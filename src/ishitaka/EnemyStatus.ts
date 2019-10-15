/**
 * @fileoverview 敵ステータスの実装ファイル
 * @file EnemySutatus.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {CharacterStatus} from './CharacterStatus'
import {Enemy} from './Enemy'
import {EnemyTribeStatus} from './EnemyTribeStatus'
import {AbnormalConditionStatus} from './AbnormalConditionStatus'

/**
 * 敵ステータス
 * @export
 * @class EnemyStatus
 * @implements {CharacterStatus}
 */
export class EnemyStatus implements CharacterStatus {
    /**
     * 敵情報
     * @private
     * @readonly
     * @type {Enemy}
     * @memberof EnemyStatus
     */
    private readonly enemy_ : Enemy;
    /**
     * 種族ステータス
     * @private
     * @type {EnemyTribeStatus}
     * @memberof EnemyStatus
     */
    private tribeStatus_ : EnemyTribeStatus;
    /**
     * 状態異常ステータス
     * @private
     * @type {AbnormalConditionStatus}
     * @memberof EnemyStatus
     */
    private abnormalConditionStatus_ : AbnormalConditionStatus;
    /**
     * 体力
     * @private
     * @type {number}
     * @memberof EnemyStatus
     */
    private hitPoint_ : number;
    /**
     * 魔力
     * @private
     * @type {number}
     * @memberof EnemyStatus
     */
    private magicPoint_ : number;

    /**
     * 種族ステータス
     * @public
     * @readonly
     * @memberof EnemyStatus
     */
    public get tribeStatus() : EnemyTribeStatus{
        return this.tribeStatus_;
    }
    /**
     * 状態異常ステータス
     * @public
     * @readonly
     * @memberof EnemyStatus
     */
    public get abnormalConditionStatus() : AbnormalConditionStatus{
        return this.abnormalConditionStatus_;
    }
    /**
     * 最大体力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyStatus
     */
    public get maxHitPoint() : number {
        return (
            this.tribeStatus_.maxHitPoint +
            this.abnormalConditionStatus_.maxHitPoint
        );
    }
    /**
     * 体力
     * @public
     * @type {number}
     * @memberof EnemyStatus
     */
    public get hitPoint() : number {
        return this.hitPoint_;
    }
    public set hitPoint(_hitPoint:number){
        if(_hitPoint <= 0.0){
            this.hitPoint_ = 0.0;
            this.enemy_.OnDead();
            return;
        }

        this.hitPoint_ = (_hitPoint > this.maxHitPoint) ? (this.maxHitPoint) : (_hitPoint);
    }
    /**
     * 最大魔力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyStatus
     */
    public get maxMagicPoint() : number {
        return (
            this.tribeStatus_.maxMagicPoint +
            this.abnormalConditionStatus_.maxMagicPoint
        );
    }
    /**
     * 魔力
     * @public
     * @type {number}
     * @memberof EnemyStatus
     */
    public get magicPoint() : number {
        return this.magicPoint_;
    }
    public set magicPoint(_magicPoint:number){
        this.magicPoint_ = (_magicPoint < 0.0) ? (0.0) :
            ((_magicPoint > this.maxMagicPoint) ? (this.maxMagicPoint) :
                (_magicPoint));
    }
    /**
     * 物理攻撃力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyStatus
     */
    public get strength() : number {
        return (
            this.tribeStatus_.strength +
            this.abnormalConditionStatus_.strength
        );
    }
    /**
     * 物理防御力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyStatus
     */
    public get vitality() : number {
        return (
            this.tribeStatus_.vitality +
            this.abnormalConditionStatus_.vitality
        );
    }
    /**
     * 魔法攻撃力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyStatus
     */
    public get intelligence() : number {
        return (
            this.tribeStatus_.intelligence +
            this.abnormalConditionStatus_.intelligence
        );
    }
    /**
     * 魔法防御力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyStatus
     */
    public get mind() : number {
        return (
            this.tribeStatus_.mind +
            this.abnormalConditionStatus_.mind
        );
    }
    /**
     * 器用さ
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyStatus
     */
    public get dexterity() : number {
        return (
            this.tribeStatus_.dexterity +
            this.abnormalConditionStatus_.dexterity
        );
    }
    /**
     * 敏捷性
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyStatus
     */
    public get agility() : number {
        return (
            this.tribeStatus_.agility +
            this.abnormalConditionStatus_.agility
        );
    }


    /**
     * コンストラクタ
     * @public
     * @constructor
     * @param {Enemy} _enemy 敵情報
     * @memberof EnemyStatus
     */
    public constructor(_enemy:Enemy){
        this.enemy_ = _enemy;
        this.tribeStatus_ = new EnemyTribeStatus();
        this.abnormalConditionStatus_ = new AbnormalConditionStatus();
        this.hitPoint_ = 0;
        this.magicPoint_ = 0;
    }


    /**
     * 初期化
     * @public
     * @memberof EnemyStatus
     */
    public Initialize() : void {
        this.abnormalConditionStatus_.Initialize();
        this.hitPoint_ = this.maxHitPoint;
        this.magicPoint_ = this.maxMagicPoint;
    }
}
