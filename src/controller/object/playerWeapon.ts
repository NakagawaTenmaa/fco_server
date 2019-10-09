// プレイヤーの装備クラス
export class Weapon{
    // 武器
    public weapon: number = 0;
    // 頭
    public head: number = 0;
    // 体
    public body: number = 0;
    // 手
    public hand: number = 0;
    // 足
    public leg: number = 0;
    // アクセ
    public accessoryL: number = 0;
    public accessoryR: number = 0;

    // コンストラクター
    constructor(){
    }

    // 全ての装備の設定
    public weaponSet(weapon: number, head: number, body: number, hand: number, leg: number, accessoryL: number, accessoryR:number){
        this.weapon = weapon;
        this.head = head;
        this.body = body;
        this.hand = hand;
        this.leg = leg;
        this.accessoryL = accessoryL;
        this.accessoryR = accessoryR;
    }   

    // 現在の装備の取得
    public weaponGet(): Weapon{
        return this;
    }
}

