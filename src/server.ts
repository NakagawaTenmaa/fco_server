import { connection } from './model/setting';
import { loginRouter } from './router/loginRouter';
import { playRouter } from './router/playRouter';
import { chatUpdate } from './router/chatRouter'
import { AllDatabaseAccessor } from './controller/AllDatabaseAccessor';

async function Root() {
    try{
        await AllDatabaseAccessor.Initialize();

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
            await play.end();
            process.exit(0);
        });
    } catch (_errorMessage){
        // 例外発生
        console.error("Has catched exception.");
        console.log("End execution.");
    }
}

Root();
