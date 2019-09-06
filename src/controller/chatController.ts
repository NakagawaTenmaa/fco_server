//
// chatController.ts
//

import {Server} from 'ws';
import {ChatData} from './../model/packet';

const wss: Server = new Server({port: 8009});

// 自身以外のユーザーにメッセージを送信する
// TODO: 自身にはメッセージを送らない
// TODO: 入力文字の判別（1~26文字、環境文字の除外）
function sendMessage(data: any){

    const res = new ChatData(data.user_name, data.message);
    //console.log(data.user_name);
    //console.log(data.message);
    wss.clients.forEach((client)=>{
        client.send(JSON.stringify(res));
    });
}

// チャット更新処理
export function chatUpdate(){
    wss.on('connection', (ws: any) => {
        console.log("client_connection");
        ws.on('message', (msg: any) => {
            console.log('msg : ' + msg);
            let json = JSON.parse(msg);
            switch(json.command){
                case 801:
                    sendMessage(json);
                    break;
            }
        })
    })
}