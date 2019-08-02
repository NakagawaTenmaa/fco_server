import {connection} from './model/setting';
import {loginUpdate} from './controller/loginController';

// DBの接続
connection.connect();

// 更新処理
// ログインサーバー
loginUpdate();

// 終了処理
process.on("SIGINT", () => {
    connection.end();
    process.exit(0);
})