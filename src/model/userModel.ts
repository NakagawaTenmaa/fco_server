import { connection } from './setting';

// ユーザーの作成
export async function createUserModel(name: string, pass: string): Promise<any>{
    // 重複チェック
    if(await isDuplicateUser(name)) return false;
    // ハッシュ化
    const hash = "";
    const salt = "";
    // 作成
    const conn = await connection();
    // 作成
    return await conn.query("insert into `user` set ?", { name: name, hash: hash, salt: salt, status: 0 });
}

// 重複確認 trueある　falseなす
export async function isDuplicateUser(name: string): Promise<boolean>{
    const data = await findUsersByName(name);
    return (data.length == 0);
}

// ユーザー名の検索
export async function findUsersByName(name: string): Promise<any>{
    const conn = await connection();
    return conn.query("select * from `users` where `name` = ?", [name]);
}

// ログアウト処理
export async function changeUserStatusById(id: number, status: number): Promise<any>{
    const conn = await connection();
    return conn.query("update `users` set status = ? where = ?",[status, id]);
}