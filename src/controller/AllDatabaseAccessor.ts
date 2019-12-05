
/**
 * @fileoverview 全てのデータベースアクセサーの実装ファイル
 * @file AllDatabaseAccessor.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */
import { EnemyTribeDataAccessor } from "./DatabaseAccessors/EnemyTribeDataAccessor";
import { EnemyPopAreaDataAccessor } from "./DatabaseAccessors/EnemyPopAreaDataAccessor";
import { JobDataAccessor } from "./DatabaseAccessors/JobDataAccessor";
import { WeaponDataAccessor } from "./DatabaseAccessors/WeaponDataAccessor";
import { ArmorDataAccessor } from "./DatabaseAccessors/ArmorAccessor";
import { OrnamentDataAccessor } from "./DatabaseAccessors/OrnamentAccessor";
import { ItemDataAccessor } from "./DatabaseAccessors/ItemAccessor";
import { SkillDataAccessor } from "./DatabaseAccessors/SkillDataAccessor";

 /**
 * 全てのデータベースアクセサー
 * @export
 * @namespace AllDatabaseAccessor
 */
export namespace AllDatabaseAccessor{
    /**
     * 初期化
     * @export
     * @returns {Promise<boolean>} true:成功 false:失敗
     */
    export async function Initialize() : Promise<boolean> {
        const results : boolean[] = await Promise.all([
            EnemyTribeDataAccessor.instance.Load(),
            EnemyPopAreaDataAccessor.instance.Load(),
            JobDataAccessor.instance.Load(),
            WeaponDataAccessor.instance.Load(),
            ArmorDataAccessor.instance.Load(),
            OrnamentDataAccessor.instance.Load(),
            ItemDataAccessor.instance.Load(),
            SkillDataAccessor.instance.Load()
        ]);

        let isSuccess:boolean = true;
        results.every(function (
            _result : boolean,
            _index : number,
            _array : boolean[]
        ) : boolean {
            isSuccess = isSuccess && _result;
            return _result;
        });
        return isSuccess;
    }
}
