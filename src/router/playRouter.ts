import { Server, } from 'ws';
import { CharacterManager } from '../ishitaka/CharacterManager';
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
        console.log("new play");
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
                //console.log('msg : ' + msg);
                const data = CommunicationData.Converter.Convert(msg.toString());
  
                // コンバートエラー
                if(typeof data === 'undefined' || !data) return false;

                // 移動処理
                if(data instanceof CommunicationData.ReceiveData.CharacterTransform){
                    this.characterManager.Receive(JSON.stringify(data));
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
                // ログアウト
                else if(data instanceof CommunicationData.ReceiveData.CharacterTransform){
                    
                }
            })
        })
    }
}