/**
 * @fileoverview アイテム情報アクセサーの実装ファイル
 * @file ItemDataAccessor.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {DatabaseAccessor} from './DatabaseAccessor'

/**
 * アイテム情報
 * @export
 * @class ItemData
 */
export class ItemData{
    /**
     * 名前
     * @private
     * @type {string}
     * @memberof ItemData
     */
    private name_ : string;
    /**
     * 名前
     * @public
     * @readonly
     * @type {string}
     * @memberof ItemData
     */
    public get name() : string {
        return this.name_;
    }
    /**
     * 種別
     * @private
     * @type {string}
     * @memberof ItemData
     */
    private type_ : string;
    /**
     * 種別
     * @public
     * @readonly
     * @type {string}
     * @memberof ItemData
     */
    public get type() : string {
        return this.type_;
    }
    /**
     * 説明文
     * @private
     * @type {string}
     * @memberof ItemData
     */
    private explanation_ : string;
    /**
     * 説明文
     * @public
     * @readonly
     * @type {string}
     * @memberof ItemData
     */
    public get explanation() : string {
        return this.explanation_;
    }
    /**
     * 定価
     * @private
     * @type {number}
     * @memberof ItemData
     */
    private price_ : number;
    /**
     * 定価
     * @public
     * @readonly
     * @type {number}
     * @memberof ItemData
     */
    public get price() : number {
        return this.price_;
    }
    /**
     * 体力回復値
     * @private
     * @type {number}
     * @memberof ItemData
     */
    private hitPointRecovery_ : number;
    /**
     * 体力回復値
     * @public
     * @readonly
     * @type {number}
     * @memberof ItemData
     */
    public get hitPointRecovery() : number {
        return this.hitPointRecovery_;
    }
    /**
     * 魔力回復値
     * @private
     * @type {number}
     * @memberof ItemData
     */
    private magicPointRecovery_ : number;
    /**
     * 魔力回復値
     * @public
     * @readonly
     * @type {number}
     * @memberof ItemData
     */
    public get magicPointRecovery() : number {
        return this.magicPointRecovery_;
    }
    /**
     * 効果フラグ [バフ、デバフ等]
     * @private
     * @type {number}
     * @memberof ItemData
     */
    private effectFlag_ : number;
    /**
     * 効果フラグ [バフ、デバフ等]
     * @public
     * @readonly
     * @type {number}
     * @memberof ItemData
     */
    public get effectFlag() : number {
        return this.effectFlag_;
    }
    /**
     * 効果対象
     * @private
     * @type {number}
     * @memberof ItemData
     */
    private effectTarget_ : number;
    /**
     * 効果対象
     * @public
     * @readonly
     * @type {number}
     * @memberof ItemData
     */
    public get effectTarget() : number {
        return this.effectTarget_;
    }
    /**
     * 効果範囲半径
     * @private
     * @type {number}
     * @memberof ItemData
     */
    private effectRangeRadius_ : number;
    /**
     * 効果範囲半径
     * @public
     * @readonly
     * @type {number}
     * @memberof ItemData
     */
    public get effectRangeRadius() : number {
        return this.effectRangeRadius_;
    }


    /**
     * フルコンストラクタ
     * @public
     * @constructor
     * @param {string} _name 名前
     * @param {string} _type 種別
     * @param {string} _explanation 説明文
     * @param {number} _price 定価
     * @param {number} _hitPointRecovery 体力回復値
     * @param {number} _magicPointRecovery 魔力回復値
     * @param {number} _effectFlag 効果フラグ [バフ、デバフ等]
     * @param {number} _effectTarget 効果対象
     * @param {number} _effectRangeRadius 効果範囲半径
     * @memberof ItemData
     */
    public constructor(
        _name : string,
        _type : string,
        _explanation : string,
        _price : number,
        _hitPointRecovery : number,
        _magicPointRecovery : number,
        _effectFlag : number,
        _effectTarget : number,
        _effectRangeRadius : number
    ){
        this.name_ = _name;
        this.type_ = _type;
        this.explanation_ = _explanation;
        this.price_ = _price;
        this.hitPointRecovery_ = _hitPointRecovery;
        this.magicPointRecovery_ = _magicPointRecovery;
        this.effectFlag_ = _effectFlag;
        this.effectTarget_ = _effectTarget;
        this.effectRangeRadius_ = _effectRangeRadius;
    }
}


/**
 * アイテム情報アクセサー
 * @export
 * @class ItemDataAccessor
 * @implements {DatabaseAccessor}
 */
export class ItemDataAccessor implements DatabaseAccessor{
    /**
     * シングルトンインスタンス
     * @private
     * @static
     * @type {ItemDataAccessor}
     * @memberof ItemDataAccessor
     */
    private static instance_ ?: ItemDataAccessor = undefined;
    /**
     * シングルトンインスタンス
     * @public
     * @static
     * @readonly
     * @type {ItemDataAccessor}
     * @memberof ItemDataAccessor
     */
    public static get instance() : ItemDataAccessor {
        if(ItemDataAccessor.instance_ === undefined){
            ItemDataAccessor.instance_ = new ItemDataAccessor();
        }
        return ItemDataAccessor.instance_;
    }


    /**
     * スキル情報配列
     * @private
     * @type {Array<ItemData>}
     * @memberof ItemDataAccessor
     */
    private dataArray_ : Array<ItemData>;


    /**
     * デフォルトコンストラクタ
     * @private
     * @constructor
     * @memberof ItemDataAccessor
     */
    private constructor(){
        this.dataArray_ = new Array<ItemData>();
    }

    /**
     * IDで検索
     * @public
     * @param {number} _id ID
     * @returns {(ItemData|undefined)} 対応するデータ 無ければundefined
     * @memberof ItemDataAccessor
     */
    public Find(_id:number) : ItemData|undefined
    /**
     * 名前で検索
     * @public
     * @param {string} _name 名前
     * @returns {(ItemData|undefined)} 対応するデータ 無ければundefined
     * @memberof ItemDataAccessor
     */
    public Find(_name:string) : ItemData|undefined
    /**
     * キーで検索
     * @param {(number|string)} _key 検索するキー
     * @returns {(ItemData|undefined)} 対応するデータ 無ければundefined
     * @memberof ItemDataAccessor
     */
    public Find(_key:number|string) : ItemData|undefined
    /**
     * 検索の実装
     * @param {(number|string)} _key 検索するキー
     * @returns {(ItemData|undefined)} 対応するデータ 無ければundefined
     * @memberof ItemDataAccessor
     */
    public Find(_key:number|string) : ItemData|undefined {
        if(typeof(_key) === 'number'){
            return this.dataArray_[_key];
        }
        
        return this.dataArray_.filter(
            function(
                _data : ItemData,
                _id : number,
                _array : ItemData[]
            ) : boolean {
                return (_key === _data.name);
            }
        ).shift();
    }

    /**
     * データを読み込む [非同期]
     * @public
     * @returns {Promise<boolean>} true:成功 false:失敗
     * @memberof ItemDataAccessor
     */
    public async Load() : Promise<boolean> {
        // テスト用データ
        this.dataArray_[0] = new ItemData(
            '癒し草',
            '薬草',
            'わずかに癒しの効果がある薬草',
            100,
            50.0, 0.0,
            0,
            0,
            0.0
        );

        // TODO:データベースから情報を読み取る
        
        console.log('Loaded the weapon data.');
        return true;
    }
}
