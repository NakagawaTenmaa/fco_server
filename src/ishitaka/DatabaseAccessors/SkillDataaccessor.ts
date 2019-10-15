/**
 * @fileoverview スキル情報アクセサーの実装ファイル
 * @file SkillDataAccessor.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {DatabaseAccessor} from './DatabaseAccessor'

/**
 * スキル情報
 * @export
 * @class SkillData
 */
export class SkillData{
    /**
     * 名前
     * @public
     * @type {string}
     * @memberof SkillData
     */
    public name_ : string;
    /**
     * キャストタイム
     * @public
     * @type {number}
     * @memberof SkillData
     */
    public castTime_ : number;
    /**
     * リキャストタイム
     * @public
     * @type {number}
     * @memberof SkillData
     */
    public recastTime_ : number;


    /**
     * フルコンストラクタ
     * @public
     * @constructor
     * @param {string} _name 名前
     * @param {number} _castTime キャストタイム
     * @param {number} _recastTime リキャストタイム
     * @memberof SkillData
     */
    public constructor(
        _name : string,
        _castTime : number,
        _recastTime : number
    ){
        this.name_ = _name;
        this.castTime_ = _castTime;
        this.recastTime_ = _recastTime;
    }
}


/**
 * スキル情報アクセサー
 * @export
 * @class SkillDataAccessor
 * @implements {DatabaseAccessor}
 */
export class SkillDataAccessor implements DatabaseAccessor{
    /**
     * シングルトンインスタンス
     * @private
     * @static
     * @type {SkillDataAccessor}
     * @memberof SkillDataAccessor
     */
    private static instance_ ?: SkillDataAccessor = undefined;
    /**
     * シングルトンインスタンス
     * @public
     * @static
     * @readonly
     * @type {SkillDataAccessor}
     * @memberof SkillDataAccessor
     */
    public static get instance() : SkillDataAccessor {
        if(SkillDataAccessor.instance_ === undefined){
            SkillDataAccessor.instance_ = new SkillDataAccessor();
        }
        return SkillDataAccessor.instance_;
    }


    /**
     * スキル情報配列
     * @private
     * @type {Array<SkillData>}
     * @memberof SkillDataAccessor
     */
    private dataArray_ : Array<SkillData>;


    /**
     * デフォルトコンストラクタ
     * @private
     * @constructor
     * @memberof SkillDataAccessor
     */
    private constructor(){
        this.dataArray_ = new Array<SkillData>();
    }

    /**
     * IDで検索
     * @public
     * @param {number} _id ID
     * @returns {(SkillData|undefined)} 対応するデータ 無ければundefined
     * @memberof SkillDataAccessor
     */
    public Find(_id:number) : SkillData|undefined
    /**
     * 名前で検索
     * @public
     * @param {string} _name 名前
     * @returns {(SkillData|undefined)} 対応するデータ 無ければundefined
     * @memberof SkillDataAccessor
     */
    public Find(_name:string) : SkillData|undefined
    /**
     * キーで検索
     * @param {(number|string)} _key 検索するキー
     * @returns {(SkillData|undefined)} 対応するデータ 無ければundefined
     * @memberof SkillDataAccessor
     */
    public Find(_key:number|string) : SkillData|undefined
    /**
     * 検索の実装
     * @param {(number|string)} _key 検索するキー
     * @returns {(SkillData|undefined)} 対応するデータ 無ければundefined
     * @memberof SkillDataAccessor
     */
    public Find(_key:number|string) : SkillData|undefined {
        if(typeof(_key) === 'number'){
            return this.dataArray_[_key];
        }

        return this.dataArray_.filter(
            function(
                _data : SkillData,
                _id : number,
                _array : SkillData[]
            ) : boolean {
                return (_key === _data.name_);
            }
        ).shift();
    }

    /**
     * データを読み込む [非同期]
     * @public
     * @returns {Promise<boolean>} true:成功 false:失敗
     * @memberof SkillDataAccessor
     */
    public async Load() : Promise<boolean> {
        // テスト用データ
        this.dataArray_[0] = new SkillData(
            'test',
            0.5,
            1.0,
        );

        // TODO:データベースから情報を読み取る
        
        console.log('Loaded the skill data.');
        return true;
    }
}
