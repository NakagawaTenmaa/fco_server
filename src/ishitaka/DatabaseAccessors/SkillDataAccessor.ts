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
     * @public
     * @type {string}
     * @memberof SkillData
     */
    public name_ : string;
    /**
     * キャストタイム
     * @public
     * @type {number}
     * @memberof SkillData
     */
    public castTime_ : number;
    /**
     * リキャストタイム
     * @public
     * @type {number}
     * @memberof SkillData
     */
    public recastTime_ : number;
    /**
     * 消費体力
     * @public
     * @type {number}
     * @memberof SkillData
     */
    public consumptionHitPoint_ : number;
    /**
     * 消費魔力
     * @public
     * @type {number}
     * @memberof SkillData
     */
    public consumptionMagicPoint_ : number;
    /**
     * 固定物理ダメージ
     * @public
     * @type {number}
     * @memberof SkillData
     */
    public fixedPhysicalDamage_ : number;
    /**
     * 物理攻撃力による物理ダメージ増加率
     * @public
     * @type {number}
     * @memberof SkillData
     */
    public strengthPhysicalDamageRate_ : number;
    /**
     * 固定魔法ダメージ
     * @public
     * @type {number}
     * @memberof SkillData
     */
    public fixedMagicalDamage_ : number;
    /**
     * 魔法攻撃力による魔法ダメージ増加率
     * @public
     * @type {number}
     * @memberof SkillData
     */
    public intelligenceMagicalDamageRate_ : number;
    /**
     * 効果フラグ [バフ、デバフ等]
     * @public
     * @type {number}
     * @memberof ItemData
     */
    public effectFlag_ : number;
    /**
     * 効果対象
     * @public
     * @type {number}
     * @memberof SkillData
     */
    public effectTarget_ : number;
    /**
     * 効果範囲タイプ
     * @public
     * @type {number}
     * @memberof SkillData
     */
    public effectRangeType_ : number;
    /**
     * 効果範囲拡大率
     * @public
     * @type {number}
     * @memberof SkillData
     */
    public effectRangeScale_ : number;


    /**
     * フルコンストラクタ
     * @public
     * @constructor
     * @param {string} _name 名前
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
                return (_key === _data.name_);
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
            0.5,
            1.0,
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
