/**
 * @fileoverview 敵死亡更新の実装ファイル
 * @file EnemyUpdateOfDead.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */
import {EnemyUpdate,EnemyUpdateMode} from './EnemyUpdate'
import {Enemy} from './Enemy'

/**
 * 敵死亡更新
 * @export
 * @class EnemyUpdateOfDead
 * @implements {EnemyUpdate}
 */
export class EnemyUpdateOfDead implements EnemyUpdate{
    /**
     * リポップインターバル
     * @private
     * @static
     * @type {number}
     * @memberof EnemyUpdateOfDead
     */
    private static readonly repopulateInterval_ : number = 3000.0;

    /**
     * モード
     * @public
     * @readonly
     * @type {EnemyUpdateMode}
     * @memberof EnemyUpdateOfDead
     */
    public readonly mode : EnemyUpdateMode = EnemyUpdateMode.Dead;
    /**
     * 敵情報
     * @private
     * @readonly
     * @type {Enemy}
     * @memberof EnemyUpdateOfDead
     */
    private readonly enemy_ : Enemy;
    /**
     * 敵情報
     * @public
     * @readonly
     * @type {Enemy}
     * @memberof EnemyUpdateOfDead
     */
    public get enemy() : Enemy {
        return this.enemy_;
    }
    /**
     * 待機時間
     * @private
     * @type {number}
     * @memberof EnemyUpdateOfDead
     */
    private waitTime_ : number;


    /**
     * コンストラクタ
     * @public
     * @param {Enemy} _enemy
     * @memberof EnemyUpdateOfDead
     */
    public constructor(_enemy:Enemy){
        this.enemy_ = _enemy;
        this.waitTime_ = 0.0;
    }

    /**
     * 変更された
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyUpdateOfDead
     */
    public HasChanged() : boolean {
        return true;
    }
    /**
     * 変更される
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyUpdateOfDead
     */
    public OnChange() : boolean {
        return true;
    }
    /**
     * 更新処理
     * @public
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof EnemyUpdateOfDead
     */
    public Update(_elapsedTime:number) : boolean {
        this.waitTime_ -= _elapsedTime;
        if(this.waitTime_ < 0){
            this.enemy_.Populate();
            this.enemy_.updater.ChangeMode(EnemyUpdateMode.Normal);
            return true;
        }
        return true;
    }
}
