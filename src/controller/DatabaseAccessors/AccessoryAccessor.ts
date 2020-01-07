import {DatabaseAccessor} from './DatabaseAccessor'
import { AccessoryModel } from '../../model/accessoryModel';

export class AccessoryData{
    public id : number;	
	public category : number;
	public name : string;
	public level : number;
	public comment : string;


    public hp  : number;
    public mp  : number;
	public str : number;
    public vit : number;
    public int : number;
	public mmd : number;
	public dex : number;
	public agi : number;

    public image : string;
    constructor(
		_id : number, 
		_category : number, 
		_name : string,
		_level : number,
        _comment : string,
        _hp  : number,
        _mp  : number,
		_str : number,
        _vit : number,
        _int : number,
		_mmd : number,
		_dex : number,
		_agi : number,
		_image : string
		){
			this.id = _id;
			this.category = _category;
			this.name = _name;
			this.level = _level;
            this.comment = _comment;
            this.hp = _hp;
            this.mp = _mp;
			this.str = _str;
            this.vit = _vit;
            this.int = _int;
			this.mmd = _mmd;
			this.dex = _dex;
			this.agi = _agi;
			this.image = _image;
	}
}


export class AccessoryDataAccessor implements DatabaseAccessor{
    /**
     * シングルトンインスタンス
     * @private
     * @static
     * @type {ArmorDataAccessor}
     * @memberof ArmorDataAccessor
     */
    private static instance_ ?: AccessoryDataAccessor = undefined;
    /**
     * シングルトンインスタンス
     * @public
     * @static
     * @readonly
     * @type {ArmorDataAccessor}
     * @memberof ArmorDataAccessor
     */
    public static get instance() : AccessoryDataAccessor {
        if(AccessoryDataAccessor.instance_ === undefined){
            AccessoryDataAccessor.instance_ = new AccessoryDataAccessor();
        }
        return AccessoryDataAccessor.instance_;
    }


    /**
     * スキル情報配列
     * @private
     * @type {Array<ArmorData>}
     * @memberof ArmorDataAccessor
     */
    private dataArray_ : Array<AccessoryData>;


    /**
     * デフォルトコンストラクタ
     * @private
     * @constructor
     * @memberof ArmorDataAccessor
     */
    private constructor(){
        this.dataArray_ = new Array<AccessoryData>();
    }

    /**
     * IDで検索
     * @public
     * @param {number} _id ID
     * @returns {(ArmorData|undefined)} 対応するデータ 無ければundefined
     * @memberof ArmorDataAccessor
     */
    public Find(_id:number) : AccessoryData|undefined
    /**
     * 名前で検索
     * @public
     * @param {string} _name 名前
     * @returns {(ArmorData|undefined)} 対応するデータ 無ければundefined
     * @memberof ArmorDataAccessor
     */
    public Find(_name:string) : AccessoryData|undefined
    /**
     * キーで検索
     * @param {(number|string)} _key 検索するキー
     * @returns {(ArmorData|undefined)} 対応するデータ 無ければundefined
     * @memberof ArmorDataAccessor
     */
    public Find(_key:number|string) : AccessoryData|undefined
    /**
     * 検索の実装
     * @param {(number|string)} _key 検索するキー
     * @returns {(ArmorData|undefined)} 対応するデータ 無ければundefined
     * @memberof ArmorDataAccessor
     */
    public Find(_key:number|string) : AccessoryData|undefined {
        if(typeof(_key) === 'number'){
            return this.dataArray_[_key];
        }
        
        return this.dataArray_.filter(
            function(
                _data : AccessoryData,
                _id : number,
                _array : AccessoryData[]
            ) : boolean {
                return (_key === _data.name);
            }
        ).shift();
    }

    public getAll() : AccessoryData[]{
        return this.dataArray_;
    }

    /**
     * データを読み込む [非同期]
     * @public
     * @returns {Promise<boolean>} true:成功 false:失敗
     * @memberof ArmorDataAccessor
     */
    public async Load() : Promise<boolean> {
        /*
        // テスト用データ
        this.dataArray_[0] = new AccessoryData(
            0,
            0,
            'test',
            1,
            '',
            0,0,0,0,0,0,
            'image'
        );*/

        // TODO:データベースから情報を読み取る
        this.dataArray_ = await AccessoryModel.getAccessoryList();

        console.log('Loaded the accessory data.');
        return true;
    }
}
