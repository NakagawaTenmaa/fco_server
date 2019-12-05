/**
 * @fileoverview ポイントステータスの実装ファイル
 * @file PointStatus.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Status} from './Status'

/**
 * ポイントステータス
 * @export
 * @class PointStatus
 * @implements {Status}
 */
export class PointStatus implements Status{
    /**
     * 1ポイントあたりの最大体力増加量
     * @private
     * @static
     * @readonly
     * @type {number}
     * @memberof PointStatus
     */
    private static readonly maxHitPointRate : number = 100;
    /**
     * 1ポイントあたりの最大魔力増加量
     * @private
     * @static
     * @readonly
     * @type {number}
     * @memberof PointStatus
     */
    private static readonly maxMagicPointRate : number = 100;
    /**
     * 1ポイントあたりの物理攻撃力増加量
     * @private
     * @static
     * @readonly
     * @type {number}
     * @memberof PointStatus
     */
    private static readonly strengthRate : number = 10;
    /**
     * 1ポイントあたりの物理防御力増加量
     * @private
     * @static
     * @readonly
     * @type {number}
     * @memberof PointStatus
     */
    private static readonly vitalityRate : number = 10;
    /**
     * 1ポイントあたりの魔法攻撃力増加量
     * @private
     * @static
     * @readonly
     * @type {number}
     * @memberof PointStatus
     */
    private static readonly intelligenceRate : number = 10;
    /**
     * 1ポイントあたりの魔法防御力増加量
     * @private
     * @static
     * @readonly
     * @type {number}
     * @memberof PointStatus
     */
    private static readonly mindRate : number = 10;
    /**
     * 1ポイントあたりの器用さ増加量
     * @private
     * @static
     * @readonly
     * @type {number}
     * @memberof PointStatus
     */
    private static readonly dexterityRate : number = 10;
    /**
     * 1ポイントあたりの敏捷性増加量
     * @private
     * @static
     * @readonly
     * @type {number}
     * @memberof PointStatus
     */
    private static readonly agilityRate : number = 10;


    /**
     * 最大体力ポイント
     * @private
     * @type {number}
     * @memberof PointStatus
     */
    private maxHitPointPoint_ : number;
    /**
     * 最大体力ポイント
     * @public
     * @type {number}
     * @memberof PointStatus
     */
    public get maxHitPointPoint() : number {
        return this.maxHitPointPoint_;
    }
    public set maxHitPointPoint(_maxHitPointPoint:number){
        this.maxHitPointPoint_ = _maxHitPointPoint;
    }
    /**
     * 最大魔力ポイント
     * @private
     * @type {number}
     * @memberof PointStatus
     */
    private maxMagicPointPoint_ : number;
    /**
     * 最大魔力ポイント
     * @public
     * @type {number}
     * @memberof PointStatus
     */
    public get maxMagicPointPoint() : number {
        return this.maxMagicPointPoint_;
    }
    public set maxMagicPointPoint(_maxMagicPointPoint:number){
        this.maxMagicPointPoint_ = _maxMagicPointPoint;
    }
    /**
     * 物理攻撃力ポイント
     * @private
     * @type {number}
     * @memberof PointStatus
     */
    private strengthPoint_ : number;
    /**
     * 物理攻撃力ポイント
     * @public
     * @type {number}
     * @memberof PointStatus
     */
    public get strengthPoint() : number {
        return this.strengthPoint_;
    }
    public set strengthPoint(_strengthPoint:number){
        this.strengthPoint_ = _strengthPoint;
    }
    /**
     * 物理防御力ポイント
     * @private
     * @type {number}
     * @memberof PointStatus
     */
    private vitalityPoint_ : number;
    /**
     * 物理防御力ポイント
     * @public
     * @type {number}
     * @memberof PointStatus
     */
    public get vitalityPoint() : number {
        return this.vitalityPoint_;
    }
    public set vitalityPoint(_vitalityPoint:number){
        this.vitalityPoint_ = _vitalityPoint;
    }
    /**
     * 魔法攻撃力ポイント
     * @private
     * @type {number}
     * @memberof PointStatus
     */
    private intelligencePoint_ : number;
    /**
     * 魔法攻撃力ポイント
     * @public
     * @type {number}
     * @memberof PointStatus
     */
    public get intelligencePoint() : number {
        return this.intelligencePoint_;
    }
    public set intelligencePoint(_intelligencePoint:number){
        this.intelligencePoint_ = _intelligencePoint;
    }
    /**
     * 魔法防御力ポイント
     * @private
     * @type {number}
     * @memberof PointStatus
     */
    private mindPoint_ : number;
    /**
     * 魔法防御力ポイント
     * @public
     * @type {number}
     * @memberof PointStatus
     */
    public get mindPoint() : number {
        return this.mindPoint_;
    }
    public set mindPoint(_mindPoint:number){
        this.mindPoint_ = _mindPoint;
    }
    /**
     * 器用さポイント
     * @private
     * @type {number}
     * @memberof PointStatus
     */
    private dexterityPoint_ : number;
    /**
     * 器用さポイント
     * @public
     * @type {number}
     * @memberof PointStatus
     */
    public get dexterityPoint() : number {
        return this.dexterityPoint_;
    }
    public set dexterityPoint(_dexterityPoint:number){
        this.dexterityPoint_ = _dexterityPoint;
    }
    /**
     * 敏捷性ポイント
     * @private
     * @type {number}
     * @memberof PointStatus
     */
    private agilityPoint_ : number;
    /**
     * 敏捷性ポイント
     * @public
     * @type {number}
     * @memberof PointStatus
     */
    public get agilityPoint() : number {
        return this.agilityPoint_;
    }
    public set agilityPoint(_agilityPoint:number){
        this.agilityPoint_ = _agilityPoint;
    }

    /**
     * 最大体力
     * @public
     * @readonly
     * @type {number}
     * @memberof PointStatus
     */
    public get maxHitPoint() : number {
        return this.maxHitPointPoint_ * PointStatus.maxHitPointRate;
    }
    /**
     * 最大魔力
     * @public
     * @readonly
     * @type {number}
     * @memberof PointStatus
     */
    public get maxMagicPoint() : number {
        return this.maxMagicPointPoint_ * PointStatus.maxMagicPointRate;
    }
    /**
     * 物理攻撃力
     * @public
     * @readonly
     * @type {number}
     * @memberof PointStatus
     */
    public get strength() : number {
        return this.strengthPoint_ * PointStatus.strengthRate;
    }
    /**
     * 物理防御力
     * @public
     * @readonly
     * @type {number}
     * @memberof PointStatus
     */
    public get vitality() : number {
        return this.vitalityPoint_ * PointStatus.vitalityRate;
    }
    /**
     * 魔法攻撃力
     * @public
     * @readonly
     * @type {number}
     * @memberof PointStatus
     */
    public get intelligence() : number {
        return this.intelligencePoint_ * PointStatus.intelligenceRate;
    }
    /**
     * 魔法防御力
     * @public
     * @readonly
     * @type {number}
     * @memberof PointStatus
     */
    public get mind() : number {
        return this.mindPoint_ * PointStatus.mindRate;
    }
    /**
     * 器用さ
     * @public
     * @readonly
     * @type {number}
     * @memberof PointStatus
     */
    public get dexterity() : number {
        return this.dexterityPoint_ * PointStatus.dexterityRate;
    }
    /**
     * 敏捷性
     * @public
     * @readonly
     * @type {number}
     * @memberof PointStatus
     */
    public get agility() : number {
        return this.agilityPoint_ * PointStatus.agilityRate;
    }


    /**
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof PointStatus
     */
    public constructor(){
        this.maxHitPointPoint_ = 0;
        this.maxMagicPointPoint_ = 0;
        this.strengthPoint_ = 0;
        this.vitalityPoint_ = 0;
        this.intelligencePoint_ = 0;
        this.mindPoint_ = 0;
        this.dexterityPoint_ = 0;
        this.agilityPoint_ = 0;
    }
}
