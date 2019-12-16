import { BaseModel } from './modelBase'
import { format } from 'mysql'
import { UserMasterData } from '../controller/object/userMasterData';

// ユーザーのセーブデータ
export class UserMaster extends BaseModel{
    static TABLE_NAME = "save_data";

    // ユーザーの読み込み
    public static async findOne(id: number){
        const data = await this.find(["id", id]);
        return data[0];
    }

    // マスターデータの更新
    public static async updateModel(id: number, x: number, y: number, z: number, modelId: number){
        const check = await this.findOne(id);
        let res: any;
        if(typeof check === 'undefined' || check === undefined) res = await this.create({id: id, x: x, y: y , z: z, model_id: modelId });
        else {
            const sql = format(
                'UPDATE `save_data` SET `x` = ?,`y` = ?,`z` = ?,`model_id` = ? where `id` = ?',
                [x, y, z, modelId, id]);            
            res = await this.myQuery(sql);
        }
        return res;
    }
}