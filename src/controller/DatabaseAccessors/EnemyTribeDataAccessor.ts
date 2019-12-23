/**
 * @fileoverview 敵種族情報アクセサーの実装ファイル
 * @file EnemyTribeDataAccessor.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {DatabaseAccessor} from './DatabaseAccessor'
import { EnemyModel } from '../../model/enemy';

/**
 * 敵種族情報
 * @export
 * @class EnemyTribeData
 */
export class EnemyTribeData{
    /**
     * 種族名
     * @private
     * @type {string}
     * @memberof EnemyTribeData
     */
    private tribeName_ : string;
    /**
     * 種族名
     * @public
     * @readonly
     * @type {string}
     * @memberof EnemyTribeData
     */
    public get tribeName() : string {
        return this.tribeName_;
    }
    /**
     * レベル
     * @private
     * @type {number}
     * @memberof EnemyTribeData
     */
    private level_ : number;
    /**
     * レベル
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeData
     */
    public get level() : number {
        return this.level_;
    }
    /**
     * 使用スキルID
     * @private
     * @type {number}
     * @memberof EnemyTribeData
     */
    private useSkillId_ : number;
    /**
     * 使用スキルID
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeData
     */
    public get useSkillId() : number {
        return this.useSkillId_;
    }
    /**
     * モデルID
     * @private
     * @type {number}
     * @memberof EnemyTribeData
     */
    private modelId_ : number;
    /**
     * モデルID
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeData
     */
    public get modelId() : number {
        return this.modelId_;
    }
    /**
     * 最大体力
     * @private
     * @type {number}
     * @memberof EnemyTribeData
     */
    private maxHitPoint_ : number;
    /**
     * 最大体力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeData
     */
    public get maxHitPoint() : number {
        return this.maxHitPoint_;
    }
    /**
     * 最大魔力
     * @private
     * @type {number}
     * @memberof EnemyTribeData
     */
    private maxMagicPoint_ : number;
    /**
     * 最大魔力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeData
     */
    public get maxMagicPoint() : number {
        return this.maxMagicPoint_;
    }
    /**
     * 物理攻撃力
     * @private
     * @type {number}
     * @memberof EnemyTribeData
     */
    private strength_ : number;
    /**
     * 物理攻撃力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeData
     */
    public get strength() : number {
        return this.strength_;
    }
    /**
     * 物理防御力
     * @private
     * @type {number}
     * @memberof EnemyTribeData
     */
    private vitality_ : number;
    /**
     * 物理防御力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeData
     */
    public get vitality() : number {
        return this.vitality_;
    }
    /**
     * 魔法攻撃力
     * @private
     * @type {number}
     * @memberof EnemyTribeData
     */
    private intelligence_ : number;
    /**
     * 魔法攻撃力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeData
     */
    public get intelligence() : number {
        return this.intelligence_;
    }
    /**
     * 魔法防御力
     * @private
     * @type {number}
     * @memberof EnemyTribeData
     */
    private mind_ : number;
    /**
     * 魔法防御力
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeData
     */
    public get mind() : number {
        return this.mind_;
    }
    /**
     * 器用さ
     * @private
     * @type {number}
     * @memberof EnemyTribeData
     */
    private dexterity_ : number;
    /**
     * 器用さ
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeData
     */
    public get dexterity() : number {
        return this.dexterity_;
    }
    /**
     * 敏捷性
     * @private
     * @type {number}
     * @memberof EnemyTribeData
     */
    private agility_ : number;
    /**
     * 敏捷性
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyTribeData
     */
    public get agility() : number {
        return this.agility_;
    }


    /**
     * フルコンストラクタ
     * @public
     * @constructor
     * @param {string} _tribeName 種族名
     * @param {number} _level レベル
     * @param {number} _useSkillId 使用スキルID
     * @param {number} _modelId モデルID
     * @param {number} _maxHitPoint 最大体力
     * @param {number} _maxMagicPoint 最大魔力
     * @param {number} _strength 物理攻撃力
     * @param {number} _vitality 物理防御力
     * @param {number} _intelligence 魔法攻撃力
     * @param {number} _mind 魔法防御力
     * @param {number} _dexterity 器用さ
     * @param {number} _agility 敏捷性
     * @memberof EnemyTribeData
     */
    public constructor(
        _tribeName : string,
        _level : number,
        _useSkillId : number,
        _modelId : number,
        _maxHitPoint : number,
        _maxMagicPoint : number,
        _strength : number,
        _vitality : number,
        _intelligence : number,
        _mind : number,
        _dexterity : number,
        _agility : number
    ){
        this.tribeName_ = _tribeName;
        this.level_ = _level;
        this.useSkillId_ = _useSkillId;
        this.modelId_ = _modelId;
        this.maxHitPoint_ = _maxHitPoint;
        this.maxMagicPoint_ = _maxMagicPoint;
        this.strength_ = _strength;
        this.vitality_ = _vitality;
        this.intelligence_ = _intelligence;
        this.mind_ = _mind;
        this.dexterity_ = _dexterity;
        this.agility_ = _agility;
    }
}


/**
 * 敵種族情報アクセサー
 * @export
 * @class EnemyTribeDataAccessor
 * @implements {DatabaseAccessor}
 */
export class EnemyTribeDataAccessor implements DatabaseAccessor{
    /**
     * シングルトンインスタンス
     * @private
     * @static
     * @type {EnemyTribeDataAccessor}
     * @memberof EnemyTribeDataAccessor
     */
    private static instance_ ?: EnemyTribeDataAccessor = undefined;
    /**
     * シングルトンインスタンス
     * @public
     * @static
     * @readonly
     * @type {EnemyTribeDataAccessor}
     * @memberof EnemyTribeDataAccessor
     */
    public static get instance() : EnemyTribeDataAccessor {
        if(EnemyTribeDataAccessor.instance_ === undefined){
            EnemyTribeDataAccessor.instance_ = new EnemyTribeDataAccessor();
        }
        return EnemyTribeDataAccessor.instance_;
    }


    /**
     * 敵種族情報配列
     * @private
     * @type {Array<EnemyTribeData>}
     * @memberof EnemyTribeDataAccessor
     */
    private dataArray_ : Array<EnemyTribeData>;


    /**
     * デフォルトコンストラクタ
     * @private
     * @constructor
     * @memberof EnemyTribeDataAccessor
     */
    private constructor(){
        this.dataArray_ = new Array<EnemyTribeData>();
    }

    /**
     * IDで検索
     * @public
     * @param {number} _id ID
     * @returns {(EnemyTribeData|undefined)} 対応するデータ 無ければundefined
     * @memberof EnemyTribeDataAccessor
     */
    public Find(_id:number) : EnemyTribeData|undefined
    /**
     * 名前で検索
     * @public
     * @param {string} _name 名前
     * @returns {(EnemyTribeData|undefined)} 対応するデータ 無ければundefined
     * @memberof EnemyTribeDataAccessor
     */
    public Find(_name:string) : EnemyTribeData|undefined
    /**
     * キーで検索
     * @param {(number|string)} _key 検索するキー
     * @returns {(EnemyTribeData|undefined)} 対応するデータ 無ければundefined
     * @memberof EnemyTribeDataAccessor
     */
    public Find(_key:number|string) : EnemyTribeData|undefined
    /**
     * 検索の実装
     * @param {(number|string)} _key 検索するキー
     * @returns {(EnemyTribeData|undefined)} 対応するデータ 無ければundefined
     * @memberof EnemyTribeDataAccessor
     */
    public Find(_key:number|string) : EnemyTribeData|undefined {
        if(typeof(_key) === 'number'){
            return this.dataArray_[_key];
        }

        return this.dataArray_.filter(
            function(
                _data : EnemyTribeData,
                _id : number,
                _array : EnemyTribeData[]
            ) : boolean {
                return (_key === _data.tribeName);
            }
        ).shift();
    }

    /**
     * データを読み込む [非同期]
     * @public
     * @returns {Promise<boolean>} true:成功 false:失敗
     * @memberof EnemyTribeDataAccessor
     */
    public async Load() : Promise<boolean> {
        this.dataArray_ = await EnemyModel.getEnemyList();
        // TODO:データベースから情報を読み取る
        console.log('Loaded the enemy tribe data.');
        return true;
    }

    /**
     * ランダムなIDを取得
     * @public
     * @returns {number}
     * @memberof EnemyTribeDataAccessor
     */
    public GetRandomID() : number {
        const getting:number = Math.floor(this.dataArray_.length * Math.random());
        let id:number = 0;
        let i:number = 0;
        this.dataArray_.every(
            function(
                _data : EnemyTribeData,
                _id : number,
                _array : EnemyTribeData[]
            ) : boolean {
                if(i === 0){
                    id = _id;
                }
                if(i == getting){
                    id = _id;
                    return false;
                }
                ++i;
                return true;
            }
        );

        return id;
    }

    /**
     * IDの取得
     * @public
     * @param {string} _name 名前
     * @returns {number} 対応するエリアのID
     * @memberof EnemyTribeDataAccessor
     */
    public GetId(_name:string) : number {
        return this.dataArray_.findIndex(
            function(
                _data : EnemyTribeData,
                _id : number,
                _array : EnemyTribeData[]
            ) : boolean {
                return (_name === _data.tribeName);
            }
        );
    }
}
