import { BaseModel } from './modelBase'

// 敵のモデル
export class EnemyModel extends BaseModel{
    // コンストラクタ
    constructor(){
        super('enemys');
    }

    // 敵の一覧の取得 連想配列を返す
    public async getEnemyList(): Promise<any>{
        const enemy = await this.findAll();
        let enemys: {[key: string]: any} = {};
        enemy.forEach((_enemy: any) => { 
            enemys[_enemy.id.toString()] = {
                name:       _enemy.name,
                hp:         _enemy.hp,
                mp:         _enemy.mp,
                str:        _enemy.str,
                vit:        _enemy.vit,
                int:        _enemy.int,
                mnd:        _enemy.mnd,
                dex:        _enemy.dex,
                agi:        _enemy.agi,
                model_id:   _enemy.model_id
            }; 
        });
        console.log(enemys);
        return enemys;
    }
}