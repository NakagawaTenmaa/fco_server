import {findUsersByName, createUserModel} from '../model/userModel';
import { Server } from 'ws';
import io from 'socket.io-client';
import {IsThere, MakeOk, DuplicateLogin, NotUser, LoginOK, UserData} from '../model/packet';
import { createHash } from '../controller/utility/hash';

//import * as  player from ''



const socket: SocketIOClient.Socket = io('http://localhost:10001');
const wss: Server = new Server({port: 8000});

// 更新
export function loginUpdate(){
    console.log("login server open");
    socket.on('connect', () => {
        wss.on('connection', (ws) => {
            ws.on('message', (msg: any) => {
                let json = JSON.parse(msg);
                switch(json.command){
                    // ユーザーの作成
                    case 101: ReultCreateUser(json, ws); break;
                    // ユーザーのログイン
                    case 102: ResuktLoginUser(json, ws); break;
                }
            })  
        })
    })
}

// ユーザーの作成
async function CreateUser(data: any): Promise<number>{
    try {
        const model = await createUserModel(data.user_name, data.pass);
        console.log(model);
        return 0;
    } catch (e){
        console.log(e);
        return -1;
    }
}

// 作成の結果報告
async function ReultCreateUser(data: any, ws: any){   
    const result = await CreateUser(data);
    if(result === 0) {
        const res = new MakeOk();
        console.log(res);
        ws.send(JSON.stringify(res));
        SendPlayServer(res, result);
    }
    else if(result === -1) {
        const res = new IsThere();
        console.log(res);
        ws.send(JSON.stringify(res));
    }
}

// ログインの結果報告
async function ResuktLoginUser(data: any, ws: any){
    const result = await LoginUser(data);
    if(result === -1) ws.send(JSON.stringify(new DuplicateLogin()));
    else if(result === -2) ws.send(JSON.stringify(new NotUser()));
    else {
        const res = new LoginOK();
        ws.send(JSON.stringify(res));
        SendPlayServer(res, result);
    }
}

// ユーザーのログイン (ユーザーID : 正常終了) (-1 : 重複ログイン) (-2 : 間違えてまっせ)
async function LoginUser(data: any): Promise<number>{
    const userData = await findUsersByName(data.user_name);
    const user = userData[0];
    if(user){
        const hash = await createHash(data.pass, user.salt);
        if(hash === user.hash) return user.id;
        return -1;
    } return -2;
}

// プレイサーバーに伝達
function SendPlayServer(req: any, userId: number){
    const user_data  = new UserData();
    user_data.user_id = req.user_id;
    user_data.id = userId;				
    socket.emit("user_login", user_data);
}