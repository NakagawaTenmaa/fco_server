import {SelectNameModel, CreateUserModel} from './../model/userModel';
import {CreateHash, CreateSalt} from './utility/hash';
import {Server} from 'ws';
import io from 'socket.io-client';
import {IsThere, MakeOk, DuplicateLogin, NotUser, LoginOK} from './../model/packet';

const socket: SocketIOClient.Socket = io('http://localhost:10001');
const wss: Server = new Server({port: 8000});

// 更新
export function loginUpdate(){
    console.log("login server open");
        //socket.on('connect', () => {
        wss.on('connection', (ws) => {
            ws.on('message', (msg: any) => {
                let json = JSON.parse(msg);
                switch(json.command){
                    // ユーザーの作成
                    case 101: CreateUser(json, (result: number) => { ReultCreateUser(result, ws) }); break;
                    // ユーザーのログイン
                    case 102: LoginUser(json, (result: any) => { ResuktLoginUser(result, ws) }); break;
                }
            })  
        })
    //})
}

// ユーザーの作成
async function CreateUser(data: any, callback: (result: number) => void){
    try {
        const salt = await CreateSalt();
        const hash = await CreateHash(data.pass, salt);
        CreateUserModel(data.user_name, hash, salt,(err: any) => {
           callback(err);
        });
    } catch {
        callback(-1);
    }
}

// 作成の結果報告
function ReultCreateUser(result: number, ws: any){   
    if(result === 0) {
        const res = new MakeOk();
        console.log(res);
        ws.send(JSON.stringify(res));
        SendPlayServer(res);
    }
    else if(result === -1) {
        const res = new IsThere();
        console.log(res);
        ws.send(JSON.stringify(res));
    }
}

// ログインの結果報告
function ResuktLoginUser(result: number, ws: any){
    if(result === -1) {
        const res = new DuplicateLogin();
        ws.send(JSON.stringify(res));
    } else if(result === -2){
        const res = new NotUser();
        ws.send(JSON.stringify(res));
    } else {
        const res = new LoginOK();
        ws.send(JSON.stringify(res));
        SendPlayServer(res);
    }
}

// ユーザーのログイン (ユーザーID : 正常終了) (-1 : 重複ログイン) (-2 : 間違えてまっせ)
function LoginUser(data: any, callback: (result: number) => void){
    SelectNameModel(data.user_name, async (modelData) => {
        if(modelData.length === 0){
            callback(-2);
        } else {
            const hash = await CreateHash(data.pass,modelData[0].salt);
            if(hash === modelData[0].hash) {
                if(modelData[0].status === 0){
                    callback(modelData[0].user_id);
                    return;
                }
                callback(-1);
            }
        }
    });
}

// プレイサーバーに伝達
function SendPlayServer(id: MakeOk){

}