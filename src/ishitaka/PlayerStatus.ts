/**
 * @fileoverview プレイヤーステータスの実装ファイル
 * @file PlayerSutatus.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {CharacterStatus} from './CharacterStatus'
import {LevelStatus} from './LevelStatus'
import {PointStatus} from './PointStatus'
import {AbnormalConditionStatus} from './AbnormalConditionStatus'
import {JobData} from './DatabaseAccessors/JobDataAccessor'

/**
 * プレイヤーステータス
 * @export
 * @class PlayerStatus
 * @implements {CharacterStatus}
 */
export class PlayerStatus implements CharacterStatus {
    /**
     * レベルステータス
     * @private
     * @type {LevelStatus}
     * @memberof PlayerStatus
     */
    private levelStatus_ : LevelStatus;
    /**
     * ポイントステータス
     * @private
     * @type {PointStatus}
     * @memberof PlayerStatus
     */
    private pointStatus_ : PointStatus;
    /**
     * 状態異常ステータス
     * @private
     * @type {AbnormalConditionStatus}
     * @memberof PlayerStatus
     */
    private abnormalConditionStatus_ : AbnormalConditionStatus;
    /**
     * 体力
     * @private
     * @type {number}
     * @memberof PlayerStatus
     */
    private hitPoint_ : number;
    /**
     * 魔力
     * @private
     * @type {number}
     * @memberof PlayerStatus
     */
    private magicPoint_ : number;

    /**
     * レベルステータス
     * @public
     * @readonly
     * @type {LevelStatus}
     * @memberof PlayerStatus
     */
    public get levelStatus() : LevelStatus{
        return this.levelStatus_;
    }/**
     * レベル
     * @public
     * @type {number}
     * @memberof PlayerStatus
     */
    public get level() : number {
        return this.levelStatus_.level;
    }
    /**
     * ポイントステータス
     * @public
     * @readonly
     * @type {PointStatus}
     * @memberof PlayerStatus
     */
    public get pointStatus() : PointStatus{
        return this.pointStatus_;
    }
    /**
     * 状態異常ステータス
     * @public
     * @readonly
     * @type {AbnormalConditionStatus}
     * @memberof PlayerStatus
     */
    public get abnormalConditionStatus() : AbnormalConditionStatus{
        return this.abnormalConditionStatus_;
    }
    /**
     * 最大体力
     * @public
     * @readonly
     * @type {number}
     * @memberof PlayerStatus
     */
    public get maxHitPoint() : number {
        return (
            this.levelStatus_.maxHitPoint +
            this.pointStatus_.maxHitPoint +
            this.abnormalConditionStatus_.maxHitPoint
        );
    }
    /**
     * 体力
     * @public
     * @type {number}
     * @memberof PlayerStatus
     */
    public get hitPoint() : number {
        return this.hitPoint_;
    }
    public set hitPoint(_hitPoint:number){
        this.hitPoint_ = (_hitPoint < 0.0) ? (0.0) :
            ((_hitPoint > this.maxHitPoint) ? (this.maxHitPoint) :
                (_hitPoint));
    }
    /**
     * 最大魔力
     * @public
     * @readonly
     * @type {number}
     * @memberof PlayerStatus
     */
    public get maxMagicPoint() : number {
        return (
            this.levelStatus_.maxMagicPoint +
            this.pointStatus_.maxMagicPoint +
            this.abnormalConditionStatus_.maxMagicPoint
        );
    }
    /**
     * 魔力
     * @public
     * @type {number}
     * @memberof PlayerStatus
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
     * @memberof PlayerStatus
     */
    public get strength() : number {
        return (
            this.levelStatus_.strength +
            this.pointStatus_.strength +
            this.abnormalConditionStatus_.strength
        );
    }
    /**
     * 物理防御力
     * @public
     * @readonly
     * @type {number}
     * @memberof PlayerStatus
     */
    public get vitality() : number {
        return (
            this.levelStatus_.vitality +
            this.pointStatus_.vitality +
            this.abnormalConditionStatus_.vitality
        );
    }
    /**
     * 魔法攻撃力
     * @public
     * @readonly
     * @type {number}
     * @memberof PlayerStatus
     */
    public get intelligence() : number {
        return (
            this.levelStatus_.intelligence +
            this.pointStatus_.intelligence +
            this.abnormalConditionStatus_.intelligence
        );
    }
    /**
     * 魔法防御力
     * @public
     * @readonly
     * @type {number}
     * @memberof PlayerStatus
     */
    public get mind() : number {
        return (
            this.levelStatus_.mind +
            this.pointStatus_.mind +
            this.abnormalConditionStatus_.mind
        );
    }
    /**
     * 器用さ
     * @public
     * @readonly
     * @type {number}
     * @memberof PlayerStatus
     */
    public get dexterity() : number {
        return (
            this.levelStatus_.dexterity +
            this.pointStatus_.dexterity +
            this.abnormalConditionStatus_.dexterity
        );
    }
    /**
     * 敏捷性
     * @public
     * @readonly
     * @type {number}
     * @memberof PlayerStatus
     */
    public get agility() : number {
        return (
            this.levelStatus_.agility +
            this.pointStatus_.agility +
            this.abnormalConditionStatus_.agility
        );
    }

    
    /**
     * 死んでいるか?
     * @public
     * @readonly
     * @type {boolean}
     * @memberof PlayerStatus
     */
    public get isDead() : boolean {
        return (this.hitPoint <= 0.0);
    }


    /**
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof PlayerStatus
     */
    public constructor(){
        this.levelStatus_ = new LevelStatus();
        this.pointStatus_ = new PointStatus();
        this.abnormalConditionStatus_ = new AbnormalConditionStatus();
        this.hitPoint_ = 0;
        this.magicPoint_ = 0;
    }


    /**
     * 初期化
     * @public
     * @memberof PlayerStatus
     */
    public Initialize() : void {
        this.abnormalConditionStatus_.Initialize();
        this.hitPoint_ = this.maxHitPoint;
        this.magicPoint_ = this.maxMagicPoint;
    }

    /**
     * 職業の変更
     * @public
     * @param {JobData} _jobData 職業データ
     * @memberof PlayerStatus
     */
    public ChangeJob(_jobData:JobData) : void {
        this.levelStatus_.ChangeJob(_jobData);
    }
}
