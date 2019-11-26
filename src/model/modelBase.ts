import { connection }  from './setting'
import { format } from 'mysql'

// モデルクラスのベース
export abstract class BaseModel{
    static TABLE_NAME: string;

    // 作成
    static async create(col: any) {
        const conn = await connection();
        const query = "insert into ?? set ?"
        return await conn.query(query, [this.TABLE_NAME, col]);
    }

    // 更新
    static async update(col: any){
        const conn = await connection();
        const query = "update ?? set ?? = ? where = ?";
        return await conn.query(query, [this.TABLE_NAME, col]);
    }

    // 一覧
    static async findAll(){
        const conn = await connection();
        const query = "select * from ??";
        return await conn.query(query, [this.TABLE_NAME]);
    }

    // 検索
    static async find(col: Array<any>){
        const conn = await connection();
        const query = "select * from ?? where ?? = ?";
        col.unshift(this.TABLE_NAME);
        const sql = format(query, col);
        conn.query(sql);
        return await conn.query(sql);
    }

    // 削除
    static async delete(table: string, col: any){
        const conn = await connection();
        const query = "delete form ?? where = ?";
        return await conn.query(query, [table, col]);
    }

    // クエリ直
    static async myQuery(que: string){
        const conn = await connection();
        return await conn.query(que);
    }
}