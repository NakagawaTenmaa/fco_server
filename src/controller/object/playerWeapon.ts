// プレイヤーの装備クラス
export class PlayerWeapon{
    // 頭
    public head: number;
    // 体
    public body: number;
    // 手
    public hand: number;
    // コンストラクター
    constructor(head: number, body: number, hand: number){
        this.head = head;
        this.body = body;
        this.hand = hand;
    }

    // 装備の設定
    public weaponSet(head: number, body: number, hand: number){
        this.head = head;
        this.body = body;
        this.hand = hand;  
    }

    // 現在の装備の取得
    public weaponGet(): PlayerWeapon{
        return new PlayerWeapon(this.head, this.body, this.hand);
    }
}

