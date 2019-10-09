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
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof JobData
     */
    public constructor(){
        this.name_ = 'none';
        this.maxHitPointOffset_ = 0;
        this.maxHitPointRate_ = 0;
        this.maxMagicPointOffset_ = 0;
        this.maxMagicPointRate_ = 0;
        this.strengthOffset_ = 0;
        this.strengthRate_ = 0;
        this.vitalityOffset_ = 0;
        this.vitalityRate_ = 0;
        this.intelligenceOffset_ = 0;
        this.intelligenceRate_ = 0;
        this.mindOffset_ = 0;
        this.mindRate_ = 0;
        this.dexterityOffset_ = 0;
        this.dexterityRate_ = 0;
        this.agilityOffset_ = 0;
        this.agilityRate_ = 0;
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
            JobDataAccessor.instance_.SynchronizeToTheDatabase();
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
     * データベースに同期する
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof JobDataAccessor
     */
    public SynchronizeToTheDatabase() : boolean {
        // テスト用データ
        const testJob:JobData = new JobData();
        testJob.name_ = 'test';
        testJob.maxHitPointOffset_ = 900;
        testJob.maxHitPointRate_ = 100;
        testJob.maxMagicPointOffset_ = 200;
        testJob.maxMagicPointRate_ = 100;
        testJob.strengthOffset_ = 90;
        testJob.strengthRate_ = 10;
        testJob.vitalityOffset_ = 80;
        testJob.vitalityRate_ = 20;
        testJob.intelligenceOffset_ = 90;
        testJob.intelligenceRate_ = 10;
        testJob.mindOffset_ = 80;
        testJob.mindRate_ = 20;
        testJob.dexterityOffset_ = 90;
        testJob.dexterityRate_ = 10;
        testJob.agilityOffset_ = 90;
        testJob.agilityRate_ = 10;

        this.jobDataArray_[0] = testJob;

        // TODO:データベースから情報を読み取る
        console.log('Synchronize of the job data.');
        return true;
    }
}
