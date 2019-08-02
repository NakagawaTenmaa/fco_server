import {createConnection} from 'mysql';

export const connection: any = createConnection({
    host     : 'localhost',
    user     : 'tenko',
    database : 'mmo_rpg',
    password : 'tenko117'
});