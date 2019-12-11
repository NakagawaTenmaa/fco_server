import { BaseModel } from "./modelBase";
import { DropItemData } from './../controller/DatabaseAccessors/DropItemAccessor';

/**
 * 敵のドロップモデル
 * @class EnemyDrop
 * @extends {BaseModel}
 */
export class EnemyDropModel extends BaseModel{
    static TABLE_NAME = "enemy_drops";

    /**
     * アイテムのリストの作成
     * @memberof EnemyDrop
     */
    public static async createItemsTable(): Promise<DropItemData[]>{
        // データの取得
        const data = await this.findAll();

        let itemTable: DropItemData[] = [];
        data.forEach((_data: any) => {
            const itemIds = JSON.parse(_data.items);
            let item: DropItemData = new DropItemData(
                _data.id,
                itemIds.id
            );
            console.log(item.items);
            console.log(item.id);

            itemTable.push(item);
        })        
        return itemTable;
    }
}

