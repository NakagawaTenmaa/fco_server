/**
 * @fileoverview 敵種族ステータスの実装ファイル
 * @file EnemyTribeStatus.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Status} from './Status'
import {EnemyTribeData} from './DatabaseAccessors/EnemyTribeDataAccessor'

/**
 * 敵種族ステータス
 * @export
 * @class EnemyTribeStatus
 * @implements {Status}
 */
export class EnemyTribeStatus implements Status{
    /**
     * 敵種族データ
     * @private
     * @type {EnemyTribeData}
     * @memberof EnemyTribeStatus
     */
    private tribeData_ : EnemyTribeData;

    
    /**
     * 利用するスキルID
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    public get useSkillId() : number {
        return this.tribeData_.useSkillId;
    }
    /**
     * 最大体力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    public get maxHitPoint() : number {
        return this.tribeData_.maxHitPoint;
    }
    /**
     * 最大魔力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    public get maxMagicPoint() : number {
        return this.tribeData_.maxMagicPoint;
    }
    /**
     * 物理攻撃力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    public get strength() : number {
        return this.tribeData_.strength;
    }
    /**
     * 物理防御力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    public get vitality() : number {
        return this.tribeData_.vitality;
    }
    /**
     * 魔法攻撃力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    public get intelligence() : number {
        return this.tribeData_.intelligence;
    }
    /**
     * 魔法防御力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    public get mind() : number {
        return this.tribeData_.mind;
    }
    /**
     * 器用さ
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    public get dexterity() : number {
        return this.tribeData_.dexterity;
    }
    /**
     * 敏捷性
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    public get agility() : number {
        return this.tribeData_.agility;
    }


    /**
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof EnemyTribeStatus
     */
    public constructor(){
        this.tribeData_ = new EnemyTribeData(
            'None',
            0,
            0,
            0, 0,
            0, 0,
            0, 0,
            0,
            0
        );
    }

    /**
     * 種族(またはレベル)の変更
     * @public
     * @param {EnemyTribeData} _tribeData 種族情報
     * @param {number} _level レベル
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyTribeStatus
     */
    public ChangeTribe(_tribeData:EnemyTribeData, _level:number) : boolean {
        this.tribeData_ = _tribeData;
        return true;
    }
}
