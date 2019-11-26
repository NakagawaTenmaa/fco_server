import { createHash } from './utility/hash';
import { UserModel } from './../model/userModel'

// ログインの処理
export class loginController{
    // ユーザーの作成
    public async createUser(data: any): Promise<number>{
        const user = await UserModel.newUser(data.user_name, data.pass, data.character_name);
        if(!user) return -1;
        UserModel.changeStatus(user.id, 1);
        // 状態の変更
        return 0;
    }

    // ユーザーのログイン (ユーザーID : 正常終了) (-1 : 重複ログイン) (-2 : 間違えてまっせ)
    public async loginUser(data: any): Promise<any>{
        const userData = await UserModel.findUserByName(data.user_name);
        const user = userData[0];
        if(user){
            const hash = await createHash(data.pass, user.salt);
            if(hash === user.hash) {
                if(!user.status){
                    // 状態の変更
                    UserModel.changeStatus(user.id, 1);
                    return user;
                } else return -1;
            }
            return -2;
        } return -2;
    }
}