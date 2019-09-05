// プレイヤーの装備クラス
export class PlayerWeapon{
    // 武器
    private weapon: number;
    // 頭
    private head: number;
    // 体
    private body: number;
    // 手
    private hand: number;
    // 足
    private leg: number;
    // アクセ
    private accessoryL: number;
    private accessoryR: number;

    // コンストラクター
    constructor(weapon: number, head: number, body: number, hand: number, leg: number, accessoryL: number, accessoryR:number){
        this.weapon = weapon;
        this.head = head;
        this.body = body;
        this.hand = hand;
        this.leg = leg;
        this.accessoryL = accessoryL;
        this.accessoryR = accessoryR;
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
    public weaponGet(): PlayerWeapon{
        return this;
    }
}

