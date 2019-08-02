import {connection} from './setting';

// ユーザーの作成
export function CreateUserModel(name: string, hash: string, salt: string, callback: (err: any) => void){
    CountUserModel(name, num => {
        if(num === 0){
            connection.query('INSERT INTO `users`(`name`,`hash`,`salt`) VALUES ("' + name +'","' + hash + '","' + salt + '")',
            (err: any) => { 
                if(err) callback(-1);
                else callback(0);
            });
        } else {
            callback(-1);
        }
    })
}

// ユーザーのログアウト
export function LogoutUserModel(){

}

// ユーザー名からの検索
export function SelectNameModel(name: string, callback: (data: any) => void){
    connection.query('select * from `users` where `name` = "' + name + '"',(err: any,data: any) => {
        if(err) callback(err);
        else callback(data);
    });
}

// ユーザー名のカウント
function CountUserModel(name: string, callback: (data: number) => void){
    SelectNameModel(name, (data => { callback(data.length); }))
}

// ログイン状態の変更
export function LoginStateChangeModel(state: number){
    
}