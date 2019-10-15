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
     * 利用するスキルID
     * @private
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    private useSkillId_ : number;
    /**
     * 最大体力
     * @private
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    private maxHitPoint_ : number;
    /**
     * 最大魔力
     * @private
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    private maxMagicPoint_ : number;
    /**
     * 物理攻撃力
     * @private
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    private strength_ : number;
    /**
     * 物理防御力
     * @private
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    private vitality_ : number;
    /**
     * 魔法攻撃力
     * @private
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    private intelligence_ : number;
    /**
     * 魔法防御力
     * @private
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    private mind_ : number;
    /**
     * 器用さ
     * @private
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    private dexterity_ : number;
    /**
     * 敏捷性
     * @private
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    private agility_ : number;

    
    /**
     * 利用するスキルID
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    public get useSkillId() : number {
        return this.useSkillId_;
    }
    /**
     * 最大体力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    public get maxHitPoint() : number {
        return this.maxHitPoint_;
    }
    /**
     * 最大魔力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    public get maxMagicPoint() : number {
        return this.maxMagicPoint_;
    }
    /**
     * 物理攻撃力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    public get strength() : number {
        return this.strength_;
    }
    /**
     * 物理防御力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    public get vitality() : number {
        return this.vitality_;
    }
    /**
     * 魔法攻撃力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    public get intelligence() : number {
        return this.intelligence_;
    }
    /**
     * 魔法防御力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    public get mind() : number {
        return this.mind_;
    }
    /**
     * 器用さ
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    public get dexterity() : number {
        return this.dexterity_;
    }
    /**
     * 敏捷性
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeStatus
     */
    public get agility() : number {
        return this.agility_;
    }


    /**
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof EnemyTribeStatus
     */
    public constructor(){
        this.useSkillId_ = 0;
        this.maxHitPoint_ = 0;
        this.maxMagicPoint_ = 0;
        this.strength_ = 0;
        this.vitality_ = 0;
        this.intelligence_ = 0;
        this.mind_ = 0;
        this.dexterity_ = 0;
        this.agility_ = 0;
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
        this.useSkillId_ = _tribeData.useSkillId_;
        this.maxHitPoint_ = _tribeData.maxHitPoint_;
        this.maxMagicPoint_ = _tribeData.maxMagicPoint_;
        this.strength_ = _tribeData.strength_;
        this.vitality_ = _tribeData.vitality_;
        this.intelligence_ = _tribeData.intelligence_;
        this.mind_ = _tribeData.mind_;
        this.dexterity_ = _tribeData.dexterity_;
        this.agility_ = _tribeData.agility_;
        return true;
    }
}
