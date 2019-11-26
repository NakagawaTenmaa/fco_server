import { BaseModel } from './modelBase'
import { EnemyTribeData } from '../ishitaka/DatabaseAccessors/EnemyTribeDataAccessor';

// 敵のモデル
export class EnemyModel extends BaseModel{
    static TABLE_NAME = 'enemys';

    // 敵の一覧の取得 連想配列を返す
    public static async getEnemyList(): Promise<EnemyTribeData[]>{
        const enemyModel = await EnemyModel.findAll();
        let enemys: Array<EnemyTribeData> = [];
        enemyModel.forEach((_enemy: any) => {
            enemys.push(new EnemyTribeData(
                _enemy.name,
                0,
                0,
                _enemy.model_id,
                _enemy.hp,
                _enemy.mp,
                _enemy.str,
                _enemy.vit,
                _enemy.int,
                _enemy.mnd,
                _enemy.dex,
                _enemy.agi
            ));
        })

        enemys.forEach(element => {
            console.log(element);
        });
       return enemys;
    }
}