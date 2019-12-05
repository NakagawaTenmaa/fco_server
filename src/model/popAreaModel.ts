import { BaseModel } from "./modelBase";
import { EnemyPopAreaData } from "../controller/DatabaseAccessors/EnemyPopAreaDataAccessor";

/**
 * 敵のポップモデル
 * @export
 * @class PopAreaModel
 * @extends {BaseModel}
 */
export class PopAreaModel extends BaseModel{
    static TABLE_NAME = "enemy_pop_area";

        // ポップエリアを返す
        public static async getPopArea(): Promise<EnemyPopAreaData[]>{
            const model = await PopAreaModel.findAll();
            let popArea: Array<EnemyPopAreaData> = [];
            model.forEach((_popArea: any) => {
                popArea.push(new EnemyPopAreaData(
                    _popArea.map_id,
                    _popArea.x, _popArea.y, _popArea.z,
                    _popArea.poparea,
                    _popArea.enemy_move_area,
                    _popArea.enemy_max,
                    _popArea.enemy_type_a, _popArea.enemy_max_a,
                    _popArea.enemy_type_b, _popArea.enemy_max_b,
                    _popArea.enemy_type_c, _popArea.enemy_max_c
                ));
            })

            return popArea;
        }
}

