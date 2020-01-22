import { Server } from 'ws';
import { IsThere, MakeOk, DuplicateLogin, NotUser, LoginOK } from '../model/packet';
import { loginController } from './../controller/loginController';
import { CharacterManager } from '../controller/character/CharacterManager';
import { Player } from '../controller/player/Player';
import { CommunicationData } from '../controller/CommunicationData';
import { AccessoryDataAccessor } from '../controller/DatabaseAccessors/AccessoryAccessor';
import { MapDataAccessor } from '../controller/DatabaseAccessors/MapAccessory';
import { QuestDataAccessor } from '../controller/DatabaseAccessors/questAccessor';


// ログインルーター
export class loginRouter{
    controller: loginController;
    wss: Server;

    // コンストラクタ
    constructor(){
        this.controller = new loginController();
        this.wss = new Server({port: 8000});
        console.log("new login");
    }

    // 更新
    public loginUpdate(){
        this.wss.on('connection', (ws) => {
            console.log('connection client');
            ws.on('message', (msg: any) => {
                let json = JSON.parse(msg);
                switch(json.command){
                    // ユーザーの作成
                    case 101: this.resultCreateUser(json, ws); break;
                    // ユーザーのログイン
                    case 102: this.resultLoginUser(json, ws); break;

                    // マスターデータの送信
                    case CommunicationData.ReceiveData.LoadingAccessoryMaster.id:{
                            let res : CommunicationData.SendData.LoadingAccessoryMaster = new CommunicationData.SendData.LoadingAccessoryMaster();
                            res.accessorys = AccessoryDataAccessor.instance.getAll();
                            res.version = 1;
                            ws.send(JSON.stringify(res));
                        }
                        break;

                    case CommunicationData.ReceiveData.LoadingMapMaster.id:{
                        let res : CommunicationData.SendData.LoadingMapMaster = new CommunicationData.SendData.LoadingMapMaster();
                        res.maps = MapDataAccessor.instance.getAll();
                        res.version = 1;
                        ws.send(JSON.stringify(res));
                        break;
                    }
                    case CommunicationData.ReceiveData.LoadingQuestMaster.id:{
                        let res : CommunicationData.SendData.LoadingQuestMaster = new CommunicationData.SendData.LoadingQuestMaster();
                        res.quests = QuestDataAccessor.instance.getAll();
                        res.version = 1;
                        ws.send(JSON.stringify(res));
                        break;
                    }
                    default:
                        console.log('not command : ' + json.command);
                        break;
                }
            })  
        })
    }

    // 作成の結果報告
    private async resultCreateUser(data: any, ws: any){   
        const result = await this.controller.createUser(data);
        if(result === 0) {
            const res = new MakeOk();
            res.user_id = 0;
            ws.send(JSON.stringify(res));
        }
        else if(result === -1) {
            const res = new IsThere();
            ws.send(JSON.stringify(res));
        }
    }

    // ログインの結果報告
    async resultLoginUser(data: any, ws: any){
        const result = await this.controller.loginUser(data);
        if(result === -1) ws.send(JSON.stringify(new DuplicateLogin()));
        else if(result === -2) ws.send(JSON.stringify(new NotUser()));
        else {
            const characterManager: CharacterManager = CharacterManager.instance;
            let player: Player = new Player();

            player.dbId = result.id;
            player.Initialize();
            player.name = result.character_name;

            characterManager.AddCharacter(player);

            const res = new LoginOK();
            res.user_id = player.id;
            res.name = player.name;

            ws.send(JSON.stringify(res));
        }
    }
}