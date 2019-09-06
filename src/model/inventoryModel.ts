import { connection } from './setting';

// インベントリの取得
export async function findInventoryById(id: number):Promise<any>{
    const conn = await connection();
    return await conn.query("select * from `inventory` where `userId` = ?", [id]);
}