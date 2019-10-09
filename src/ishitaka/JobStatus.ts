/**
 * @fileoverview 職業ステータスの実装ファイル
 * @file JobStatus.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {JobData} from "./DatabaseAccessors/JobDataAccessor";

/**
 * 職業ステータス
 * @export
 * @class JobStatus
 */
export class JobStatus{
    /**
     * 最大体力オフセット
     * @private
     * @type {number}
     * @memberof JobStatus
     */
    private maxHitPointOffset_ : number
    /**
     * 最大体力オフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get maxHitPointOffset() : number {
        return this.maxHitPointOffset_;
    }
    /**
     * 最大体力増加量
     * @private
     * @type {number}
     * @memberof JobStatus
     */
    private maxHitPointRate_ : number
    /**
     * 最大体力増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get maxHitPointRate() : number {
        return this.maxHitPointRate_;
    }
    /**
     * 最大魔力オフセット
     * @private
     * @type {number}
     * @memberof JobStatus
     */
    private maxMagicPointOffset_ : number
    /**
     * 最大魔力オフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get maxMagicPointOffset() : number {
        return this.maxMagicPointOffset_;
    }
    /**
     * 最大魔力増加量
     * @private
     * @type {number}
     * @memberof JobStatus
     */
    private maxMagicPointRate_ : number
    /**
     * 最大魔力増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get maxMagicPointRate() : number {
        return this.maxMagicPointRate_;
    }
    /**
     * 物理攻撃力オフセット
     * @private
     * @type {number}
     * @memberof JobStatus
     */
    private strengthOffset_ : number;
    /**
     * 物理攻撃力オフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get strengthOffset() : number {
        return this.strengthOffset_;
    }
    /**
     * 物理攻撃力増加量
     * @private
     * @type {number}
     * @memberof JobStatus
     */
    private strengthRate_ : number;
    /**
     * 物理攻撃力増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get strengthRate() : number {
        return this.strengthRate_;
    }
    /**
     * 物理防御力オフセット
     * @private
     * @type {number}
     * @memberof JobStatus
     */
    private vitalityOffset_ : number;
    /**
     * 物理防御力オフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get vitalityOffset() : number {
        return this.vitalityOffset_;
    }
    /**
     * 物理防御力増加量
     * @private
     * @type {number}
     * @memberof JobStatus
     */
    private vitalityRate_ : number;
    /**
     * 物理防御力増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get vitalityRate() : number {
        return this.vitalityRate_;
    }
    /**
     * 魔法攻撃力オフセット
     * @private
     * @type {number}
     * @memberof JobStatus
     */
    private intelligenceOffset_ : number;
    /**
     * 魔法攻撃力オフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get intelligenceOffset() : number {
        return this.intelligenceOffset_;
    }
    /**
     * 魔法攻撃力増加量
     * @private
     * @type {number}
     * @memberof JobStatus
     */
    private intelligenceRate_ : number;
    /**
     * 魔法攻撃力増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get intelligenceRate() : number {
        return this.intelligenceRate_;
    }
    /**
     * 魔法防御力オフセット
     * @private
     * @type {number}
     * @memberof JobStatus
     */
    private mindOffset_ : number;
    /**
     * 魔法防御力オフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get mindOffset() : number {
        return this.mindOffset_;
    }
    /**
     * 魔法防御力増加量
     * @private
     * @type {number}
     * @memberof JobStatus
     */
    private mindRate_ : number;
    /**
     * 魔法防御力増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get mindRate() : number {
        return this.mindRate_;
    }
    /**
     * 器用さオフセット
     * @private
     * @type {number}
     * @memberof JobStatus
     */
    private dexterityOffset_ : number;
    /**
     * 器用さオフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get dexterityOffset() : number {
        return this.dexterityOffset_;
    }
    /**
     * 器用さ増加量
     * @private
     * @type {number}
     * @memberof JobStatus
     */
    private dexterityRate_ : number;
    /**
     * 器用さ増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get dexterityRate() : number {
        return this.dexterityRate_;
    }
    /**
     * 敏捷性オフセット
     * @private
     * @type {number}
     * @memberof JobStatus
     */
    private agilityOffset_ : number;
    /**
     * 敏捷性オフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get agilityOffset() : number {
        return this.agilityOffset_;
    }
    /**
     * 敏捷性増加量
     * @private
     * @type {number}
     * @memberof JobStatus
     */
    private agilityRate_ : number;
    /**
     * 敏捷性増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get agilityRate() : number {
        return this.agilityRate_;
    }


    /**
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof JobStatus
     */
    public constructor(){
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


    /**
     * 職業の変更
     * @public
     * @param {JobData} _jobData 職業データ
     * @memberof JobStatus
     */
    public ChangeJob(_jobData:JobData) : void {
        this.maxHitPointOffset_ = _jobData.maxHitPointOffset_;
        this.maxHitPointRate_ = _jobData.maxHitPointRate_;
        this.maxMagicPointOffset_ = _jobData.maxMagicPointOffset_;
        this.maxMagicPointRate_ = _jobData.maxMagicPointRate_;
        this.strengthOffset_ = _jobData.strengthOffset_;
        this.strengthRate_ = _jobData.strengthRate_;
        this.vitalityOffset_ = _jobData.vitalityOffset_;
        this.vitalityRate_ = _jobData.vitalityRate_;
        this.intelligenceOffset_ = _jobData.intelligenceOffset_;
        this.intelligenceRate_ = _jobData.intelligenceRate_;
        this.mindOffset_ = _jobData.mindOffset_;
        this.mindRate_ = _jobData.mindRate_;
        this.dexterityOffset_ = _jobData.dexterityOffset_;
        this.dexterityRate_ = _jobData.dexterityRate_;
        this.agilityOffset_ = _jobData.agilityOffset_;
        this.agilityRate_ = _jobData.agilityRate_;
    }
}
