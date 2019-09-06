import {Server} from 'ws';
import {listen} from 'socket.io';
import {NewUser, PositionData, GetInventory, InventoryUpdateOk, InventoryUpdateError, ChangeWeapon, InitPlayer, Vec3} from './../model/packet';
import {Player} from './object/playerClass';
import { PlayerWeapon } from './object/playerWeapon';
import { userSaveModel } from './../model/characterDataModel'

const wss: Server = new Server({port: 8001});
let players: {[key: string]: Player} = {};

// サーバー間のやり取り用更新
export function serverSocUpdate(){
    let io = listen(10001);
    console.log('start socket.io server');
    io.sockets.on('connection', (socket: any) => {
        console.log('connect');
        socket.on('user_login', (data: any) => {
            console.log("data : " + data);
            players[data.user_id] = new Player(data.id);
            console.log(players[data.user_id]);
        })
    })
}

// 更新
export function playUpdate(){
    wss.on('connection', (ws: any) => {
        console.log("client_connection");
        ws.on('message', (msg: any) => {
            console.log('msg : ' + msg);
            let json = JSON.parse(msg);
            switch(json.command){
                // 位置同期
                case 201: playersMove(json); break;
                // 初回IN
                case 203: initUser(json, ws); break;
                // ステータス共有
                case 205: break;
                // インベントリの更新
                case 301: inventoryUpdate(json, ws); break;
                // 装備の更新
                case 306: weaponUpdate(json, ws); break;
                // アイテム一覧の取得
                case 702: inventoryList(json, ws); break;               
                // ログアウト
                case 701: logoutUser(json); break;
            }
        })
    })
}

// プレイヤーの移動
function playersMove(data: any){
    let id = data.user_id;
    if(typeof players[id] == 'undefined'){
        console.log('not user');
        return;
    }

    players[id].x = data.x;
    players[id].y = data.y;
    players[id].z = data.z;

    const res = new PositionData(data.user_id, data.x, data.y, data.z, data.dir);
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(res));
    });
}

// プレイヤーの初期化
function initUser(data: any, ws: any){
    const res = new NewUser(data.user_id);
    wss.clients.forEach(client => {
        if(ws === client) {
            // セーブデータの読み込み
            // TODO: 値がデバッグ
            const weapon = new PlayerWeapon(2,3,4,5,6,7,8);
            const pos = new Vec3(10,10,10);
            const playerRes = new InitPlayer(weapon, pos, 1, 10);
            ws.send(JSON.stringify(playerRes));
        } else client.send(JSON.stringify(res));
    })
}

// ログアウト
async function logoutUser(json: any){
    const player = players[json.user_id];
    await userSaveModel(player.id, new Vec3(player.x, player.y, player.z), player.weapon, player.lv, player.exp);
}

// TODO: プレイヤーの状態共有
function statusUpdate(data: any){

}

// アイテムの取得
function inventoryUpdate(data: any, ws: any){
    const id = data.user_id;
    const inventory = players[id].inventory.getItemList();

    const res = new GetInventory(inventory);
    ws.send(JSON.stringify(res));
}

// アイテム一覧の取得
function inventoryList(data: any, ws: any){
    const id = data.user_id;
    const result = players[id].inventory.changeItem(data.itemId, data.num, data.type);

    let res;
    if(result) res = new InventoryUpdateOk();
    else res = new InventoryUpdateError();

    ws.send(JSON.stringify(res));
}

// プレイヤーの装備変更
function weaponUpdate(data: any, ws: any){
    const id = data.user_id;    
    // 装備の変更
    players[id].weapon.weaponSet(data.weapon, data.head, data.body, data.hand, data.leg, data.accessoryL, data.accessoryR);
    ws.send(JSON.stringify(new ChangeWeapon()));
}