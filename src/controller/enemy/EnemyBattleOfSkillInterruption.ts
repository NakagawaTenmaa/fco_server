/**
 * @fileoverview 敵戦闘スキル中断更新の実装ファイル
 * @file EnemyBattleOfSkillInterruption.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */
import {EnemyBattleUpdate,EnemyBattleUpdateMode} from './EnemyBattleUpdate'
import {EnemyUpdateOfBattle} from './EnemyUpdateOfBattle'

/**
 * 敵戦闘スキル中断更新
 * @export
 * @class EnemyBattleOfSkillInterruption
 * @implements {EnemyBattleUpdate}
 */
export class EnemyBattleOfSkillInterruption implements EnemyBattleUpdate{
    /**
     * スキル中断インターバル
     * @private
     * @static
     * @type {number}
     * @memberof Enemy
     */
    private static readonly skillInterruptInterval_ : number = 500.0;

    /**
     * モード
     * @public
     * @readonly
     * @type {EnemyBattleUpdateMode}
     * @memberof EnemyBattleOfSkillInterruption
     */
    public readonly mode : EnemyBattleUpdateMode = EnemyBattleUpdateMode.SkillInterruption;
    /**
     * 敵戦闘更新
     * @public
     * @readonly
     * @type {EnemyUpdateOfBattle}
     * @memberof EnemyBattleOfSkillInterruption
     */
    private readonly battle_ : EnemyUpdateOfBattle;
    /**
     * 待機時間
     * @private
     * @type {number}
     * @memberof EnemyBattleOfMove
     */
    private waitTime_ : number;


    /**
     * コンストラクタ
     * @public
     * @param {EnemyUpdateOfBattle} _battle 敵戦闘更新
     * @memberof EnemyUpdateOfNormal
     */
    public constructor(_battle : EnemyUpdateOfBattle){
        this.battle_ = _battle;
        this.waitTime_ = 0.0;
    }

    /**
     * 変更された
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyBattleOfSkillInterruption
     */
    public HasChanged() : boolean {
        this.waitTime_ = EnemyBattleOfSkillInterruption.skillInterruptInterval_;
        return true;
    }
    /**
     * 変更される
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyBattleOfSkillInterruption
     */
    public OnChange() : boolean {
        return true;
    }
    /**
     * 更新処理
     * @public
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof EnemyBattleOfSkillInterruption
     */
    public Update(_elapsedTime:number) : boolean {
        this.waitTime_ -= _elapsedTime;
        if(this.waitTime_ < 0){
            // 行動選択ヘ
            this.battle_.updater.ChangeMode(EnemyBattleUpdateMode.JudgeAction);
            return true;
        }
        return true;
    }
}
