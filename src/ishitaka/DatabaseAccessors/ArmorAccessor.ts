/**
 * @fileoverview 防具情報アクセサーの実装ファイル
 * @file ArmorDataAccessor.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {DatabaseAccessor} from './DatabaseAccessor'

/**
 * 防具情報
 * @export
 * @class ArmorData
 */
export class ArmorData{
    /**
     * 名前
     * @public
     * @type {string}
     * @memberof ArmorData
     */
    public name_ : string;
    /**
     * 種別
     * @public
     * @type {string}
     * @memberof ArmorData
     */
    public type_ : string;
    /**
     * 装備箇所
     * @public
     * @type {number}
     * @memberof ArmorData
     */
    public equipmentLocation_ : number;
    /**
     * 説明文
     * @public
     * @type {string}
     * @memberof ArmorData
     */
    public explanation_ : string;
    /**
     * 定価
     * @public
     * @type {number}
     * @memberof ArmorData
     */
    public price_ : number;
    /**
     * 物理攻撃補整
     * @public
     * @type {number}
     * @memberof ArmorData
     */
    public strengthCorrection_ : number;
    /**
     * 物理防御補整
     * @public
     * @type {number}
     * @memberof ArmorData
     */
    public vitalityCorrection_ : number;
    /**
     * 魔法攻撃補整
     * @public
     * @type {number}
     * @memberof ArmorData
     */
    public intelligenceCorrection_ : number;
    /**
     * 魔法防御補整
     * @public
     * @type {number}
     * @memberof ArmorData
     */
    public mindCorrection_ : number;
    /**
     * 器用さ補整
     * @public
     * @type {number}
     * @memberof ArmorData
     */
    public dexterityCorrection_ : number;
    /**
     * 敏捷性補整
     * @public
     * @type {number}
     * @memberof ArmorData
     */
    public agilityCorrection_ : number;
    /**
     * 効果フラグ [バフ、デバフ等]
     * @public
     * @type {number}
     * @memberof ArmorData
     */
    public effectFlag_ : number;


    /**
     * フルコンストラクタ
     * @public
     * @constructor
     * @param {string} _name 名前
     * @param {string} _type 種別
     * @param {number} _equipmentLocation 装備箇所
     * @param {string} _explanation 説明文
     * @param {number} _price 定価
     * @param {number} _strengthCorrection 物理攻撃補整
     * @param {number} _vitalityCorrection 物理防御補整
     * @param {number} _intelligenceCorrection 魔法攻撃補整
     * @param {number} _mindCorrection 魔法防御補整
     * @param {number} _dexterityCorrection 器用さ補整
     * @param {number} _agilityCorrection 敏捷性補整
     * @param {number} _effectFlag 効果フラグ [バフ、デバフ等]
     * @memberof ArmorData
     */
    public constructor(
        _name : string,
        _type : string,
        _equipmentLocation : number,
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
        this.equipmentLocation_ = _equipmentLocation;
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
 * 防具情報アクセサー
 * @export
 * @class ArmorDataAccessor
 * @implements {DatabaseAccessor}
 */
export class ArmorDataAccessor implements DatabaseAccessor{
    /**
     * シングルトンインスタンス
     * @private
     * @static
     * @type {ArmorDataAccessor}
     * @memberof ArmorDataAccessor
     */
    private static instance_ ?: ArmorDataAccessor = undefined;
    /**
     * シングルトンインスタンス
     * @public
     * @static
     * @readonly
     * @type {ArmorDataAccessor}
     * @memberof ArmorDataAccessor
     */
    public static get instance() : ArmorDataAccessor {
        if(ArmorDataAccessor.instance_ === undefined){
            ArmorDataAccessor.instance_ = new ArmorDataAccessor();
        }
        return ArmorDataAccessor.instance_;
    }


    /**
     * スキル情報配列
     * @private
     * @type {Array<ArmorData>}
     * @memberof ArmorDataAccessor
     */
    private dataArray_ : Array<ArmorData>;


    /**
     * デフォルトコンストラクタ
     * @private
     * @constructor
     * @memberof ArmorDataAccessor
     */
    private constructor(){
        this.dataArray_ = new Array<ArmorData>();
    }

    /**
     * IDで検索
     * @public
     * @param {number} _id ID
     * @returns {(ArmorData|undefined)} 対応するデータ 無ければundefined
     * @memberof ArmorDataAccessor
     */
    public Find(_id:number) : ArmorData|undefined
    /**
     * 名前で検索
     * @public
     * @param {string} _name 名前
     * @returns {(ArmorData|undefined)} 対応するデータ 無ければundefined
     * @memberof ArmorDataAccessor
     */
    public Find(_name:string) : ArmorData|undefined
    /**
     * キーで検索
     * @param {(number|string)} _key 検索するキー
     * @returns {(ArmorData|undefined)} 対応するデータ 無ければundefined
     * @memberof ArmorDataAccessor
     */
    public Find(_key:number|string) : ArmorData|undefined
    /**
     * 検索の実装
     * @param {(number|string)} _key 検索するキー
     * @returns {(ArmorData|undefined)} 対応するデータ 無ければundefined
     * @memberof ArmorDataAccessor
     */
    public Find(_key:number|string) : ArmorData|undefined {
        if(typeof(_key) === 'number'){
            return this.dataArray_[_key];
        }
        
        return this.dataArray_.filter(
            function(
                _data : ArmorData,
                _id : number,
                _array : ArmorData[]
            ) : boolean {
                return (_key === _data.name_);
            }
        ).shift();
    }

    /**
     * データを読み込む [非同期]
     * @public
     * @returns {Promise<boolean>} true:成功 false:失敗
     * @memberof ArmorDataAccessor
     */
    public async Load() : Promise<boolean> {
        // テスト用データ
        this.dataArray_[0] = new ArmorData(
            'test',
            '鎧',
            0x0001,
            'テスト用防具',
            12000,
            0.0, 80.0,
            0.0, 20.0,
            -5.0,
            -10.0,
            0x0000
        );

        // TODO:データベースから情報を読み取る
        
        console.log('Loaded the weapon data.');
        return true;
    }
}
