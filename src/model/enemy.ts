import { BaseModel } from './modelBase'

// 敵のモデル
class EnemyModel extends BaseModel{
    // コンストラクタ
    constructor(){
        super('enemy');
    }

    // 敵の一覧の取得
    public async findAllModel(): Promise<any[]>{
        return await this.findAll();
    }
}