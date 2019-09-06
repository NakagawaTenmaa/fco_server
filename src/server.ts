import {connection} from './model/setting';
import {loginUpdate} from './controller/loginController';
import {playUpdate, serverSocUpdate} from './controller/playController';
import { chatUpdate } from './controller/chatController'

// DBの接続
//const conn = connection().connect();
//connection.connect();

// 更新処理
// ログインサーバー
loginUpdate();

// プレイサーバー
playUpdate();
serverSocUpdate();

// チャット
chatUpdate();

// 終了処理
process.on("SIGINT", async () => {
    const conn = await connection();
    await conn.end();
    process.exit(0);
})