import { BaseModel } from './modelBase'
import { format } from 'mysql'

// ユーザーのセーブデータ
export class InventoryModel extends BaseModel{
    static TABLE_NAME = "inventory_accessorys";

    // ユーザーの読み込み
    public static async findOne(id: number){
        const data = await this.find(["id", id]);
        return data[0];
    }

    // マスターデータの更新
    public static async updateModel(id: number, _accessorys: string){
        const check = await this.findOne(id);
        let res: any;
        if(check === undefined) res = await this.create({id: id, accessorys: _accessorys});
        else {
            const sql = format(
                'UPDATE `save_data` SET `accessorys` = ? where `id` = ?',
                [_accessorys, id]);            
            res = await this.myQuery(sql);
        }
        return res;
    }
}