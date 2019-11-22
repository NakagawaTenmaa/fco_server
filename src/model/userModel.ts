import { createHash, createSalt } from './../controller/utility/hash'
import { BaseModel } from './modelBase'
import { format } from 'mysql'

// ユーザーモデル
export class UserModel extends BaseModel{
    // コンストラクタ
    constructor(){
        super("users");
    }

    // ユーザーの新規作成
    public async newUser(name: string, pass: string, characterName: string){
        if(await this.isDuplicateUser(name)) return null;
        const salt = await createSalt();
        const hash = await createHash(pass, salt);
        return await this.create({ name: name, hash: hash, salt: salt, status: 0, characterName: characterName });
    }

    // ユーザー名の検索
    public async findUserByName(name: string){
        return await this.find(["name", name]);
    }

    // ログアウト
    public async logout(id: number, status: number){
        return await this.update([status, id]);
    }

    
    /**
     * 全員のログアウト
     * @memberof UserModel
     */
    public async allLogout(){
        const query = "update `users` set `status` = 0 where `status` = 1";
        return await this.myQuery(query);
    }

    // 重複確認
    private async isDuplicateUser(name: string){
        const data = await this.findUserByName(name);
        return (data.length !== 0);
    }

    /**
     * プレイヤーのログイン状態の変更
     * @param {string} name 変更したい人
     * @param {boolean} state 新しい状態
     * @memberof UserModel
     */
    public async changeStatus(_id: number, _status: number){
        const query = "update `users` set `status` = ? where `id` = ?";
        const col = [_status, _id];
        const sql = format(query, col);
        console.log(sql);
        this.myQuery(sql);
    }
}