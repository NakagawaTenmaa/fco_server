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

// 位置同期用
export class PositionData{
    command: number = 202;
    user_id: number;
    x: number;
    y: number;
    z: number;
    dir: number;
    // コンストラクタ
	constructor(_id: number, _x: number, _y: number, _z: number , _dir: number){
		this.user_id = _id;
		this.x = _x;
		this.y = _y;
		this.z = _z;
		this.dir = _dir;
	}
}

// プレイヤーの状態
export class PlayerStatus{
    command: number = 206;
    user_id: number;
	hp: number;
	mp: number;
	status : number;
	constructor(_id: number, _hp: number, _mp: number, _status: number){
		this.command = 206;
		this.user_id = _id;
		this.hp = _hp;
		this.mp = _mp;
		this.status = _status;
	}
}

export class NewUser{
    comand: number = 204;
    user_id: number;
	constructor(_id: number){
		this.user_id = _id;
	}
}