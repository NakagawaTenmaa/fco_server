//import {createConnection, Connection} from 'mysql';
import { createConnection, Connection } from 'promise-mysql'

export async function connection(): Promise<Connection>{
    return await createConnection({
        host     : 'localhost',
        user     : 'tenko',
        database : 'mmo_rpg',
        password : 'tenko117'
    });
}