/**
 * @fileoverview 敵ポップエリア情報アクセサーの実装ファイル
 * @file EnemyPopAreaDataAccessor.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {DatabaseAccessor} from './DatabaseAccessor'

/**
 * 敵ポップエリア情報
 * @export
 * @class EnemyPopAreaData
 */
export class EnemyPopAreaData{
    /**
     * マップID
     * @public
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public mapID_ : number;
    /**
     * X位置座標
     * @public
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public positionX_ : number;
    /**
     * Z位置座標
     * @public
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public positionZ_ : number;
    /**
     * 出現エリア半径
     * @public
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public popAreaRadius_ : number;
    /**
     * エリア半径
     * @public
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public areaRadius_ : number;
    /**
     * 敵ポップ最大数
     * @public
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public maxPopEnemyCount_ : number;
    /**
     * ポップする敵1の種族ID
     * @public
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public popEnemy1ID_ : number;
    /**
     * ポップする敵1の最大数
     * @public
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public popEnemy1MaxCount_ : number;
    /**
     * ポップする敵2の種族ID
     * @public
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public popEnemy2ID_ : number;
    /**
     * ポップする敵2の最大数
     * @public
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public popEnemy2MaxCount_ : number;
    /**
     * ポップする敵3の種族ID
     * @public
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public popEnemy3ID_ : number;
    /**
     * ポップする敵3の最大数
     * @public
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public popEnemy3MaxCount_ : number;


    /**
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof EnemyPopAreaData
     */
    public constructor(){
        this.mapID_ = -1;
        this.positionX_ = 0;
        this.positionZ_ = 0;
        this.popAreaRadius_ = 0;
        this.areaRadius_ = 0;
        this.maxPopEnemyCount_ = 0;
        this.popEnemy1ID_ = -1;
        this.popEnemy1MaxCount_ = 0;
        this.popEnemy2ID_ = -1;
        this.popEnemy2MaxCount_ = 0;
        this.popEnemy3ID_ = -1;
        this.popEnemy3MaxCount_ = 0;
    }
}


/**
 * 敵ポップエリア情報アクセサー
 * @export
 * @class EnemyPopAreaDataAccessor
 * @implements {DatabaseAccessor}
 */
export class EnemyPopAreaDataAccessor implements DatabaseAccessor{
    /**
     * シングルトンインスタンス
     * @private
     * @static
     * @type {EnemyPopAreaDataAccessor}
     * @memberof EnemyPopAreaDataAccessor
     */
    private static instance_ ?: EnemyPopAreaDataAccessor = undefined;
    /**
     * シングルトンインスタンス
     * @public
     * @static
     * @readonly
     * @type {EnemyPopAreaDataAccessor}
     * @memberof EnemyPopAreaDataAccessor
     */
    public static get instance() : EnemyPopAreaDataAccessor {
        if(EnemyPopAreaDataAccessor.instance_ === undefined){
            EnemyPopAreaDataAccessor.instance_ = new EnemyPopAreaDataAccessor();
            EnemyPopAreaDataAccessor.instance_.SynchronizeToTheDatabase();
        }
        return EnemyPopAreaDataAccessor.instance_;
    }


    /**
     * 敵種族情報配列
     * @private
     * @type {Array<EnemyPopAreaData>}
     * @memberof EnemyPopAreaDataAccessor
     */
    private enemyPopAreaDataArray_ : Array<EnemyPopAreaData>;
    /**
     * 敵種族情報配列
     * @public
     * @readonly
     * @type {Array<EnemyPopAreaData>}
     * @memberof EnemyPopAreaDataAccessor
     */
    public get dataArray() :  Array<EnemyPopAreaData> {
        return this.enemyPopAreaDataArray_;
    }


    /**
     * デフォルトコンストラクタ
     * @private
     * @constructor
     * @memberof EnemyPopAreaDataAccessor
     */
    private constructor(){
        this.enemyPopAreaDataArray_ = new Array<EnemyPopAreaData>();
    }

    /**
     * IDで検索
     * @public
     * @param {number} _id ID
     * @returns {(EnemyPopAreaData|undefined)} 対応するデータ 無ければundefined
     * @memberof EnemyPopAreaDataAccessor
     */
    public Find(_id:number) : EnemyPopAreaData|undefined {
        if(_id in this.enemyPopAreaDataArray_){
            return this.enemyPopAreaDataArray_[_id];
        }
        else{
            return undefined;
        }
    }

    /**
     * データベースに同期する
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyPopAreaDataAccessor
     */
    public SynchronizeToTheDatabase() : boolean {
        // テスト用データ
        const testArea:EnemyPopAreaData = new EnemyPopAreaData();
        testArea.mapID_ = 0;
        testArea.positionX_ = 10.0;
        testArea.positionZ_ = -20.0;
        testArea.popAreaRadius_ = 3.0;
        testArea.areaRadius_ = 5.0;
        testArea.maxPopEnemyCount_ = 3;
        testArea.popEnemy1ID_ = 0;
        testArea.popEnemy1MaxCount_ = 3;
        testArea.popEnemy2ID_ = -1;
        testArea.popEnemy2MaxCount_ = 0;
        testArea.popEnemy3ID_ = -1;
        testArea.popEnemy3MaxCount_ = 0;

        this.enemyPopAreaDataArray_[0] = testArea;

        // TODO:データベースから情報を読み取る
        console.log('Synchronize of the enemy pop area data.');
        return true;
    }
}
