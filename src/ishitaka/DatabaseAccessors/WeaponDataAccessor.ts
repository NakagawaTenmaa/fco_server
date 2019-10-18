/**
 * @fileoverview 武器情報アクセサーの実装ファイル
 * @file WeaponDataAccessor.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {DatabaseAccessor} from './DatabaseAccessor'

/**
 * 武器情報
 * @export
 * @class WeaponData
 */
export class WeaponData{
    /**
     * 名前
     * @public
     * @type {string}
     * @memberof WeaponData
     */
    public name_ : string;
    /**
     * 種別
     * @public
     * @type {string}
     * @memberof WeaponData
     */
    public type_ : string;
    /**
     * 説明文
     * @public
     * @type {string}
     * @memberof WeaponData
     */
    public explanation_ : string;
    /**
     * 定価
     * @public
     * @type {number}
     * @memberof WeaponData
     */
    public price_ : number;
    /**
     * 物理攻撃補整
     * @public
     * @type {number}
     * @memberof WeaponData
     */
    public strengthCorrection_ : number;
    /**
     * 物理防御補整
     * @public
     * @type {number}
     * @memberof WeaponData
     */
    public vitalityCorrection_ : number;
    /**
     * 魔法攻撃補整
     * @public
     * @type {number}
     * @memberof WeaponData
     */
    public intelligenceCorrection_ : number;
    /**
     * 魔法防御補整
     * @public
     * @type {number}
     * @memberof WeaponData
     */
    public mindCorrection_ : number;
    /**
     * 器用さ補整
     * @public
     * @type {number}
     * @memberof WeaponData
     */
    public dexterityCorrection_ : number;
    /**
     * 敏捷性補整
     * @public
     * @type {number}
     * @memberof WeaponData
     */
    public agilityCorrection_ : number;
    /**
     * 効果フラグ [バフ、デバフ等]
     * @public
     * @type {number}
     * @memberof WeaponData
     */
    public effectFlag_ : number;


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
     * @memberof WeaponData
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
 * 武器情報アクセサー
 * @export
 * @class WeaponDataAccessor
 * @implements {DatabaseAccessor}
 */
export class WeaponDataAccessor implements DatabaseAccessor{
    /**
     * シングルトンインスタンス
     * @private
     * @static
     * @type {WeaponDataAccessor}
     * @memberof WeaponDataAccessor
     */
    private static instance_ ?: WeaponDataAccessor = undefined;
    /**
     * シングルトンインスタンス
     * @public
     * @static
     * @readonly
     * @type {WeaponDataAccessor}
     * @memberof WeaponDataAccessor
     */
    public static get instance() : WeaponDataAccessor {
        if(WeaponDataAccessor.instance_ === undefined){
            WeaponDataAccessor.instance_ = new WeaponDataAccessor();
        }
        return WeaponDataAccessor.instance_;
    }


    /**
     * スキル情報配列
     * @private
     * @type {Array<WeaponData>}
     * @memberof WeaponDataAccessor
     */
    private dataArray_ : Array<WeaponData>;


    /**
     * デフォルトコンストラクタ
     * @private
     * @constructor
     * @memberof WeaponDataAccessor
     */
    private constructor(){
        this.dataArray_ = new Array<WeaponData>();
    }

    /**
     * IDで検索
     * @public
     * @param {number} _id ID
     * @returns {(WeaponData|undefined)} 対応するデータ 無ければundefined
     * @memberof WeaponDataAccessor
     */
    public Find(_id:number) : WeaponData|undefined
    /**
     * 名前で検索
     * @public
     * @param {string} _name 名前
     * @returns {(WeaponData|undefined)} 対応するデータ 無ければundefined
     * @memberof WeaponDataAccessor
     */
    public Find(_name:string) : WeaponData|undefined
    /**
     * キーで検索
     * @param {(number|string)} _key 検索するキー
     * @returns {(WeaponData|undefined)} 対応するデータ 無ければundefined
     * @memberof WeaponDataAccessor
     */
    public Find(_key:number|string) : WeaponData|undefined
    /**
     * 検索の実装
     * @param {(number|string)} _key 検索するキー
     * @returns {(WeaponData|undefined)} 対応するデータ 無ければundefined
     * @memberof WeaponDataAccessor
     */
    public Find(_key:number|string) : WeaponData|undefined {
        if(typeof(_key) === 'number'){
            return this.dataArray_[_key];
        }
        
        return this.dataArray_.filter(
            function(
                _data : WeaponData,
                _id : number,
                _array : WeaponData[]
            ) : boolean {
                return (_key === _data.name_);
            }
        ).shift();
    }

    /**
     * データを読み込む [非同期]
     * @public
     * @returns {Promise<boolean>} true:成功 false:失敗
     * @memberof WeaponDataAccessor
     */
    public async Load() : Promise<boolean> {
        // テスト用データ
        this.dataArray_[0] = new WeaponData(
            'test',
            '片手剣',
            'テスト用武器',
            8000,
            100.0, 20.0,
            0.0, 0.0,
            0.0,
            0.0,
            0x0000
        );

        // TODO:データベースから情報を読み取る
        
        console.log('Loaded the weapon data.');
        return true;
    }
}
