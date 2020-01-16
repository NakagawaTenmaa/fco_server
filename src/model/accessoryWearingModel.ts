import { BaseModel } from './modelBase'
import { format } from 'mysql'

// ユーザーのセーブデータ
export class AccessoryWearing extends BaseModel{
    static TABLE_NAME = "accessory_wearing";

    public static async findOne(id: number){
        const data = await this.find(["id", id]);
        return data[0];
    }

    // 更新
    public static async updateModel(id: number, accessorys: string){
        const check = await this.findOne(id);
        let res: any;
        if(typeof check === 'undefined' || check === undefined) res = await this.create({id: id, accessorys: accessorys });
        else {
            const sql = format(
                'UPDATE `accessory_wearing` SET `accessorys` = ? where `id` = ?',
                [accessorys, id]);
            res = await this.myQuery(sql);
        }
        return res;
    }
}