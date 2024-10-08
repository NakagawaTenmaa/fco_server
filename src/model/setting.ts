//import {createConnection, Connection} from 'mysql';
import { createConnection, Connection } from 'promise-mysql'

export async function connection(): Promise<Connection>{
    return await createConnection({
        host     : 'localhost',
        port     : 3306,
        user     : 'root',
        database : 'fco',
        password : 'root'
    });
}