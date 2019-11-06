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
     * @private
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    private mapId_ : number;
    /**
     * マップID
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public get mapId() : number {
        return this.mapId_;
    }
    /**
     * X位置座標
     * @private
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    private positionX_ : number;
    /**
     * X位置座標
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public get positionX() : number {
        return this.positionX_;
    }
    /**
     * Y位置座標
     * @private
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    private positionY_ : number;
    /**
     * Y位置座標
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public get positionY() : number {
        return this.positionY_;
    }
    /**
     * Z位置座標
     * @private
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    private positionZ_ : number;
    /**
     * Z位置座標
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public get positionZ() : number {
        return this.positionZ_;
    }
    /**
     * 出現エリア半径
     * @private
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    private popAreaRadius_ : number;
    /**
     * 出現エリア半径
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public get popAreaRadius() : number {
        return this.popAreaRadius_;
    }
    /**
     * エリア半径
     * @private
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    private areaRadius_ : number;
    /**
     * エリア半径
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public get areaRadius() : number {
        return this.areaRadius_;
    }
    /**
     * 敵ポップ最大数
     * @private
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    private maxPopEnemyCount_ : number;
    /**
     * 敵ポップ最大数
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public get maxPopEnemyCount() : number {
        return this.maxPopEnemyCount_;
    }
    /**
     * ポップする敵1の種族ID
     * @private
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    private popEnemy1Id_ : number;
    /**
     * ポップする敵1の種族ID
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public get popEnemy1Id() : number {
        return this.popEnemy1Id_;
    }
    /**
     * ポップする敵1の最大数
     * @private
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    private popEnemy1MaxCount_ : number;
    /**
     * ポップする敵1の最大数
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public get popEnemy1MaxCount() : number {
        return this.popEnemy1MaxCount_;
    }
    /**
     * ポップする敵2の種族ID
     * @private
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    private popEnemy2Id_ : number;
    /**
     * ポップする敵2の種族ID
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public get popEnemy2Id() : number {
        return this.popEnemy2Id_;
    }
    /**
     * ポップする敵2の最大数
     * @private
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    private popEnemy2MaxCount_ : number;
    /**
     * ポップする敵2の最大数
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public get popEnemy2MaxCount() : number {
        return this.popEnemy2MaxCount_;
    }
    /**
     * ポップする敵3の種族ID
     * @private
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    private popEnemy3Id_ : number;
    /**
     * ポップする敵3の種族ID
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public get popEnemy3Id() : number {
        return this.popEnemy3Id_;
    }
    /**
     * ポップする敵3の最大数
     * @private
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    private popEnemy3MaxCount_ : number;
    /**
     * ポップする敵3の最大数
     * @public
     * @readonly
     * @type {number}
     * @memberof EnemyPopAreaData
     */
    public get popEnemy3MaxCount() : number {
        return this.popEnemy3MaxCount_;
    }


    /**
     * フルコンストラクタ
     * @public
     * @constructor
     * @param {number} _mapId マップID
     * @param {number} _positionX X位置座標
     * @param {number} _positionY Y位置座標
     * @param {number} _positionZ Z位置座標
     * @param {number} _popAreaRadius 出現エリア半径
     * @param {number} _areaRadius エリア半径
     * @param {number} _maxPopEnemyCount 敵ポップ最大数
     * @param {number} _popEnemy1Id ポップする敵1の種族ID
     * @param {number} _popEnemy1MaxCount ポップする敵1の最大数
     * @param {number} _popEnemy2Id ポップする敵2の種族ID
     * @param {number} _popEnemy2MaxCount ポップする敵2の最大数
     * @param {number} _popEnemy3Id ポップする敵3の種族ID
     * @param {number} _popEnemy3MaxCount ポップする敵3の最大数
     * @memberof EnemyPopAreaData
     */
    public constructor(
        _mapId : number,
        _positionX : number,
        _positionY : number,
        _positionZ : number,
        _popAreaRadius : number,
        _areaRadius : number,
        _maxPopEnemyCount : number,
        _popEnemy1Id : number,
        _popEnemy1MaxCount : number,
        _popEnemy2Id : number,
        _popEnemy2MaxCount : number,
        _popEnemy3Id : number,
        _popEnemy3MaxCount : number,
    ){
        this.mapId_ = _mapId;
        this.positionX_ = _positionX;
        this.positionY_ = _positionY;
        this.positionZ_ = _positionZ;
        this.popAreaRadius_ = _popAreaRadius;
        this.areaRadius_ = _areaRadius;
        this.maxPopEnemyCount_ = _maxPopEnemyCount;
        this.popEnemy1Id_ = _popEnemy1Id;
        this.popEnemy1MaxCount_ = _popEnemy1MaxCount;
        this.popEnemy2Id_ = _popEnemy2Id;
        this.popEnemy2MaxCount_ = _popEnemy2MaxCount;
        this.popEnemy3Id_ = _popEnemy3Id;
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
    private dataArray_ : Array<EnemyPopAreaData>;
    /**
     * 敵種族情報配列
     * @public
     * @readonly
     * @type {Array<EnemyPopAreaData>}
     * @memberof EnemyPopAreaDataAccessor
     */
    public get dataArray() :  Array<EnemyPopAreaData> {
        return this.dataArray_;
    }


    /**
     * デフォルトコンストラクタ
     * @private
     * @constructor
     * @memberof EnemyPopAreaDataAccessor
     */
    private constructor(){
        this.dataArray_ = new Array<EnemyPopAreaData>();
    }

    /**
     * IDで検索
     * @public
     * @param {number} _id ID
     * @returns {(EnemyPopAreaData|undefined)} 対応するデータ 無ければundefined
     * @memberof EnemyPopAreaDataAccessor
     */
    public Find(_id:number) : EnemyPopAreaData|undefined {
        return this.dataArray_[_id];
    }

    /**
     * データを読み込む [非同期]
     * @public
     * @returns {Promise<boolean>} true:成功 false:失敗
     * @memberof EnemyPopAreaDataAccessor
     */
    public async Load() : Promise<boolean> {
        // テスト用データ
        const testArea:EnemyPopAreaData = new EnemyPopAreaData(
            0,
            0.0, 0.4, 9.0,
            0.7,
            1.0,
            3,
            0, 3,
            -1, 0,
            -1, 0
        );

        this.dataArray_[0] = testArea;

        // TODO:データベースから情報を読み取る
        console.log('Loaded the enemy pop area data.');
        return true;
    }
}
