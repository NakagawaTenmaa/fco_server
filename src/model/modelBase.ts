import { connection }  from './setting'
import { format } from 'mysql'

// モデルクラスのベース
export abstract class BaseModel{
    static TABLE_NAME: string;

    // 作成
    static async create(col: any) {
        const conn = await connection();
        const query = "insert into ?? set ?";
        const data = await conn.query(query, [this.TABLE_NAME, col]);
        conn.end();
        return data;
    }

    // 更新
    static async update(col: any){
        const conn = await connection();
        const query = "update ?? set ?? = ? where = ?";
        const data = await conn.query(query, [this.TABLE_NAME, col]);
        conn.end();
        return data;
    }

    // 一覧
    static async findAll(){
        const conn = await connection();
        const query = "select * from ??";
        const data = await conn.query(query, [this.TABLE_NAME]);
        conn.end();
        return data;
    }

    // 検索
    static async find(col: Array<any>){
        const conn = await connection();
        const query = "select * from ?? where ?? = ?";
        col.unshift(this.TABLE_NAME);
        const sql = format(query, col);
        conn.query(sql);
        const data = await conn.query(sql);
        conn.end();
        return data;
    }

    // 削除
    static async delete(table: string, col: any){
        const conn = await connection();
        const query = "delete form ?? where = ?";
        const data = await conn.query(query, [table, col]);
        conn.end();
        return data;
    }

    // クエリ直
    static async myQuery(que: string){
        const conn = await connection();
        const data = await conn.query(que);
        conn.end();
        return data;
    }
}