import { BaseModel } from './modelBase'
import { EnemyTribeData } from '../ishitaka/DatabaseAccessors/EnemyTribeDataAccessor';

// 敵のモデル
export class EnemyModel extends BaseModel{
    // コンストラクタ
    constructor(){
        super('enemys');
    }

    
    /**
     * 敵のマスターデータ
     * @returns {Promise<EnemyTribeData[]>}
     * @memberof EnemyModel
     */
    public async getEnemyList(): Promise<EnemyTribeData[]>{
        const enemy = await this.findAll();
        let enemys: Array<EnemyTribeData> = [];
        enemy.forEach((_enemy: any) => { 
            enemys.push(new EnemyTribeData(
                _enemy.name,0,_enemy.model_id,_enemy.ho,_enemy.mp,_enemy.str,_enemy.vit,_enemy.int,_enemy.mnd,_enemy.dex,_enemy.agi
            )); 
        });

        return enemys;        
    }
}