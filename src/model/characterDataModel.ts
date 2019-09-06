import { Vec3 } from './packet'
import { PlayerWeapon } from './../controller/object/playerWeapon'
import { connection } from './setting';

// キャラクターのログアウト時の状態保存
export async function userSaveModel(id: number, pos: Vec3, weapon: PlayerWeapon, lv: number, exp: number): Promise<any>{
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