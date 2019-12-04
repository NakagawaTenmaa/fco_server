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
    public static async updateModel(id: number, x: number, y: number, z: number){
        const check = await this.findOne(id);
        let res: any;
        if(typeof check === 'undefined') res = await this.create({id: id, x: x, y: y, z: z });
        else {
            //const sql = format('update `save_data` set x = ?, y = ?, z = ? where `id` = ?', [x, y, z, id]);
            const sql = format('INSERT INTO `save_data` (`id`,`x`, `y`, `z`) VALUES (?,?,?,?)ON DUPLICATE KEY UPDATE `x` = VALUES(?), `y` = VALUES(?), `z` = VALUES(?);',[id, x, y, z, x, y, z]);
            res = await this.myQuery(sql);
        }
        return res;
    }
}