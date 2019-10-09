import { Inventory } from './playerInventory'
import { Weapon } from './playerWeapon'
import { PlayerStatus } from './playetStatus'

// プレイヤークラス
export class Player
{
    // プレイヤーID
    public id: number;
    // 位置X
    public x: number;
    // 位置Y
    public y: number;
    // 位置Z
    public z: number;
    // 装備
    public weapon: Weapon;
    // 状態
    public status: PlayerStatus;
    // インベントリ
    public inventory: Inventory;
    // レベル
    public lv: number;
    // 経験値
    public exp: number;
    
    // コンストラクター
    constructor(_id: number){
        this.id = _id;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.weapon = new Weapon();
        this.weapon.weaponSet(0, 0, 0,0,0,0,0);
        this.status = new PlayerStatus();
        this.inventory = new Inventory();
        this.lv = 1;
        this.exp = 0;
    }

    // 位置の設定
    public setPosition(x: number, y: number, z: number){
        this.x = x,
        this.y = y;
        this.z = z;
    }
}

