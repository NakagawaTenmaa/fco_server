import { createHash } from './utility/hash';
import { UserModel } from './../model/userModel'

// ログインの処理
export class loginController{
    model = new UserModel();

    // ユーザーの作成
    public async createUser(data: any): Promise<number>{
        const user = await this.model.newUser(data.user_name, data.pass);
        if(!user) return -1;
        this.model.changeStatus(user.id, 1);
        // 状態の変更
        return 0;
    }

    // ユーザーのログイン (ユーザーID : 正常終了) (-1 : 重複ログイン) (-2 : 間違えてまっせ)
    public async loginUser(data: any): Promise<number>{
        const userData = await this.model.findUserByName(data.user_name);
        const user = userData[0];
        if(user){
            const hash = await createHash(data.pass, user.salt);
            if(hash === user.hash) {
                if(!user.status){
                    // 状態の変更
                    this.model.changeStatus(user.id, 1);
                    return user.id;
                } else return -1;
            }
            return -2;
        } return -2;
    }
}