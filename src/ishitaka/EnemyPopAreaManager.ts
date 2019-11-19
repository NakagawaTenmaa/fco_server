/**
 * @fileoverview 敵ポップ範囲マネージャの実装ファイル
 * @file EnemyPopAreaManager.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {EnemyPopArea} from './EnemyPopArea'
import {EnemyPopAreaData, EnemyPopAreaDataAccessor} from './DatabaseAccessors/EnemyPopAreaDataAccessor'

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

        const useIdArray:Array<number> = new Array<number>();
        EnemyPopAreaDataAccessor.instance.dataArray.forEach(
            function (
                _data : EnemyPopAreaData,
                _id : number,
                _array : EnemyPopAreaData[]
            ) : void {
                if(_id in this_.areaArray_){
                    this_.areaArray_[_id].ChangeData(_data);
                }
                else{
                    this_.areaArray_[_id] = new EnemyPopArea(_data);
                }
                useIdArray.push(_id);
            }
        );

        this.areaArray_ = this.areaArray_.filter(
            function (
                _area : EnemyPopArea,
                _id : number,
                _array : EnemyPopArea[]
            ) : boolean {
                return (_id in useIdArray);
            }
        );
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
                _id : number,
                _array : EnemyPopArea[]
            ) : boolean {
                return _area.IsPopEnemy(_enemyTribeId);
            }
        );
    }
}
