import { BaseModel } from './modelBase'
import { MapData } from '../controller/DatabaseAccessors/MapAccessory';

// 敵のモデル
export class MapMasterModel extends BaseModel{
    static TABLE_NAME = 'maps';

    // 敵の一覧の取得 連想配列を返す
    public static async getList(): Promise<MapData[]>{
        const mapModel = await MapMasterModel.findAll();
        let maps: Array<MapData> = [];
        mapModel.forEach((_map: any) => {
            maps.push(new MapData(
                _map.id,
                _map.x,
                _map.y,
                _map.z,
                _map.dir,
            ));
        })
       return maps;
    }
}