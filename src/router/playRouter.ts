import { Server, } from 'ws';
import {listen} from 'socket.io';
import { CharacterManager } from '../ishitaka/CharacterManager';
import { Player } from '../ishitaka/Player';
import { CommunicationData } from '../ishitaka/CommunicationData';
import WebSocket = require('ws');



export class playRouter{
    //controller: playController = new playController();
    wss: Server;

    characterManager: CharacterManager;
    time: number = 0;
    // コンストラクタ
    constructor(){
        this.characterManager = CharacterManager.instance;
        this.wss = new Server({port: 8001});
        this.characterManager.Initialize();
        this.time = new Date().getTime();
    }
    

    public characterUpdate(){
        var nowTime = new Date().getTime();
        this.characterManager = CharacterManager.instance;
        this.characterManager.Update(nowTime - this.time);
        this.time = nowTime;
    }

    // 更新
    public playUpdate(){
        this.wss.on('connection', (ws: WebSocket) => {
            console.log("client_connection");

            ws.on('message', (msg: WebSocket.Data) => {
                console.log('msg : ' + msg);
                const data = CommunicationData.Converter.Convert(msg.toString());
  
                // コンバートエラー
                if(typeof data === 'undefined' || !data) return false;

                // 移動処理
                if(data instanceof CommunicationData.ReceiveData.CharacterTransform){
                    
                }
                // セーブデータの読み込み
                else if(data instanceof CommunicationData.ReceiveData.LoadCharacter){
                    this.characterManager.LoadCharacter(ws,data.user_id);
                }
                // 初期ログイン
                else if(data instanceof CommunicationData.ReceiveData.InitCharacter){
                    let sendData:CommunicationData.SendData.InitCharacter = new CommunicationData.SendData.InitCharacter();
                    sendData.user_id = data.user_id;                    
                    this.characterManager.SendAll(JSON.stringify(sendData));
                }


                let json = JSON.parse(msg.toString());
                /*
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
                */
            })
        })
        
        this.serverSocUpdate();
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
    
                    // TODO: 処理の場所変更 ---
                    let player: Player = new Player();
                    player.dbId = data.id;
                    this.characterManager.AddCharacter(player);
                    // -----------------------
    
                    //this.controller.addPlayer(data);
                })
            })
        }
/*
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
                //ws.send(JSON.stringify(this.controller.loadPlayer(data.user_id)));
            } else client.send(JSON.stringify(res));
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
    */
}