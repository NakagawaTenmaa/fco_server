import { connection }  from './setting'
import { format } from 'mysql'

// モデルクラスのベース
export abstract class BaseModel{
    TABLE_NAME: string;

    // コンストラクタ
    constructor(name: string){
        this.TABLE_NAME = name;
    }

    // 作成
    async create(col: any) {
        const conn = await connection();
        const query = "insert into ?? set ?";
        const data = await conn.query(query, [this.TABLE_NAME, col]);
        conn.end();
        return data;
    }

    // 更新
    async update(col: any){
        const conn = await connection();
        const query = "update ?? set ?? = ? where = ?";
        const data = await conn.query(query, [this.TABLE_NAME, col]);
        conn.end();
        return data;
    }

    // 一覧
    async findAll(){
        const conn = await connection();
        const query = "select * from ??";
        const data = await conn.query(query, [this.TABLE_NAME]);
        conn.end();
        return data;
    }

    // 検索
    async find(col: Array<any>){
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
    async delete(table: string, col: any){
        const conn = await connection();
        const query = "delete form ?? where = ?";
        const data = await conn.query(query, [table, col]);
        conn.end();
        return data;
    }

    // クエリ直
    async myQuery(que: string){
        const conn = await connection();
        const data = await conn.query(que);
        conn.end();
        return data;
    }
}