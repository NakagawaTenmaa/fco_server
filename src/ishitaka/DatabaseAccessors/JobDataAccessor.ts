/**
 * @fileoverview 職業情報アクセサーの実装ファイル
 * @file JobDataAccessor.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {DatabaseAccessor} from './DatabaseAccessor'

/**
 * 職業情報
 * @export
 * @class JobData
 */
export class JobData{
    /**
     * 職業名
     * @private
     * @type {string}
     * @memberof JobData
     */
    private name_ : string;
    /**
     * 職業名
     * @public
     * @readonly
     * @type {string}
     * @memberof JobData
     */
    public get name() : string {
        return this.name_;
    }
    /**
     * 最大体力オフセット
     * @private
     * @type {number}
     * @memberof JobData
     */
    private maxHitPointOffset_ : number;
    /**
     * 最大体力オフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobData
     */
    public get maxHitPointOffset() : number {
        return this.maxHitPointOffset_;
    }
    /**
     * 最大体力増加量
     * @private
     * @type {number}
     * @memberof JobData
     */
    private maxHitPointRate_ : number;
    /**
     * 最大体力増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobData
     */
    public get maxHitPointRate() : number {
        return this.maxHitPointRate_;
    }
    /**
     * 最大魔力オフセット
     * @private
     * @type {number}
     * @memberof JobData
     */
    private maxMagicPointOffset_ : number;
    /**
     * 最大魔力オフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobData
     */
    public get maxMagicPointOffset() : number {
        return this.maxMagicPointOffset_;
    }
    /**
     * 最大魔力増加量
     * @private
     * @type {number}
     * @memberof JobData
     */
    private maxMagicPointRate_ : number;
    /**
     * 最大魔力増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobData
     */
    public get maxMagicPointRate() : number {
        return this.maxMagicPointRate_;
    }
    /**
     * 物理攻撃力オフセット
     * @private
     * @type {number}
     * @memberof JobData
     */
    private strengthOffset_ : number;
    /**
     * 物理攻撃力オフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobData
     */
    public get strengthOffset() : number {
        return this.strengthOffset_;
    }
    /**
     * 物理攻撃力増加量
     * @private
     * @type {number}
     * @memberof JobData
     */
    private strengthRate_ : number;
    /**
     * 物理攻撃力増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobData
     */
    public get strengthRate() : number {
        return this.strengthRate_;
    }
    /**
     * 物理防御力オフセット
     * @private
     * @type {number}
     * @memberof JobData
     */
    private vitalityOffset_ : number;
    /**
     * 物理防御力オフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobData
     */
    public get vitalityOffset() : number {
        return this.vitalityOffset_;
    }
    /**
     * 物理防御力増加量
     * @private
     * @type {number}
     * @memberof JobData
     */
    private vitalityRate_ : number;
    /**
     * 物理防御力増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobData
     */
    public get vitalityRate() : number {
        return this.vitalityRate_;
    }
    /**
     * 魔法攻撃力オフセット
     * @private
     * @type {number}
     * @memberof JobData
     */
    private intelligenceOffset_ : number;
    /**
     * 魔法攻撃力オフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobData
     */
    public get intelligenceOffset() : number {
        return this.intelligenceOffset_;
    }
    /**
     * 魔法攻撃力増加量
     * @private
     * @type {number}
     * @memberof JobData
     */
    private intelligenceRate_ : number;
    /**
     * 魔法攻撃力増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobData
     */
    public get intelligenceRate() : number {
        return this.intelligenceRate_;
    }
    /**
     * 魔法防御力オフセット
     * @private
     * @type {number}
     * @memberof JobData
     */
    private mindOffset_ : number;
    /**
     * 魔法防御力オフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobData
     */
    public get mindOffset() : number {
        return this.mindOffset_;
    }
    /**
     * 魔法防御力増加量
     * @private
     * @type {number}
     * @memberof JobData
     */
    private mindRate_ : number;
    /**
     * 魔法防御力増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobData
     */
    public get mindRate() : number {
        return this.mindRate_;
    }
    /**
     * 器用さオフセット
     * @private
     * @type {number}
     * @memberof JobData
     */
    private dexterityOffset_ : number;
    /**
     * 器用さオフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobData
     */
    public get dexterityOffset() : number {
        return this.dexterityOffset_;
    }
    /**
     * 器用さ増加量
     * @private
     * @type {number}
     * @memberof JobData
     */
    private dexterityRate_ : number;
    /**
     * 器用さ増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobData
     */
    public get dexterityRate() : number {
        return this.dexterityRate_;
    }
    /**
     * 敏捷性オフセット
     * @private
     * @type {number}
     * @memberof JobData
     */
    private agilityOffset_ : number;
    /**
     * 敏捷性オフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobData
     */
    public get agilityOffset() : number {
        return this.agilityOffset_;
    }
    /**
     * 敏捷性増加量
     * @private
     * @type {number}
     * @memberof JobData
     */
    private agilityRate_ : number;
    /**
     * 敏捷性増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobData
     */
    public get agilityRate() : number {
        return this.agilityRate_;
    }


    /**
     * フルコンストラクタ
     * @public
     * @constructor
     * @param {string} _name 職業名
     * @param {number} _maxHitPointOffset 最大体力オフセット
     * @param {number} _maxHitPointRate 最大体力増加量
     * @param {number} _maxMagicPointOffset 最大魔力オフセット
     * @param {number} _maxMagicPointRate 最大魔力増加量
     * @param {number} _strengthOffset 物理攻撃力オフセット
     * @param {number} _strengthRate 物理攻撃力増加量
     * @param {number} _vitalityOffset 物理防御力オフセット
     * @param {number} _vitalityRate 物理防御力増加量
     * @param {number} _intelligenceOffset 魔法攻撃力オフセット
     * @param {number} _intelligenceRate 魔法攻撃力増加量
     * @param {number} _mindOffset 魔法防御力オフセット
     * @param {number} _mindRate 魔法防御力増加量
     * @param {number} _dexterityOffset 器用さオフセット
     * @param {number} _dexterityRate 器用さ増加量
     * @param {number} _agilityOffset 敏捷性オフセット
     * @param {number} _agilityRate 敏捷性増加量
     * @memberof JobData
     */
    public constructor(
        _name : string,
        _maxHitPointOffset : number,
        _maxHitPointRate : number,
        _maxMagicPointOffset : number,
        _maxMagicPointRate : number,
        _strengthOffset : number,
        _strengthRate : number,
        _vitalityOffset : number,
        _vitalityRate : number,
        _intelligenceOffset : number,
        _intelligenceRate : number,
        _mindOffset : number,
        _mindRate : number,
        _dexterityOffset : number,
        _dexterityRate : number,
        _agilityOffset : number,
        _agilityRate : number
    ){
        this.name_ = _name;
        this.maxHitPointOffset_ = _maxHitPointOffset;
        this.maxHitPointRate_ = _maxHitPointRate;
        this.maxMagicPointOffset_ = _maxMagicPointOffset;
        this.maxMagicPointRate_ = _maxMagicPointRate;
        this.strengthOffset_ = _strengthOffset;
        this.strengthRate_ = _strengthRate;
        this.vitalityOffset_ = _vitalityOffset;
        this.vitalityRate_ = _vitalityRate;
        this.intelligenceOffset_ = _intelligenceOffset;
        this.intelligenceRate_ = _intelligenceRate;
        this.mindOffset_ = _mindOffset;
        this.mindRate_ = _mindRate;
        this.dexterityOffset_ = _dexterityOffset;
        this.dexterityRate_ = _dexterityRate;
        this.agilityOffset_ = _agilityOffset;
        this.agilityRate_ = _agilityRate;
    }
}


/**
 * 敵種族情報アクセサー
 * @export
 * @class JobDataAccessor
 * @implements {DatabaseAccessor}
 */
export class JobDataAccessor implements DatabaseAccessor{
    /**
     * シングルトンインスタンス
     * @private
     * @static
     * @type {JobDataAccessor}
     * @memberof JobDataAccessor
     */
    private static instance_ ?: JobDataAccessor = undefined;
    /**
     * シングルトンインスタンス
     * @public
     * @static
     * @readonly
     * @type {JobDataAccessor}
     * @memberof JobDataAccessor
     */
    public static get instance() : JobDataAccessor {
        if(JobDataAccessor.instance_ === undefined){
            JobDataAccessor.instance_ = new JobDataAccessor();
        }
        return JobDataAccessor.instance_;
    }


    /**
     * 敵種族情報配列
     * @private
     * @type {Array<JobData>}
     * @memberof JobDataAccessor
     */
    private dataArray_ : Array<JobData>;


    /**
     * デフォルトコンストラクタ
     * @private
     * @constructor
     * @memberof JobDataAccessor
     */
    private constructor(){
        this.dataArray_ = new Array<JobData>();
    }

    /**
     * IDで検索
     * @public
     * @param {number} _id ID
     * @returns {(JobData|undefined)} 対応するデータ 無ければundefined
     * @memberof JobDataAccessor
     */
    public Find(_id:number) : JobData|undefined
    /**
     * 名前で検索
     * @public
     * @param {string} _name 名前
     * @returns {(JobData|undefined)} 対応するデータ 無ければundefined
     * @memberof JobDataAccessor
     */
    public Find(_name:string) : JobData|undefined
    /**
     * キーで検索
     * @param {(number|string)} _key 検索するキー
     * @returns {(JobData|undefined)} 対応するデータ 無ければundefined
     * @memberof JobDataAccessor
     */
    public Find(_key:number|string) : JobData|undefined
    /**
     * 検索の実装
     * @param {(number|string)} _key 検索するキー
     * @returns {(JobData|undefined)} 対応するデータ 無ければundefined
     * @memberof JobDataAccessor
     */
    public Find(_key:number|string) : JobData|undefined {
        if(typeof(_key) === 'number'){
            return this.dataArray_[_key];
        }

        return this.dataArray_.filter(
            function(
                _data : JobData,
                _id : number,
                _array : JobData[]
            ) : boolean {
                return (_key === _data.name)
            }
        ).shift();
    }

    /**
     * データを読み込む [非同期]
     * @public
     * @returns {Promise<boolean>} true:成功 false:失敗
     * @memberof JobDataAccessor
     */
    public async Load() : Promise<boolean> {
        // テスト用データ
        const testJob:JobData = new JobData(
            'test',
            900, 100,
            200, 100,
            90, 10,
            80, 20,
            90, 10,
            80, 20,
            90, 10,
            90, 10
        );

        this.dataArray_[0] = testJob;

        // TODO:データベースから情報を読み取る
        console.log('Loaded the job data.');
        return true;
    }
}
