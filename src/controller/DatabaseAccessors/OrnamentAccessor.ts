/**
 * @fileoverview 装飾品情報アクセサーの実装ファイル
 * @file OrnamentDataAccessor.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {DatabaseAccessor} from './DatabaseAccessor'

/**
 * 装飾品情報
 * @export
 * @class OrnamentData
 */
export class OrnamentData{
    /**
     * 名前
     * @private
     * @type {string}
     * @memberof OrnamentData
     */
    private name_ : string;
    /**
     * 名前
     * @public
     * @readonly
     * @type {string}
     * @memberof OrnamentData
     */
    public get name() : string {
        return this.name_;
    }
    /**
     * 種別
     * @private
     * @type {string}
     * @memberof OrnamentData
     */
    private type_ : string;
    /**
     * 種別
     * @public
     * @readonly
     * @type {string}
     * @memberof OrnamentData
     */
    public get type() : string {
        return this.type_;
    }
    /**
     * 説明文
     * @private
     * @type {string}
     * @memberof OrnamentData
     */
    private explanation_ : string;
    /**
     * 説明文
     * @public
     * @readonly
     * @type {string}
     * @memberof OrnamentData
     */
    public get explanation() : string {
        return this.explanation_;
    }
    /**
     * 定価
     * @private
     * @type {number}
     * @memberof OrnamentData
     */
    private price_ : number;
    /**
     * 定価
     * @public
     * @readonly
     * @type {number}
     * @memberof OrnamentData
     */
    public get price() : number {
        return this.price_;
    }
    /**
     * 物理攻撃補整
     * @private
     * @type {number}
     * @memberof OrnamentData
     */
    private strengthCorrection_ : number;
    /**
     * 物理攻撃補整
     * @public
     * @readonly
     * @type {number}
     * @memberof OrnamentData
     */
    public get strengthCorrection() : number {
        return this.strengthCorrection_;
    }
    /**
     * 物理防御補整
     * @private
     * @type {number}
     * @memberof OrnamentData
     */
    private vitalityCorrection_ : number;
    /**
     * 物理防御補整
     * @public
     * @readonly
     * @type {number}
     * @memberof OrnamentData
     */
    public get vitalityCorrection() : number {
        return this.vitalityCorrection_;
    }
    /**
     * 魔法攻撃補整
     * @private
     * @type {number}
     * @memberof OrnamentData
     */
    private intelligenceCorrection_ : number;
    /**
     * 魔法攻撃補整
     * @public
     * @readonly
     * @type {number}
     * @memberof OrnamentData
     */
    public get intelligenceCorrection() : number {
        return this.intelligenceCorrection_;
    }
    /**
     * 魔法防御補整
     * @private
     * @type {number}
     * @memberof OrnamentData
     */
    private mindCorrection_ : number;
    /**
     * 魔法防御補整
     * @public
     * @readonly
     * @type {number}
     * @memberof OrnamentData
     */
    public get mindCorrection() : number {
        return this.mindCorrection_;
    }
    /**
     * 器用さ補整
     * @private
     * @type {number}
     * @memberof OrnamentData
     */
    private dexterityCorrection_ : number;
    /**
     * 器用さ補整
     * @public
     * @readonly
     * @type {number}
     * @memberof OrnamentData
     */
    public get dexterityCorrection() : number {
        return this.dexterityCorrection_;
    }
    /**
     * 敏捷性補整
     * @private
     * @type {number}
     * @memberof OrnamentData
     */
    private agilityCorrection_ : number;
    /**
     * 敏捷性補整
     * @public
     * @readonly
     * @type {number}
     * @memberof OrnamentData
     */
    public get agilityCorrection() : number {
        return this.agilityCorrection_;
    }
    /**
     * 効果フラグ [バフ、デバフ等]
     * @private
     * @type {number}
     * @memberof OrnamentData
     */
    private effectFlag_ : number;
    /**
     * 効果フラグ [バフ、デバフ等]
     * @public
     * @readonly
     * @type {number}
     * @memberof OrnamentData
     */
    public get effectFlag() : number {
        return this.effectFlag_;
    }


    /**
     * フルコンストラクタ
     * @public
     * @constructor
     * @param {string} _name 名前
     * @param {string} _type 種別
     * @param {string} _explanation 説明文
     * @param {number} _price 定価
     * @param {number} _strengthCorrection 物理攻撃補整
     * @param {number} _vitalityCorrection 物理防御補整
     * @param {number} _intelligenceCorrection 魔法攻撃補整
     * @param {number} _mindCorrection 魔法防御補整
     * @param {number} _dexterityCorrection 器用さ補整
     * @param {number} _agilityCorrection 敏捷性補整
     * @param {number} _effectFlag 効果フラグ [バフ、デバフ等]
     * @memberof OrnamentData
     */
    public constructor(
        _name : string,
        _type : string,
        _explanation : string,
        _price : number,
        _strengthCorrection : number,
        _vitalityCorrection : number,
        _intelligenceCorrection : number,
        _mindCorrection : number,
        _dexterityCorrection : number,
        _agilityCorrection : number,
        _effectFlag : number
    ){
        this.name_ = _name;
        this.type_ = _type;
        this.explanation_ = _explanation;
        this.price_ = _price;
        this.strengthCorrection_ = _strengthCorrection;
        this.vitalityCorrection_ = _vitalityCorrection;
        this.intelligenceCorrection_ = _intelligenceCorrection;
        this.mindCorrection_ = _mindCorrection;
        this.dexterityCorrection_ = _dexterityCorrection;
        this.agilityCorrection_ = _agilityCorrection;
        this.effectFlag_ = _effectFlag;
    }
}


/**
 * 装飾品情報アクセサー
 * @export
 * @class OrnamentDataAccessor
 * @implements {DatabaseAccessor}
 */
export class OrnamentDataAccessor implements DatabaseAccessor{
    /**
     * シングルトンインスタンス
     * @private
     * @static
     * @type {OrnamentDataAccessor}
     * @memberof OrnamentDataAccessor
     */
    private static instance_ ?: OrnamentDataAccessor = undefined;
    /**
     * シングルトンインスタンス
     * @public
     * @static
     * @readonly
     * @type {OrnamentDataAccessor}
     * @memberof OrnamentDataAccessor
     */
    public static get instance() : OrnamentDataAccessor {
        if(OrnamentDataAccessor.instance_ === undefined){
            OrnamentDataAccessor.instance_ = new OrnamentDataAccessor();
        }
        return OrnamentDataAccessor.instance_;
    }


    /**
     * スキル情報配列
     * @private
     * @type {Array<OrnamentData>}
     * @memberof OrnamentDataAccessor
     */
    private dataArray_ : Array<OrnamentData>;


    /**
     * デフォルトコンストラクタ
     * @private
     * @constructor
     * @memberof OrnamentDataAccessor
     */
    private constructor(){
        this.dataArray_ = new Array<OrnamentData>();
    }

    /**
     * IDで検索
     * @public
     * @param {number} _id ID
     * @returns {(OrnamentData|undefined)} 対応するデータ 無ければundefined
     * @memberof OrnamentDataAccessor
     */
    public Find(_id:number) : OrnamentData|undefined
    /**
     * 名前で検索
     * @public
     * @param {string} _name 名前
     * @returns {(OrnamentData|undefined)} 対応するデータ 無ければundefined
     * @memberof OrnamentDataAccessor
     */
    public Find(_name:string) : OrnamentData|undefined
    /**
     * キーで検索
     * @param {(number|string)} _key 検索するキー
     * @returns {(OrnamentData|undefined)} 対応するデータ 無ければundefined
     * @memberof OrnamentDataAccessor
     */
    public Find(_key:number|string) : OrnamentData|undefined
    /**
     * 検索の実装
     * @param {(number|string)} _key 検索するキー
     * @returns {(OrnamentData|undefined)} 対応するデータ 無ければundefined
     * @memberof OrnamentDataAccessor
     */
    public Find(_key:number|string) : OrnamentData|undefined {
        if(typeof(_key) === 'number'){
            return this.dataArray_[_key];
        }
        
        return this.dataArray_.filter(
            function(
                _data : OrnamentData,
                _id : number,
                _array : OrnamentData[]
            ) : boolean {
                return (_key === _data.name);
            }
        ).shift();
    }

    /**
     * データを読み込む [非同期]
     * @public
     * @returns {Promise<boolean>} true:成功 false:失敗
     * @memberof OrnamentDataAccessor
     */
    public async Load() : Promise<boolean> {
        // テスト用データ
        this.dataArray_[0] = new OrnamentData(
            'test',
            '腕輪',
            'テスト用装飾品',
            2500,
            0.0, 15.0,
            0.0, 15.0,
            0.0,
            0.0,
            0x0000
        );

        // TODO:データベースから情報を読み取る
        
        console.log('Loaded the ornament data.');
        return true;
    }
}
