// プレイヤーの状態クラス
export class PlayerStatus{
    public status: number;

    // コンストラクター
    constructor(){
        this.status = 0;
    }

    // 状態の変更
    public setStatus(status: number){
        this.status = status;
    }
}

// 異常状態
export class Status{
    public pizon: number = 1;
    public mahi : number = 2;
}
