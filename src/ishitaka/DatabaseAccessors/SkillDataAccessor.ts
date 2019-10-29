/**
 * @fileoverview スキル情報アクセサーの実装ファイル
 * @file SkillDataAccessor.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {DatabaseAccessor} from './DatabaseAccessor'

/**
 * スキル情報
 * @export
 * @class SkillData
 */
export class SkillData{
    /**
     * 名前
     * @private
     * @type {string}
     * @memberof SkillData
     */
    private name_ : string;
    /**
     * 名前
     * @public
     * @readonly
     * @type {string}
     * @memberof SkillData
     */
    public get name() : string {
        return this.name_;
    }
    /**
     * スキルタイプ
     * @private
     * @type {number}
     * @memberof SkillData
     */
    private type_ : number;
    /**
     * スキルタイプ
     * @public
     * @readonly
     * @type {number}
     * @memberof SkillData
     */
    public get type() : number {
        return this.type_;
    }
    /**
     * キャストタイム
     * @private
     * @type {number}
     * @memberof SkillData
     */
    private castTime_ : number;
    /**
     * キャストタイム
     * @public
     * @readonly
     * @type {number}
     * @memberof SkillData
     */
    public get castTime() : number {
        return this.castTime_;
    }
    /**
     * リキャストタイム
     * @private
     * @type {number}
     * @memberof SkillData
     */
    private recastTime_ : number;
    /**
     * リキャストタイム
     * @public
     * @readonly
     * @type {number}
     * @memberof SkillData
     */
    public get recastTime() : number {
        return this.recastTime_;
    }
    /**
     * 消費体力
     * @private
     * @type {number}
     * @memberof SkillData
     */
    private consumptionHitPoint_ : number;
    /**
     * 消費体力
     * @public
     * @readonly
     * @type {number}
     * @memberof SkillData
     */
    public get consumptionHitPoint() : number {
        return this.consumptionHitPoint_;
    }
    /**
     * 消費魔力
     * @private
     * @type {number}
     * @memberof SkillData
     */
    private consumptionMagicPoint_ : number;
    /**
     * 消費魔力
     * @public
     * @readonly
     * @type {number}
     * @memberof SkillData
     */
    public get consumptionMagicPoint() : number {
        return this.consumptionMagicPoint_;
    }
    /**
     * 固定物理ダメージ
     * @private
     * @type {number}
     * @memberof SkillData
     */
    private fixedPhysicalDamage_ : number;
    /**
     * 固定物理ダメージ
     * @public
     * @readonly
     * @type {number}
     * @memberof SkillData
     */
    public get fixedPhysicalDamage() : number {
        return this.fixedPhysicalDamage_;
    }
    /**
     * 物理攻撃力による物理ダメージ増加率
     * @private
     * @type {number}
     * @memberof SkillData
     */
    private strengthPhysicalDamageRate_ : number;
    /**
     * 物理攻撃力による物理ダメージ増加率
     * @public
     * @readonly
     * @type {number}
     * @memberof SkillData
     */
    public get strengthPhysicalDamageRate() : number {
        return this.strengthPhysicalDamageRate_;
    }
    /**
     * 固定魔法ダメージ
     * @private
     * @type {number}
     * @memberof SkillData
     */
    private fixedMagicalDamage_ : number;
    /**
     * 固定魔法ダメージ
     * @public
     * @readonly
     * @type {number}
     * @memberof SkillData
     */
    public get fixedMagicalDamage() : number {
        return this.fixedMagicalDamage_;
    }
    /**
     * 魔法攻撃力による魔法ダメージ増加率
     * @private
     * @type {number}
     * @memberof SkillData
     */
    private intelligenceMagicalDamageRate_ : number;
    /**
     * 魔法攻撃力による魔法ダメージ増加率
     * @public
     * @readonly
     * @type {number}
     * @memberof SkillData
     */
    public get intelligenceMagicalDamageRate() : number {
        return this.intelligenceMagicalDamageRate_;
    }
    /**
     * 効果フラグ [バフ、デバフ等]
     * @private
     * @type {number}
     * @memberof ItemData
     */
    private effectFlag_ : number;
    /**
     * 効果フラグ [バフ、デバフ等]
     * @public
     * @readonly
     * @type {number}
     * @memberof ItemData
     */
    public get effectFlag() : number {
        return this.effectFlag_;
    }
    /**
     * 効果対象
     * @private
     * @type {number}
     * @memberof SkillData
     */
    private effectTarget_ : number;
    /**
     * 効果対象
     * @public
     * @readonly
     * @type {number}
     * @memberof SkillData
     */
    public get effectTarget() : number {
        return this.effectTarget_;
    }
    /**
     * 効果範囲タイプ
     * @private
     * @type {number}
     * @memberof SkillData
     */
    private effectRangeType_ : number;
    /**
     * 効果範囲タイプ
     * @public
     * @readonly
     * @type {number}
     * @memberof SkillData
     */
    public get effectRangeType() : number {
        return this.effectRangeType_;
    }
    /**
     * 効果範囲拡大率
     * @private
     * @type {number}
     * @memberof SkillData
     */
    private effectRangeScale_ : number;
    /**
     * 効果範囲拡大率
     * @public
     * @readonly
     * @type {number}
     * @memberof SkillData
     */
    public get effectRangeScale() : number {
        return this.effectRangeScale_;
    }


    /**
     * フルコンストラクタ
     * @public
     * @constructor
     * @param {string} _name 名前
     * @param {number} _type スキルタイプ
     * @param {number} _castTime キャストタイム
     * @param {number} _recastTime リキャストタイム
     * @param {number} _consumptionHitPoint 消費体力
     * @param {number} _consumptionMagicPoint 消費魔力
     * @param {number} _fixedPhysicalDamage 固定物理ダメージ
     * @param {number} _strengthPhysicalDamageRate 物理攻撃力による物理ダメージ増加率
     * @param {number} _fixedMagicalDamage 固定魔法ダメージ
     * @param {number} _intelligenceMagicalDamageRate 魔法攻撃力による魔法ダメージ増加率
     * @param {number} _effectFlag 効果フラグ [バフ、デバフ等]
     * @param {number} _effectTarget 効果対象
     * @param {number} _effectRangeType 効果範囲タイプ
     * @param {number} _effectRangeScale 効果範囲拡大率
     * @memberof SkillData
     */
    public constructor(
        _name : string,
        _type : number,
        _castTime : number,
        _recastTime : number,
        _consumptionHitPoint : number,
        _consumptionMagicPoint : number,
        _fixedPhysicalDamage : number,
        _strengthPhysicalDamageRate : number,
        _fixedMagicalDamage : number,
        _intelligenceMagicalDamageRate : number,
        _effectFlag : number,
        _effectTarget : number,
        _effectRangeType : number,
        _effectRangeScale : number
    ){
        this.name_ = _name;
        this.type_ = _type;
        this.castTime_ = _castTime;
        this.recastTime_ = _recastTime;
        this.consumptionHitPoint_ = _consumptionHitPoint;
        this.consumptionMagicPoint_ = _consumptionMagicPoint;
        this.fixedPhysicalDamage_ = _fixedPhysicalDamage;
        this.strengthPhysicalDamageRate_ = _strengthPhysicalDamageRate;
        this.fixedMagicalDamage_ = _fixedMagicalDamage;
        this.intelligenceMagicalDamageRate_ = _intelligenceMagicalDamageRate;
        this.effectFlag_ = _effectFlag;
        this.effectTarget_ = _effectTarget;
        this.effectRangeType_ = _effectRangeType;
        this.effectRangeScale_ = _effectRangeScale;
    }
}


/**
 * スキル情報アクセサー
 * @export
 * @class SkillDataAccessor
 * @implements {DatabaseAccessor}
 */
export class SkillDataAccessor implements DatabaseAccessor{
    /**
     * シングルトンインスタンス
     * @private
     * @static
     * @type {SkillDataAccessor}
     * @memberof SkillDataAccessor
     */
    private static instance_ ?: SkillDataAccessor = undefined;
    /**
     * シングルトンインスタンス
     * @public
     * @static
     * @readonly
     * @type {SkillDataAccessor}
     * @memberof SkillDataAccessor
     */
    public static get instance() : SkillDataAccessor {
        if(SkillDataAccessor.instance_ === undefined){
            SkillDataAccessor.instance_ = new SkillDataAccessor();
        }
        return SkillDataAccessor.instance_;
    }


    /**
     * スキル情報配列
     * @private
     * @type {Array<SkillData>}
     * @memberof SkillDataAccessor
     */
    private dataArray_ : Array<SkillData>;
    /**
     * スキル情報配列
     * @public
     * @readonly
     * @type {Array<SkillData>}
     * @memberof SkillDataAccessor
     */
    public get dataArray() : Array<SkillData> {
        return this.dataArray_.concat([]);
    }


    /**
     * デフォルトコンストラクタ
     * @private
     * @constructor
     * @memberof SkillDataAccessor
     */
    private constructor(){
        this.dataArray_ = new Array<SkillData>();
    }

    /**
     * IDで検索
     * @public
     * @param {number} _id ID
     * @returns {(SkillData|undefined)} 対応するデータ 無ければundefined
     * @memberof SkillDataAccessor
     */
    public Find(_id:number) : SkillData|undefined
    /**
     * 名前で検索
     * @public
     * @param {string} _name 名前
     * @returns {(SkillData|undefined)} 対応するデータ 無ければundefined
     * @memberof SkillDataAccessor
     */
    public Find(_name:string) : SkillData|undefined
    /**
     * キーで検索
     * @param {(number|string)} _key 検索するキー
     * @returns {(SkillData|undefined)} 対応するデータ 無ければundefined
     * @memberof SkillDataAccessor
     */
    public Find(_key:number|string) : SkillData|undefined
    /**
     * 検索の実装
     * @param {(number|string)} _key 検索するキー
     * @returns {(SkillData|undefined)} 対応するデータ 無ければundefined
     * @memberof SkillDataAccessor
     */
    public Find(_key:number|string) : SkillData|undefined {
        if(typeof(_key) === 'number'){
            return this.dataArray_[_key];
        }

        return this.dataArray_.filter(
            function(
                _data : SkillData,
                _id : number,
                _array : SkillData[]
            ) : boolean {
                return (_key === _data.name);
            }
        ).shift();
    }

    /**
     * データを読み込む [非同期]
     * @public
     * @returns {Promise<boolean>} true:成功 false:失敗
     * @memberof SkillDataAccessor
     */
    public async Load() : Promise<boolean> {
        // テスト用データ
        this.dataArray_[0] = new SkillData(
            '通常攻撃',
            0,
            500.0,
            1000.0,
            0, 0,
            10.0, 1.0,
            0.0, 0.0,
            0,
            1,
            0,
            1.0
        );

        // TODO:データベースから情報を読み取る
        
        console.log('Loaded the skill data.');
        return true;
    }
}
