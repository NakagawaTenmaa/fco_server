import { Server } from 'ws';
import { IsThere, MakeOk, DuplicateLogin, NotUser, LoginOK } from '../model/packet';
import { loginController } from './../controller/loginController';
import { CharacterManager } from '../ishitaka/CharacterManager';
import { Player } from '../ishitaka/Player';


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
                console.log(msg);
                let json = JSON.parse(msg);
                switch(json.command){
                    // ユーザーの作成
                    case 101: this.resultCreateUser(json, ws); break;
                    // ユーザーのログイン
                    case 102: this.resultLoginUser(json, ws); break;
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

            console.log('send makeok : ' + JSON.stringify(res));
            ws.send(JSON.stringify(res));
        }
        else if(result === -1) {
            const res = new IsThere();
            console.log(res);
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


            console.log('send loginok : ' + JSON.stringify(res));
            ws.send(JSON.stringify(res));
        }
    }
}