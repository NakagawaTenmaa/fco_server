import { connection } from './model/setting';
import { loginRouter } from './router/loginRouter';
import { playRouter } from './router/playRouter';
import { chatUpdate } from './router/chatRouter'
import { AllDatabaseAccessor } from './ishitaka/AllDatabaseAccessor';

AllDatabaseAccessor.Initialize();

// ルートの作成
const login: loginRouter = new loginRouter();
const play: playRouter = new playRouter();


// サーバーの処理
login.loginUpdate();
play.playUpdate();
setInterval(play.characterUpdate, 1000 / 60);
chatUpdate();

// 終了処理
process.on("SIGINT", async () => {
    const conn = await connection();
    try {await conn.end();} catch(e){ console.log('not open mysql'); }
    process.exit(0);
})