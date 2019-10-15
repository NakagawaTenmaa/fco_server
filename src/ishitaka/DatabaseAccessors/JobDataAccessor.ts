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
     * @public
     * @type {string}
     * @memberof JobData
     */
    public name_ : string;
    /**
     * 最大体力オフセット
     * @public
     * @type {number}
     * @memberof JobData
     */
    public maxHitPointOffset_ : number;
    /**
     * 最大体力増加量
     * @public
     * @type {number}
     * @memberof JobData
     */
    public maxHitPointRate_ : number;
    /**
     * 最大魔力オフセット
     * @public
     * @type {number}
     * @memberof JobData
     */
    public maxMagicPointOffset_ : number;
    /**
     * 最大魔力増加量
     * @public
     * @type {number}
     * @memberof JobData
     */
    public maxMagicPointRate_ : number;
    /**
     * 物理攻撃力オフセット
     * @public
     * @type {number}
     * @memberof JobData
     */
    public strengthOffset_ : number;
    /**
     * 物理攻撃力増加量
     * @public
     * @type {number}
     * @memberof JobData
     */
    public strengthRate_ : number;
    /**
     * 物理防御力オフセット
     * @public
     * @type {number}
     * @memberof JobData
     */
    public vitalityOffset_ : number;
    /**
     * 物理防御力増加量
     * @public
     * @type {number}
     * @memberof JobData
     */
    public vitalityRate_ : number;
    /**
     * 魔法攻撃力オフセット
     * @public
     * @type {number}
     * @memberof JobData
     */
    public intelligenceOffset_ : number;
    /**
     * 魔法攻撃力増加量
     * @public
     * @type {number}
     * @memberof JobData
     */
    public intelligenceRate_ : number;
    /**
     * 魔法防御力オフセット
     * @public
     * @type {number}
     * @memberof JobData
     */
    public mindOffset_ : number;
    /**
     * 魔法防御力増加量
     * @public
     * @type {number}
     * @memberof JobData
     */
    public mindRate_ : number;
    /**
     * 器用さオフセット
     * @public
     * @type {number}
     * @memberof JobData
     */
    public dexterityOffset_ : number;
    /**
     * 器用さ増加量
     * @public
     * @type {number}
     * @memberof JobData
     */
    public dexterityRate_ : number;
    /**
     * 敏捷性オフセット
     * @public
     * @type {number}
     * @memberof JobData
     */
    public agilityOffset_ : number;
    /**
     * 敏捷性増加量
     * @public
     * @type {number}
     * @memberof JobData
     */
    public agilityRate_ : number;


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
    private jobDataArray_ : Array<JobData>;


    /**
     * デフォルトコンストラクタ
     * @private
     * @constructor
     * @memberof JobDataAccessor
     */
    private constructor(){
        this.jobDataArray_ = new Array<JobData>();
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
        return this.jobDataArray_.filter(
            function(
                _data : JobData,
                _id : number,
                _array : JobData[]
            ) : boolean {
                return ((_key === _id) || (_key === _data.name_))
            }
        ).shift();
    }

    /**
     * データベースを読み込む
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

        this.jobDataArray_[0] = testJob;

        // TODO:データベースから情報を読み取る
        console.log('Synchronize of the job data.');
        return true;
    }
}
