import { Weapon } from './../controller/object/playerWeapon'
import { connection } from './setting';
import { Vector3 } from '../ishitaka/Vector3';

// キャラクターのログアウト時の状態保存
export async function userSaveModel(id: number, pos: Vector3, weapon: Weapon, lv: number, exp: number): Promise<any>{
    const data =   {
        "user_id": id, 
        "pos_x": pos.x, 
        "pos_y": pos.y, 
        "pos_z": pos.z, 
        "level": lv, 
        "exp": exp,
        "updated": new Date()
    };
    const conn = await connection();
    return await conn.query("insert into `save_data` set ?", data);
}