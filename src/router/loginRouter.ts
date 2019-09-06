import { Server } from 'ws';
import io from 'socket.io-client';
import {IsThere, MakeOk, DuplicateLogin, NotUser, LoginOK, UserData} from '../model/packet';
import { loginController } from './../controller/loginController';


// ログインルーター
export class loginRouter{
    controller: loginController;
    socket: SocketIOClient.Socket;
    wss: Server;

    // コンストラクタ
    constructor(){
        this.controller = new loginController();
        this.socket = io('http://localhost:10001');
        this.wss = new Server({port: 8000});
    }

    // 更新
    public loginUpdate(){
        console.log("login server open");
        this.socket.on('connect', () => {
            this.wss.on('connection', (ws) => {
                ws.on('message', (msg: any) => {
                    let json = JSON.parse(msg);
                    switch(json.command){
                        // ユーザーの作成
                        case 101: this.resultCreateUser(json, ws); break;
                        // ユーザーのログイン
                        case 102: this.resultLoginUser(json, ws); break;
                    }
                })  
            })
        })
    }

    // 作成の結果報告
    private async resultCreateUser(data: any, ws: any){   
        const result = await this.controller.createUser(data);
        if(result === 0) {
            const res = new MakeOk();
            console.log(res);
            ws.send(JSON.stringify(res));
            this.sendPlayServer(res, result);
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
            const res = new LoginOK();
            ws.send(JSON.stringify(res));
            this.sendPlayServer(res, result);
        }
    }

    // プレイサーバーに伝達
    sendPlayServer(req: any, userId: number){
        const user_data  = new UserData();
        user_data.user_id = req.user_id;
        user_data.id = userId;				
        this.socket.emit("user_login", user_data);
    }
}