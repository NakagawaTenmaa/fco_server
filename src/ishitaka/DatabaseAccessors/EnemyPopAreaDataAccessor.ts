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
     * Y位置座標
     * @public
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public positionY_ : number;
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
     * フルコンストラクタ
     * @public
     * @constructor
     * @param {number} _mapID マップID
     * @param {number} _positionX X位置座標
     * @param {number} _positionY Y位置座標
     * @param {number} _positionZ Z位置座標
     * @param {number} _popAreaRadius 出現エリア半径
     * @param {number} _areaRadius エリア半径
     * @param {number} _maxPopEnemyCount 敵ポップ最大数
     * @param {number} _popEnemy1ID ポップする敵1の種族ID
     * @param {number} _popEnemy1MaxCount ポップする敵1の最大数
     * @param {number} _popEnemy2ID ポップする敵2の種族ID
     * @param {number} _popEnemy2MaxCount ポップする敵2の最大数
     * @param {number} _popEnemy3ID ポップする敵3の種族ID
     * @param {number} _popEnemy3MaxCount ポップする敵3の最大数
     * @memberof EnemyPopAreaData
     */
    public constructor(
        _mapID : number,
        _positionX : number,
        _positionY : number,
        _positionZ : number,
        _popAreaRadius : number,
        _areaRadius : number,
        _maxPopEnemyCount : number,
        _popEnemy1ID : number,
        _popEnemy1MaxCount : number,
        _popEnemy2ID : number,
        _popEnemy2MaxCount : number,
        _popEnemy3ID : number,
        _popEnemy3MaxCount : number,
    ){
        this.mapID_ = _mapID;
        this.positionX_ = _positionX;
        this.positionY_ = _positionY;
        this.positionZ_ = _positionZ;
        this.popAreaRadius_ = _popAreaRadius;
        this.areaRadius_ = _areaRadius;
        this.maxPopEnemyCount_ = _maxPopEnemyCount;
        this.popEnemy1ID_ = _popEnemy1ID;
        this.popEnemy1MaxCount_ = _popEnemy1MaxCount;
        this.popEnemy2ID_ = _popEnemy2ID;
        this.popEnemy2MaxCount_ = _popEnemy2MaxCount;
        this.popEnemy3ID_ = _popEnemy3ID;
        this.popEnemy3MaxCount_ = _popEnemy3MaxCount;
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
     * データベースを読み込む
     * @public
     * @returns {Promise<boolean>} true:成功 false:失敗
     * @memberof EnemyPopAreaDataAccessor
     */
    public async Load() : Promise<boolean> {
        // テスト用データ
        const testArea:EnemyPopAreaData = new EnemyPopAreaData(
            0,
            10.0, 0.0, -20.0,
            3.0,
            5.0,
            3,
            0, 3,
            -1, 0,
            -1, 0
        );

        this.enemyPopAreaDataArray_[0] = testArea;

        // TODO:データベースから情報を読み取る
        console.log('Synchronize of the enemy pop area data.');
        return true;
    }
}
