
/**
 * @fileoverview 敵ポップ範囲の実装ファイル
 * @file EnemyPopArea.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import { EnemyPopAreaData } from "../DatabaseAccessors/EnemyPopAreaDataAccessor";

/**
 * 敵ポップ範囲
 * @export
 * @class EnemyPopArea
 */
export class EnemyPopArea{
    /**
     * データ
     * @private
     * @type {EnemyPopAreaData}
     * @memberof EnemyPopArea
     */
    private data_ : EnemyPopAreaData;
    /**
     * データ
     * @public
     * @readonly
     * @type {EnemyPopAreaData}
     * @memberof EnemyPopArea
     */
    public get data() : EnemyPopAreaData {
        return this.data_;
    }
    /**
     * 敵1ポップ数
     * @private
     * @type {number}
     * @memberof EnemyPopArea
     */
    private popEnemy1Count_ : number;
    /**
     * 敵2ポップ数
     * @private
     * @type {number}
     * @memberof EnemyPopArea
     */
    private popEnemy2Count_ : number;
    /**
     * 敵3ポップ数
     * @private
     * @type {number}
     * @memberof EnemyPopArea
     */
    private popEnemy3Count_ : number;
    /**
     * 敵のポップ数合計
     * @private
     * @readonly
     * @type {number}
     * @memberof EnemyPopArea
     */
    private get popEnemyCount() : number {
        return (
            this.popEnemy1Count_ +
            this.popEnemy2Count_ +
            this.popEnemy3Count_
        );
    }
    /**
     * 敵がポップできるか
     * @type {boolean}
     * @memberof EnemyPopArea
     */
    public get isPopEnemy() : boolean {
        return (this.popEnemyCount < this.data.maxPopEnemyCount);
    }
    /**
     * 敵1がポップできるか
     * @type {boolean}
     * @memberof EnemyPopArea
     */
    public get isPopEnemy1() : boolean {
        if(this.isPopEnemy){
            return (this.popEnemy1Count_ < this.data.popEnemy1MaxCount);
        }
        return false;
    }
    /**
     * 敵2がポップできるか
     * @type {boolean}
     * @memberof EnemyPopArea
     */
    public get isPopEnemy2() : boolean {
        if(this.isPopEnemy){
            return (this.popEnemy2Count_ < this.data.popEnemy2MaxCount);
        }
        return false;
    }
    /**
     * 敵3がポップできるか
     * @type {boolean}
     * @memberof EnemyPopArea
     */
    public get isPopEnemy3() : boolean {
        if(this.isPopEnemy){
            return (this.popEnemy3Count_ < this.data.popEnemy3MaxCount);
        }
        return false;
    }


    /**
     * コンストラクタ
     * @public
     * @param {EnemyPopAreaData} _data データ
     * @memberof EnemyPopArea
     */
    public constructor(_data:EnemyPopAreaData){
        this.data_ = _data;
        this.popEnemy1Count_ = 0;
        this.popEnemy2Count_ = 0;
        this.popEnemy3Count_ = 0;
    }

    /**
     * データの変更
     * @public
     * @param {EnemyPopAreaData} _data データ
     * @memberof EnemyPopArea
     */
    public ChangeData(_data:EnemyPopAreaData) : void {
        this.data_ = _data;
    }

    /**
     * 敵がポップできるか
     * @public
     * @param {number} _enemyTribeId 敵の種族ID
     * @returns {boolean} true:出来る false:出来ない
     * @memberof EnemyPopArea
     */
    public IsPopEnemy(_enemyTribeId:number) : boolean {
        if(_enemyTribeId < 0){
            return false;
        }
        if(!(this.isPopEnemy)){
            return false;
        }

        if(_enemyTribeId == this.data.popEnemy1Id){
            return this.isPopEnemy1;
        }
        else if(_enemyTribeId == this.data.popEnemy2Id){
            return this.isPopEnemy2;
        }
        else if(_enemyTribeId == this.data.popEnemy3Id){
            return this.isPopEnemy3;
        }
        return false;
    }
    /**
     * 敵がポップした
     * @public
     * @param {number} _enemyTribeId 敵の種族ID
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyPopArea
     */
    public OnPopEnemy(_enemyTribeId:number) : boolean {
        if(_enemyTribeId < 0){
            console.error("Pop enemy tribe id can't be minus value.");
            return false;
        }
        if(!(this.isPopEnemy)){
            console.error("This pop area already have max count of enemies.");
            return false;
        }
        
        let isNotPop:boolean = false;
        if(_enemyTribeId == this.data.popEnemy1Id){
            if(this.isPopEnemy1){
                ++(this.popEnemy1Count_);
            }
            else{
                isNotPop = true;
            }
        }
        else if(_enemyTribeId == this.data.popEnemy2Id){
            if(this.isPopEnemy2){
                ++(this.popEnemy2Count_);
            }
            else{
                isNotPop = true;
            }
        }
        else if(_enemyTribeId == this.data.popEnemy3Id){
            if(this.isPopEnemy3){
                ++(this.popEnemy3Count_);
            }
            else{
                isNotPop = true;
            }
        }
        else{
            console.error("This enemy tribe id can't pop in this area.");
            return false;
        }

        if(isNotPop){
            console.error(
                "This pop area already have max count of enemy. [id:" +
                _enemyTribeId.toString() +
                "]"
            );
            return false;
        }
        return true;
    }

    /**
     * 敵が死んだ
     * @public
     * @param {number} _enemyTribeId 敵の種族ID
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyPopArea
     */
    public OnDeadEnemy(_enemyTribeId:number) : boolean {
        if(_enemyTribeId < 0){
            return false;
        }

        if(_enemyTribeId == this.data.popEnemy1Id){
            --(this.popEnemy1Count_);
        }
        else if(_enemyTribeId == this.data.popEnemy2Id){
            --(this.popEnemy2Count_);
        }
        else if(_enemyTribeId == this.data.popEnemy3Id){
            --(this.popEnemy3Count_);
        }
        else{
            return false;
        }
        return true;
    }
}
