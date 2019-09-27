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
        const query = "insert into ?? set ?"
        return await conn.query(query, [this.TABLE_NAME, col]);
    }

    // 更新
    async update(col: any){
        const conn = await connection();
        const query = "update ?? set ?? = ? where = ?";
        return await conn.query(query, [this.TABLE_NAME, col]);
    }

    // 一覧
    async findAll(){
        const conn = await connection();
        const query = "select * from ??";
        return await conn.query(query, [this.TABLE_NAME]);
    }

    // 検索
    async find(col: Array<any>){
        const conn = await connection();
        const query = "select * from ?? where ?? = ?";
        col.unshift(this.TABLE_NAME);
        const sql = format(query, col);
        conn.query(sql);
        return await conn.query(sql);
    }

    // 削除
    async delete(table: string, col: any){
        const conn = await connection();
        const query = "delete form ?? where = ?";
        return await conn.query(query, [table, col]);
    }

    // クエリ直
    async myQuery(que: string){
        const conn = await connection();
        return await conn.query(que);
    }
}