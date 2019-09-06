import {connection} from './model/setting';
import { loginRouter } from './router/loginRouter';
import {playUpdate, serverSocUpdate} from './router/playRouter';
import { chatUpdate } from './router/chatRouter'

// ルートの作成
const login: loginRouter = new loginRouter();

// サーバーの処理
login.loginUpdate();
playUpdate();
serverSocUpdate();
chatUpdate();

// 終了処理
process.on("SIGINT", async () => {
    const conn = await connection();
    await conn.end();
    process.exit(0);
})