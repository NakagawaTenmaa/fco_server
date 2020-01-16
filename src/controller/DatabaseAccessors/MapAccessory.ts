import {DatabaseAccessor} from './DatabaseAccessor'
import { MapMasterModel } from '../../model/mapMasterModel';

/**
 * アイテム情報
 * @export
 * @class ItemData
 */
export class MapData{
    public id: number;
    public x : number;
    public y : number;
    public z : number;
    public dir: number;

    public constructor(
        _id: number,
        _x : number,
        _y : number,
        _z : number,
        _dir : number
    ){
        this.id = _id;
        this.x = _x;
        this.y = _y;
        this.z = _z;
        this.dir = _dir;
    }
}


/**
 * アイテム情報アクセサー
 * @export
 * @class ItemDataAccessor
 * @implements {DatabaseAccessor}
 */
export class MapDataAccessor implements DatabaseAccessor{
    private static instance_ ?: MapDataAccessor = undefined;

    public static get instance() : MapDataAccessor {
        if(MapDataAccessor.instance_ === undefined){
            MapDataAccessor.instance_ = new MapDataAccessor();
        }
        return MapDataAccessor.instance_;
    }

    private dataArray_ : Array<MapData>;

    private constructor(){
        this.dataArray_ = new Array<MapData>();
    }


    public getAll() : MapData[]{
        return this.dataArray_;
    }

    public FindById(_id: number) : MapData | undefined {
        return this.dataArray_.find((_data: MapData) => { return _data.id === _id; })
    }

    public Find(_id:number) : MapData|undefined
    public Find(_name:string) : MapData|undefined
    public Find(_key:number|string) : MapData|undefined
    public Find(_key:number|string) : MapData|undefined {
        return undefined;
    }

    public async Load() : Promise<boolean> {
        this.dataArray_ = await MapMasterModel.getList();        
        console.log('Loaded the map data.');
        return true;
    }
}
