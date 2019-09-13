import { createHash, createSalt } from './../controller/utility/hash'
import { BaseModel } from './modelBase'

// ユーザーモデル
export class UserModel extends BaseModel{
    // コンストラクタ
    constructor(){
        super("users");
    }

    // ユーザーの新規作成
    public async newUser(name: string, pass: string){
        if(await this.isDuplicateUser(name)) return null;
        const salt = await createSalt();
        const hash = await createHash(pass, salt);
        return await this.create({ name: name, hash: hash, salt: salt, status: 0 });
    }

    // ユーザー名の検索
    public async findUserByName(name: string){
        return await this.find(name);
    }

    // ログアウト
    public async logout(id: number, status: number){
        return await this.update([status, id]);
    }

    // 重複確認
    private async isDuplicateUser(name: string){
        const data = await this.findUserByName(name);
        return (data.length !== 0);
    }
}