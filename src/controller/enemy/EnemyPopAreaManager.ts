/**
 * @fileoverview 敵ポップ範囲マネージャの実装ファイル
 * @file EnemyPopAreaManager.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {EnemyPopArea} from './EnemyPopArea'
import { EnemyPopAreaDataAccessor, EnemyPopAreaData } from '../DatabaseAccessors/EnemyPopAreaDataAccessor';

export class EnemyPopAreaManager{
    /**
     * シングルトンインスタンス
     * @private
     * @static
     * @type {EnemyPopAreaManager}
     * @memberof EnemyPopAreaManager
     */
    private static instance_ ?: EnemyPopAreaManager = undefined;
    /**
     * シングルトンインスタンス
     * @public
     * @static
     * @readonly
     * @type {EnemyPopAreaManager}
     * @memberof EnemyPopAreaManager
     */
    public static get instance() : EnemyPopAreaManager {
        if(EnemyPopAreaManager.instance_ === undefined){
            EnemyPopAreaManager.instance_ = new EnemyPopAreaManager();
        }
        return EnemyPopAreaManager.instance_;
    }


    /**
     * エリア配列
     * @private
     * @type {Array<EnemyPopArea>}
     * @memberof EnemyPopAreaManager
     */
    private areaArray_ : Array<EnemyPopArea>;


    /**
     * デフォルトコンストラクタ
     * @private
     * @memberof EnemyPopAreaManager
     */
    private constructor(){
        this.areaArray_ = new Array<EnemyPopArea>();
    }

    /**
     * リロード
     * @public
     * @memberof EnemyPopAreaManager
     */
    public ReloadData() : void {
        const this_:EnemyPopAreaManager = this;

        const useArray:Array<EnemyPopArea> = new Array<EnemyPopArea>();
        EnemyPopAreaDataAccessor.instance.dataArray.forEach((_data : EnemyPopAreaData) => {
                if(_data.id in this_.areaArray_){
                    this_.areaArray_[_data.id].ChangeData(_data);
                }
                else{
                    this_.areaArray_[_data.id] = new EnemyPopArea(_data);
                }
                useArray.push(new EnemyPopArea(_data));
            }
        );
        this.areaArray_ = useArray;
    }

    /**
     * ポップできるエリアを探す
     * @param {number} _enemyTribeId 敵の種族ID
     * @returns {Array<EnemyPopArea>} ポップできるエリアの配列
     * @memberof EnemyPopAreaManager
     */
    public FindPopAreaArray(_enemyTribeId:number) : Array<EnemyPopArea> {
        return this.areaArray_.filter(
            function (
                _area : EnemyPopArea,
            ) : boolean {
                return _area.IsPopEnemy(_enemyTribeId);
            }
        );
    }
}
