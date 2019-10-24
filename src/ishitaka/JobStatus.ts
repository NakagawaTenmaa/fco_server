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
     * 職業データ
     * @private
     * @type {JobData}
     * @memberof JobStatus
     */
    private jobData_ : JobData;
    /**
     * 最大体力オフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get maxHitPointOffset() : number {
        return this.jobData_.maxHitPointOffset;
    }
    /**
     * 最大体力増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get maxHitPointRate() : number {
        return this.jobData_.maxHitPointRate;
    }
    /**
     * 最大魔力オフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get maxMagicPointOffset() : number {
        return this.jobData_.maxMagicPointOffset;
    }
    /**
     * 最大魔力増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get maxMagicPointRate() : number {
        return this.jobData_.maxMagicPointRate;
    }
    /**
     * 物理攻撃力オフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get strengthOffset() : number {
        return this.jobData_.strengthOffset;
    }
    /**
     * 物理攻撃力増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get strengthRate() : number {
        return this.jobData_.strengthRate;
    }
    /**
     * 物理防御力オフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get vitalityOffset() : number {
        return this.jobData_.vitalityOffset;
    }
    /**
     * 物理防御力増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get vitalityRate() : number {
        return this.jobData_.vitalityRate;
    }
    /**
     * 魔法攻撃力オフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get intelligenceOffset() : number {
        return this.jobData_.intelligenceOffset;
    }
    /**
     * 魔法攻撃力増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get intelligenceRate() : number {
        return this.jobData_.intelligenceRate;
    }
    /**
     * 魔法防御力オフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get mindOffset() : number {
        return this.jobData_.mindOffset;
    }
    /**
     * 魔法防御力増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get mindRate() : number {
        return this.jobData_.mindRate;
    }
    /**
     * 器用さオフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get dexterityOffset() : number {
        return this.jobData_.dexterityOffset;
    }
    /**
     * 器用さ増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get dexterityRate() : number {
        return this.jobData_.dexterityRate;
    }
    /**
     * 敏捷性オフセット
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get agilityOffset() : number {
        return this.jobData_.agilityOffset;
    }
    /**
     * 敏捷性増加量
     * @public
     * @readonly
     * @type {number}
     * @memberof JobStatus
     */
	public get agilityRate() : number {
        return this.jobData_.agilityRate;
    }


    /**
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof JobStatus
     */
    public constructor(){
        this.jobData_ = new JobData(
            'NoJob',
            0, 0,
            0, 0,
            0, 0,
            0, 0,
            0, 0,
            0, 0,
            0, 0,
            0, 0
        );
    }


    /**
     * 職業の変更
     * @public
     * @param {JobData} _jobData 職業データ
     * @memberof JobStatus
     */
    public ChangeJob(_jobData:JobData) : void {
        this.jobData_ = _jobData;
    }
}
