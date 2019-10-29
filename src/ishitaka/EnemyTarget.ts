/**
 * @fileoverview 敵ターゲットの実装ファイル
 * @file EnemyTarget.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

 import {Character} from './Character'

export class EnemyTarget{
    /**
     * キャラクタ
     * @private
     * @type {Character}
     * @memberof EnemyTarget
     */
    private character_ : Character;
    /**
     * キャラクタ
     * @public
     * @readonly
     * @type {Character}
     * @memberof EnemyTarget
     */
    public get character() : Character {
        return this.character_;
    }
    /**
     * ヘイト
     * @private
     * @type {number}
     * @memberof EnemyTarget
     */
    private hate_ : number;
    /**
     * ヘイト
     * @public
     * @type {number}
     * @memberof EnemyTarget
     */
    public get hate() : number {
        return this.hate_;
    }
    public set hate(_hate:number){
        this.hate_ = (_hate < 0.0) ? (0.0) : (_hate);
    }


    /**
     * コンストラクタ
     * @public
     * @constructor
     * @param {Character} _character キャラクタ
     * @memberof EnemyTarget
     */
    public constructor(_character:Character){
        this.character_ = _character;
        this.hate_ = 0;
    }
} 
