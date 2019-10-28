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
        const data: any = this.find(["enemy_id",_enemyId]);
        
        const items: EnemyDrop = new EnemyDrop();
        items.addItem(data.drop1);
        items.addItem(data.drop2);
        items.addItem(data.drop3);
        items.addItem(data.drop4);
        items.addItem(data.drop5);
        items.addItem(data.drop6);
        items.addItem(data.drop7);
        items.addItem(data.drop8);
        items.addItem(data.drop9);
        return items;
    }
}

