import { Player } from './object/playerClass';
import { PositionData, NewUser, InitPlayer, GetInventory, InventoryUpdateOk, InventoryUpdateError, ChangeWeapon } from '../model/packet';
import { PlayerWeapon } from './object/playerWeapon';
import { Vec3 } from './utility/vec3';
import { userSaveModel } from '../model/characterDataModel';

// プレイの処理
export class playController{
    players: {[key: string]: Player} = {};

    // プレイヤーの移動
    public playersMove(data: any){
        const id = data.user_id;
        const player = this.players[id];
        if(typeof player == 'undefined'){
            console.log('not user');
            return;
        }

        player.x = data.x;
        player.y = data.y;
        player.z = data.z;
        player.setPosition(data.x, data.y, data.z);

        return new PositionData(data.user_id, data.x, data.y, data.z, data.dir);
    }

    // プレイヤーの初期化
    public initUser(id: number){
        return new NewUser(id);
    }

    // プレイヤーのロード
    public loadPlayer(id: number){
        // セーブデータの読み込み
        // TODO: 値がデバッグ
        const weapon = new PlayerWeapon(2,3,4,5,6,7,8);
        const pos = new Vec3(10,10,10);
        return new InitPlayer(weapon, pos, 1, 10);
    }

    // ログアウト
    public async logoutUser(data: any){
        const player = this.players[data.user_id];
        await userSaveModel(player.id, new Vec3(player.x, player.y, player.z), player.weapon, player.lv, player.exp);
    }

    // アイテムの取得
    public inventoryUpdate(data: any){
        const id = data.user_id;
        const inventory = this.players[id].inventory.getItemList();

        return new GetInventory(inventory);
    }

    // アイテム一覧の取得
    public inventoryList(data: any){
        const id = data.user_id;
        const result = this.players[id].inventory.changeItem(data.itemId, data.num, data.type);

        let res;
        if(result) res = new InventoryUpdateOk();
        else res = new InventoryUpdateError();
        return res;
    }

    // プレイヤーの装備変更
    public weaponUpdate(data: any){
        const id = data.user_id;    
        // 装備の変更
        this.players[id].weapon.weaponSet(data.weapon, data.head, data.body, data.hand, data.leg, data.accessoryL, data.accessoryR);
        return new ChangeWeapon();
    }

    // プレイヤーの追加
    public addPlayer(data: any){
        this.players[data.user_id] = new Player(data.id);
    }
}