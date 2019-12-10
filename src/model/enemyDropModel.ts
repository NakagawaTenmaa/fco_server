import { BaseModel } from "./modelBase";
import { DropItemData } from './../controller/DatabaseAccessors/DropItemAccessor';

/**
 * 敵のドロップモデル
 * @class EnemyDrop
 * @extends {BaseModel}
 */
export class EnemyDropModel extends BaseModel{
    static TABLE_NAME = "enemy_drop";

    /**
     * アイテムのリストの作成
     * @memberof EnemyDrop
     */
    public static async createItemsTable(): Promise<DropItemData[]>{
        // データの取得
        const data = await this.findAll();

        let itemTable: DropItemData[] = [];
        data.forEach((_data: any) => {
            let item: DropItemData = new DropItemData(
                _data.id,
                JSON.parse(_data.items),
                _data.enemyId
            );
            itemTable.push(item);
        })        
        return itemTable;
    }
}

