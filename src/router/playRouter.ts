import {Server} from 'ws';
import {listen} from 'socket.io';
import { playController } from './../controller/playController';



export class playRouter{
    controller: playController = new playController();
    wss: Server;

    // コンストラクタ
    constructor(){
        this.wss = new Server({port: 8001});
    }
    
    // 更新
    public playUpdate(){
        this.wss.on('connection', (ws: any) => {
            console.log("client_connection");
            ws.on('message', (msg: any) => {
                console.log('msg : ' + msg);
                let json = JSON.parse(msg);
                switch(json.command){

                    
                    // セーブの読み込み
                    case 209: ws.send(JSON.stringify(this.controller.loadPlayer(json.user_id))); break;
                    // 読み込み完了なので入場
                    case 211: this.initUser(json, ws); break;
                    // 位置同期
                    case 201: this.playersMove(json); break;
                    // ログアウト
                    case 701: {
                        this.controller.logoutUser(json);
                        ws.send({ command: 706, user_id: json.user_id });
                    } 
                    break;

                    // 初回IN
                    //case 203: this.initUser(json, ws); break;
                    
                    // ステータス共有
                    case 205: break;
                    // インベントリの更新
                    case 301: this.inventoryUpdate(json, ws); break;
                    // 装備の更新
                    case 306: this.weaponUpdate(json, ws); break;
                    // アイテム一覧の取得
                    case 702: this.inventoryList(json, ws); break;               

                }
            })
        })
        this.serverSocUpdate();
    }

    // 移動201
    private playersMove(data: any){
        const res = this.controller.playersMove(data);
        this.wss.clients.forEach((client) => {
            client.send(JSON.stringify(res));
        });
    }

    // プレイヤーのログイン203
    private initUser(data: any, ws: any){
        const res = this.controller.initUser(data.user_id);
        this.wss.clients.forEach(client => {
            if(ws === client) {
                ws.send(JSON.stringify(this.controller.loadPlayer(data.user_id)));
            } else client.send(JSON.stringify(res));
        })
    }

    // サーバー間のやり取り用更新
    private serverSocUpdate(){
        let io = listen(10001);
        console.log('start socket.io server');
        io.sockets.on('connection', (socket: any) => {
            console.log('connect');
            socket.on('user_login', (data: any) => {
                console.log(data);
                console.log("data : " + data);
                this.controller.addPlayer(data);
            })
        })
    }

    // TODO: プレイヤーの状態共有
    private statusUpdate(data: any){

    }

    // インベントリの更新
    private inventoryUpdate(data: any, ws: any){
        ws.send(JSON.stringify(this.controller.inventoryUpdate(data)));
    }

    // インベントリ一覧取得
    private inventoryList(data: any, ws: any){
        ws.send(JSON.stringify(this.controller.inventoryList(data)));
    }

    // 装備の更新
    public weaponUpdate(data: any, ws: any){
        ws.send(JSON.stringify(this.controller.weaponUpdate(data)));
    }

    // データのセーブ

    // 位置の更新

    // 
}