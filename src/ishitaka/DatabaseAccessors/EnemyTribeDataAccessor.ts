/**
 * @fileoverview 敵種族情報アクセサーの実装ファイル
 * @file EnemyTribeDataAccessor.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {DatabaseAccessor} from './DatabaseAccessor'
import { EnemyModel } from '../../model/enemy'

/**
 * 敵種族情報
 * @export
 * @class EnemyTribeData
 */
export class EnemyTribeData{
    /**
     * 種族名
     * @public
     * @type {string}
     * @memberof EnemyTribeData
     */
    public tribeName_ : string;
    /**
     * 使用スキルID
     * @public
     * @type {number}
     * @memberof EnemyTribeData
     */
    public useSkillId_ : number;
    /**
     * モデルID
     * @public
     * @type {number}
     * @memberof EnemyTribeData
     */
    public modelId_ : number;
    /**
     * 最大体力
     * @public
     * @type {number}
     * @memberof EnemyTribeData
     */
    public maxHitPoint_ : number;
    /**
     * 最大魔力
     * @public
     * @type {number}
     * @memberof EnemyTribeData
     */
    public maxMagicPoint_ : number;
    /**
     * 物理攻撃力
     * @public
     * @type {number}
     * @memberof EnemyTribeData
     */
    public strength_ : number;
    /**
     * 物理防御力
     * @public
     * @type {number}
     * @memberof EnemyTribeData
     */
    public vitality_ : number;
    /**
     * 魔法攻撃力
     * @public
     * @type {number}
     * @memberof EnemyTribeData
     */
    public intelligence_ : number;
    /**
     * 魔法防御力
     * @public
     * @type {number}
     * @memberof EnemyTribeData
     */
    public mind_ : number;
    /**
     * 器用さ
     * @public
     * @type {number}
     * @memberof EnemyTribeData
     */
    public dexterity_ : number;
    /**
     * 敏捷性
     * @public
     * @type {number}
     * @memberof EnemyTribeData
     */
    public agility_ : number;


    /**
     * フルコンストラクタ
     * @public
     * @constructor
     * @param {string} _tribeName 種族名
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
    private enemyTribeDataArray_ : Array<EnemyTribeData>;


    /**
     * デフォルトコンストラクタ
     * @private
     * @constructor
     * @memberof EnemyTribeDataAccessor
     */
    private constructor(){
        this.enemyTribeDataArray_ = new Array<EnemyTribeData>();
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
        return this.enemyTribeDataArray_.filter(
            function(
                _data : EnemyTribeData,
                _id : number,
                _array : EnemyTribeData[]
            ) : boolean {
                return ((_key === _id) || (_key === _data.tribeName_));
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
       
        // テスト用データ
        const testTribe:EnemyTribeData = new EnemyTribeData(
            'test',
            0,
            0,
            300, 50,
            50, 70,
            20, 30,
            50,
            50
        );

        //this.enemyTribeDataArray_[0] = testTribe;
        
        const enemy: EnemyModel = new EnemyModel();
        this.enemyTribeDataArray_ = await enemy.getEnemyList();

        console.log(this.enemyTribeDataArray_);

        // TODO:データベースから情報を読み取る
        console.log('Synchronize of the enemy tribe data.');
        return true;
    }

    /**
     * ランダムなIDを取得
     * @public
     * @returns {number}
     * @memberof EnemyTribeDataAccessor
     */
    public GetRandomID() : number {
        const getting:number = Math.floor(this.enemyTribeDataArray_.length * Math.random());
        let id:number = 0;
        let i:number = 0;
        this.enemyTribeDataArray_.every(
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
}
