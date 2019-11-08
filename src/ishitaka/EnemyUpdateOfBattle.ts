/**
 * @fileoverview 敵戦闘更新の実装ファイル
 * @file EnemyUpdateOfBattle.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */
import {EnemyUpdate,EnemyUpdateMode} from './EnemyUpdate'
import {Enemy} from './Enemy'
import {EnemyBattleUpdater} from './EnemyBattleUpdater'
import {EnemyBattleUpdateMode} from './EnemyBattleUpdate'

/**
 * 敵戦闘更新
 * @export
 * @class EnemyUpdateOfBattle
 * @implements {EnemyUpdate}
 */
export class EnemyUpdateOfBattle implements EnemyUpdate{
    /**
     * モード
     * @public
     * @readonly
     * @type {EnemyUpdateMode}
     * @memberof EnemyUpdateOfBattle
     */
    public readonly mode : EnemyUpdateMode = EnemyUpdateMode.Battle;
    /**
     * 敵情報
     * @private
     * @readonly
     * @type {Enemy}
     * @memberof EnemyUpdateOfBattle
     */
    private readonly enemy_ : Enemy;
    /**
     * 敵情報
     * @public
     * @readonly
     * @type {Enemy}
     * @memberof EnemyUpdateOfBattle
     */
    public get enemy() : Enemy {
        return this.enemy_;
    }
    /**
     * 戦闘更新者
     * @private
     * @readonly
     * @type {EnemyBattleUpdater}
     * @memberof EnemyUpdateOfBattle
     */
    private readonly battleUpdater_ : EnemyBattleUpdater;
    /**
     * 戦闘更新者
     * @public
     * @readonly
     * @type {EnemyBattleUpdater}
     * @memberof EnemyUpdateOfBattle
     */
    public get updater() : EnemyBattleUpdater {
        return this.battleUpdater_;
    }
    /**
     * 現在の戦闘モード
     * @public
     * @readonly
     * @type {EnemyBattleUpdateMode}
     * @memberof EnemyUpdateOfBattle
     */
    public get currentBattleMode() : EnemyBattleUpdateMode {
        return this.battleUpdater_.currentState.mode;
    }


    /**
     * コンストラクタ
     * @public
     * @param {Enemy} _enemy
     * @memberof EnemyUpdateOfBattle
     */
    public constructor(_enemy:Enemy){
        this.enemy_ = _enemy;
        this.battleUpdater_ = new EnemyBattleUpdater(this);
    }

    /**
     * 変更された
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyUpdateOfBattle
     */
    public HasChanged() : boolean {
        return true;
    }
    /**
     * 変更される
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyUpdateOfBattle
     */
    public OnChange() : boolean {
        return true;
    }
    /**
     * 更新処理
     * @public
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof EnemyUpdateOfBattle
     */
    public Update(_elapsedTime:number) : boolean {
        return true;
    }
}
