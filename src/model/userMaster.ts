import { BaseModel } from './modelBase'
import { format } from 'mysql'

// ユーザーのセーブデータ
class UserMaster extends BaseModel{
    constructor(){
        super('save_data');
    }

    // ユーザーの読み込み
    public async findOne(id: number){
        const data = await this.find(["id", id]);
        return data[0];
    }

    // マスターデータの更新
    public async updateModel(id: number, x: number, y: number, z: number){
        const check = await this.findOne(id);
        let res: any;
        if(typeof check === 'undefined') res = await this.create({id: id, x: x, y: y, z: z });
        else {
            const sql = format('update `save_data` set x = ?, y = ?, z = ? where `id` = ?', [x, y, z, id]);
            res = await this.myQuery(sql);
        }
        return res;
    }
}