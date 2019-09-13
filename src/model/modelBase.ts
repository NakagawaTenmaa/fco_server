import { connection }  from './setting'

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
    async find(col: any){
        const conn = await connection();
        const query = "select * form ?? where = ?";
        return await conn.query(query, [this.TABLE_NAME, col]);
    }

    // 削除
    async delete(table: string, col: any){
        const conn = await connection();
        const query = "delete form ?? where = ?";
        return await conn.query(query, [table, col]);
    }
}