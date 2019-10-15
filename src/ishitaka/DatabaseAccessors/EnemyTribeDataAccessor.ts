/**
 * @fileoverview 敵種族情報アクセサーの実装ファイル
 * @file EnemyTribeDataAccessor.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {DatabaseAccessor} from './DatabaseAccessor'

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
     * 利用するスキルID
     * @public
     * @type {number}
     * @memberof EnemyTribeData
     */
    public useSkillId_ : number;
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
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof EnemyTribeData
     */
    public constructor(){
        this.tribeName_ = 'none';
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
     * データベースを読み込む
     * @public
     * @returns {Promise<boolean>} true:成功 false:失敗
     * @memberof EnemyTribeDataAccessor
     */
    public async Load() : Promise<boolean> {
        // テスト用データ
        const testTribe:EnemyTribeData = new EnemyTribeData();
        testTribe.tribeName_ = 'test';
        testTribe.useSkillId_ = 0;
        testTribe.maxHitPoint_ = 300;
        testTribe.maxMagicPoint_ = 50;
        testTribe.strength_ = 50;
        testTribe.vitality_ = 70;
        testTribe.intelligence_ = 20;
        testTribe.mind_ = 30;
        testTribe.dexterity_ = 50;
        testTribe.agility_ = 50;

        this.enemyTribeDataArray_[0] = testTribe;
        //this.enemyTribeDataArray_ = await GetEnemyData();

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
