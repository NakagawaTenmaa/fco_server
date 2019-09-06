import {connection} from './model/setting';
import {loginUpdate} from './router/loginController';
import {playUpdate, serverSocUpdate} from './router/playController';
import { chatUpdate } from './router/chatController'

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