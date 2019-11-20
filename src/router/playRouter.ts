import { Server, } from 'ws';
import { CharacterManager } from '../ishitaka/CharacterManager';
import { CommunicationData } from '../ishitaka/CommunicationData';
import { UserModel } from '../model/userModel';
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
                // 敵の更新
                else if(data instanceof CommunicationData.ReceiveData.GetEnemy){
                    this.characterManager.SendEnemy(data.user_id, data.map_id);
                }
                // 状態の共有
                else if(data instanceof CommunicationData.ReceiveData.PlayerStatus){
                    this.characterManager.FindStatus(data);
                }
                // 攻撃処理
                else if(data instanceof CommunicationData.ReceiveData.Attack){
                    this.characterManager.ReceiveUseSkill(data);
                }
                // セーブデータの読み込み
                else if(data instanceof CommunicationData.ReceiveData.LoadCharacter){
                    this.characterManager.LoadCharacter(ws,data.user_id);
                }
                // 初回IN
                else if(data instanceof CommunicationData.ReceiveData.LoadOK){
                    let sendData:CommunicationData.SendData.InitCharacter = new CommunicationData.SendData.InitCharacter();
                    sendData.user_id = data.user_id;                    
                    this.characterManager.SendAll(JSON.stringify(sendData));
                }
                // ログアウト
                else if(data instanceof CommunicationData.ReceiveData.LogoutCharacter){
                    console.log("logout: " + data.user_id.toString());
                    this.characterManager.PlayerLogout(data.user_id);
                    let sendData: CommunicationData.SendData.LogoutCharacter = new CommunicationData.SendData.LogoutCharacter();
                    sendData.user_id = data.user_id;
                    this.characterManager.SendAll(JSON.stringify(sendData));
                }
            })
        })
    }

    /**
     * 終了処理
     * @memberof playRouter
     */
    public async end(){
        const model: UserModel = new UserModel();
        await model.allLogout();
    }
}