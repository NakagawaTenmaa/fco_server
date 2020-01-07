import { BaseModel } from './modelBase'
import { AccessoryData } from '../controller/DatabaseAccessors/AccessoryAccessor';

// 敵のモデル
export class AccessoryModel extends BaseModel{
    static TABLE_NAME = 'accessorys';

    // 敵の一覧の取得 連想配列を返す
    public static async getAccessoryList(): Promise<AccessoryData[]>{
        const accessorysModel = await AccessoryModel.findAll();
        let accessorys: Array<AccessoryData> = [];
        accessorysModel.forEach((_accessory: any) => {
            accessorys.push(new AccessoryData(
                _accessory.id,
                _accessory.category,
                _accessory.name,
                _accessory.level,
                _accessory.comment,
                _accessory.hp,
                _accessory.mp,
                _accessory.str,
                _accessory.vit,
                _accessory.int,
                _accessory.mmd,
                _accessory.dex,
                _accessory.agi,
                _accessory.image
            ));
        })
        
       return accessorys;
    }
}