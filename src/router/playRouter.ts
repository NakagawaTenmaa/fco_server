import { Server, } from 'ws';
import { UserModel } from '../model/userModel';
import WebSocket = require('ws');
import { CharacterManager } from '../controller/character/CharacterManager';
import { CommunicationData } from '../controller/CommunicationData';
import { Player } from '../controller/player/Player';
import { AccessoryDataAccessor } from '../controller/DatabaseAccessors/AccessoryAccessor';

export class playRouter{
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

            ws.on('message', async (msg: WebSocket.Data) => {
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
                    await this.characterManager.LoadCharacter(ws,data.user_id);
                }
                // セーブデータの読み込み
                else if(data instanceof CommunicationData.ReceiveData.SaveLoadCtoS){
                    await this.characterManager.LoadCharacter(ws,data.user_id);
                }
                // モデルIDの設定
                else if(data instanceof CommunicationData.ReceiveData.SaveModelType){
                    let player: Player | undefined = this.characterManager.FindPlayer(data.user_id);
                    if(player === undefined) return;
                    player.modelId = data.model_id;
                    console.log("model id setting user: " + data.user_id.toString() + "/ modelType: " + data.model_id.toString());
                }
                // 読み込み完了
                else if(data instanceof CommunicationData.ReceiveData.LodingOK){
                    this.characterManager.initPlayer(data.user_id);
                }
                // ログアウト
                else if(data instanceof CommunicationData.ReceiveData.LogoutCharacter){
                    console.log("logout: " + data.user_id.toString());
                    let sendData: CommunicationData.SendData.LogoutCharacter = new CommunicationData.SendData.LogoutCharacter();
                    sendData.user_id = data.user_id;
                    this.characterManager.SendAll(JSON.stringify(sendData));
                    await this.characterManager.PlayerLogout(data.user_id);
                } 
                // プレイヤーの検索
                else if(data instanceof CommunicationData.ReceiveData.FindOfPlayerCtoS){
                    let res: CommunicationData.SendData.FindOfPlayerStoC = new CommunicationData.SendData.FindOfPlayerStoC();
                    const player = this.characterManager.FindPlayer(data.target_id);
                    if(player === undefined) return;
                    
                    res.user_id = player.id;
                    res.x = player.transform.position.x;
                    res.y = player.transform.position.y;
                    res.z = player.transform.position.z;
                    res.model_id = player.modelId;
                    res.name = player.name;
                    this.characterManager.SendOne(data.user_id, JSON.stringify(res));
                }
                // アクセサリーの変更
                else if(data instanceof CommunicationData.ReceiveData.AccessoryChange){
                    this.characterManager.ChangeAccessory(data);
                }
                // マップの移動
                else if(data instanceof CommunicationData.ReceiveData.MoveingMap){
                    this.characterManager.changeMap(data);
                }
                // 報酬選択
                else if(data instanceof CommunicationData.ReceiveData.SelectReward){
                    this.characterManager.addInventory(data);
                }
                // 永久インベ取得
                else if(data instanceof CommunicationData.ReceiveData.GetInventory){
                    this.characterManager.getInventory(data);
                }
                // ドロップインベの取得
                else if(data instanceof CommunicationData.ReceiveData.GetDropInventory){
                    this.characterManager.getDropInventory(data);
                }
                // クエスト受注
                else if(data instanceof CommunicationData.ReceiveData.QuestOrders){
                    this.characterManager.setQuest(data);
                }


                else {
                    console.log("none packet data " + data.command.toString());
                }
            })
        })
    }

    /**
     * 終了処理
     * @memberof playRouter
     */
    public async end(){
        await UserModel.allLogout();
    }
}