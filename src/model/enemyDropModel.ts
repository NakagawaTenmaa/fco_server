import { BaseModel } from "./modelBase";
import { EnemyDrop } from './../controller/object/enemyDrop';

/**
 * 敵のドロップモデル
 * @class EnemyDrop
 * @extends {BaseModel}
 */
export class EnemyDropModel extends BaseModel{

    /**
     *Creates an instance of EnemyDrop.
     * @memberof EnemyDropModel
     */
    constructor(){
        super('enemy_drop');
    }


    /**
     * アイテムのリストの作成
     * @memberof EnemyDrop
     */
    public async createItems(_enemyId: number): Promise<EnemyDrop>{
        // データの取得
        const data: any = await this.find(["enemy_id",_enemyId]);
        
        const items: EnemyDrop = new EnemyDrop();
        items.addItem(data[0].drop1);
        items.addItem(data[0].drop2);
        items.addItem(data[0].drop3);
        items.addItem(data[0].drop4);
        items.addItem(data[0].drop5);
        items.addItem(data[0].drop6);
        items.addItem(data[0].drop7);
        items.addItem(data[0].drop8);
        items.addItem(data[0].drop9);
        return items;
    }
}

