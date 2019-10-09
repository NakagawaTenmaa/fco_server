/**
 * @fileoverview レベルステータスの実装ファイル
 * @file LevelStatus.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Status} from './Status'
import {JobStatus} from './JobStatus'
import {JobData} from './DatabaseAccessors/JobDataAccessor'

/**
 * レベルステータス
 * @export
 * @class LevelStatus
 * @implements {Status}
 */
export class LevelStatus implements Status{
    /**
     * レベル
     * @private
     * @type {number}
     * @memberof LevelStatus
     */
    private level_ : number;
    /**
     * レベル
     * @public
     * @readonly
     * @type {number}
     * @memberof LevelStatus
     */
    public get level() : number {
        return this.level_;
    }
    /**
     * 職業ステータス
     * @private
     * @type {JobStatus}
     * @memberof LevelStatus
     */
    private jobStatus_ : JobStatus;
    /**
     * 職業ステータス
     * @public
     * @memberof LevelStatus
     */
    public set jobStatus(_jobStatus:JobStatus){
        this.jobStatus_ = _jobStatus;
    }

    /**
     * 最大体力
     * @public
     * @readonly
     * @type {number}
     * @memberof LevelStatus
     */
    public get maxHitPoint() : number {
        return (this.jobStatus_.maxHitPointOffset + this.level_*this.jobStatus_.maxHitPointRate);
    }
    /**
     * 最大魔力
     * @public
     * @readonly
     * @type {number}
     * @memberof LevelStatus
     */
    public get maxMagicPoint() : number {
        return (this.jobStatus_.maxMagicPointOffset + this.level_*this.jobStatus_.maxMagicPointRate);
    }
    /**
     * 物理攻撃力
     * @public
     * @readonly
     * @type {number}
     * @memberof LevelStatus
     */
    public get strength() : number {
        return (this.jobStatus_.strengthOffset + this.level_*this.jobStatus_.strengthRate);
    }
    /**
     * 物理防御力
     * @public
     * @readonly
     * @type {number}
     * @memberof LevelStatus
     */
    public get vitality() : number {
        return (this.jobStatus_.vitalityOffset + this.level_*this.jobStatus_.vitalityRate);
    }
    /**
     * 魔法攻撃力
     * @public
     * @readonly
     * @type {number}
     * @memberof LevelStatus
     */
    public get intelligence() : number {
        return (this.jobStatus_.intelligenceOffset + this.level_*this.jobStatus_.intelligenceRate);
    }
    /**
     * 魔法防御力
     * @public
     * @readonly
     * @type {number}
     * @memberof LevelStatus
     */
    public get mind() : number {
        return (this.jobStatus_.mindOffset + this.level_*this.jobStatus_.mindRate);
    }
    /**
     * 器用さ
     * @public
     * @readonly
     * @type {number}
     * @memberof LevelStatus
     */
    public get dexterity() : number {
        return (this.jobStatus_.dexterityOffset + this.level_*this.jobStatus_.dexterityRate);
    }
    /**
     * 敏捷性
     * @public
     * @readonly
     * @type {number}
     * @memberof LevelStatus
     */
    public get agility() : number {
        return (this.jobStatus_.agilityOffset + this.level_*this.jobStatus_.agilityRate);
    }


    /**
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof LevelStatus
     */
    public constructor(){
        this.level_ = 0;
        this.jobStatus_ = new JobStatus();
    }
    
    /**
     * 職業の変更
     * @public
     * @param {JobData} _jobData 職業データ
     * @memberof PlayerStatus
     */
    public ChangeJob(_jobData:JobData) : void {
        this.jobStatus_.ChangeJob(_jobData);
    }
}
