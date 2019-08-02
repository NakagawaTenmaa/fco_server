//ログイン失敗
export class NotUser{
    command: number = 104;
}

// 重複ログイン
export class DuplicateLogin{
    command: number = 901;
}

// ログインの確認OK
export class LoginOK
{
    command: number = 103;
    user_id: number = Math.floor(Math.random() * 1000000000);
}

// 作成OK
export class MakeOk{
    command: number = 105;
    user_id: number = Math.floor(Math.random() * 1000000000);
}

// すでに登録されている
export class IsThere{
    command: number = 106;
}

// ユーザー情報
export class UserData{
    id: number = 0;
    user_id: number = 0;
}