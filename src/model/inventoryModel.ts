import { connection } from './setting';

// インベントリの取得
export function getInventoryModel(id: number, callback: (data: any) => void){
    connection.query('select * from `inventory` where `userId` = "' + id.toString() + '"', (err: any,data: any) =>{
        if(err) callback(err);
        callback(data);
    });
}