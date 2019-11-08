/**
 * @fileoverview 敵更新者の実装ファイル
 * @file EnemyUpdate.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */
import {EnemyUpdate,EnemyUpdateMode} from './EnemyUpdate'
import {EnemyUpdateOfNormal} from './EnemyUpdateOfNormal'
import {EnemyUpdateOfBattle} from './EnemyUpdateOfBattle'
import {EnemyUpdateOfDead} from './EnemyUpdateOfDead'
import {Enemy} from './Enemy'

/**
 * 敵更新者
 * @export
 * @class EnemyUpdater
 */
export class EnemyUpdater{
    /**
     * 通常状態
     * @private
     * @readonly
     * @type {EnemyUpdateOfNormal}
     * @memberof EnemyUpdater
     */
    private readonly normal_ : EnemyUpdateOfNormal;
    /**
     * 戦闘状態
     * @private
     * @readonly
     * @type {EnemyUpdateOfBattle}
     * @memberof EnemyUpdater
     */
    private readonly battle_ : EnemyUpdateOfBattle;
    /**
     * 戦闘状態
     * @public
     * @readonly
     * @type {EnemyUpdateOfBattle}
     * @memberof EnemyUpdater
     */
    public get battleState() : EnemyUpdateOfBattle {
        return this.battle_;
    }
    /**
     * 死亡状態
     * @private
     * @readonly
     * @type {EnemyUpdateOfDead}
     * @memberof EnemyUpdater
     */
    private readonly dead_ : EnemyUpdateOfDead;
    /**
     * 現在の状態
     * @private
     * @type {EnemyUpdate}
     * @memberof EnemyUpdater
     */
    private currentState_ : EnemyUpdate;
    /**
     * 現在の状態
     * @public
     * @readonly
     * @type {EnemyUpdate}
     * @memberof EnemyUpdater
     */
    public get currentState() : EnemyUpdate {
        return this.currentState_;
    }


    /**
     * コンストラクタ
     * @public
     * @param {Enemy} _enemy 敵情報
     * @memberof EnemyUpdater
     */
    public constructor(_enemy:Enemy){
        this.normal_ = new EnemyUpdateOfNormal(_enemy);
        this.battle_ = new EnemyUpdateOfBattle(_enemy);
        this.dead_ = new EnemyUpdateOfDead(_enemy);
        this.currentState_ = this.normal_;
        if(!(this.currentState_.HasChanged())){
            console.error("error!! [EnemyUpdater.constructor()]");
        }
    }

    /**
     * 状態切り替え
     * @public
     * @param {EnemyUpdateMode} _nextMode 切り換え後の状態
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyUpdater
     */
    public ChangeMode(_nextMode:EnemyUpdateMode) : boolean {
        if(!(this.currentState_.OnChange())){
            return false;
        }

        switch(_nextMode){
            case EnemyUpdateMode.Normal:
            {
                this.currentState_ = this.normal_;
                break;
            }

            case EnemyUpdateMode.Battle:
            {
                this.currentState_ = this.battle_;
                break;
            }

            case EnemyUpdateMode.Dead:
            {
                this.currentState_ = this.dead_;
                break;
            }

            default:
                return false;
        }

        if(!(this.currentState_.HasChanged())){
            return false;
        }
        return true;
    }
}
