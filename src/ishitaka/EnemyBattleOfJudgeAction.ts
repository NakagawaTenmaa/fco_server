/**
 * @fileoverview 敵戦闘行動判定更新の実装ファイル
 * @file EnemyBattleOfJudgeAction.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */
import {EnemyBattleUpdate,EnemyBattleUpdateMode} from './EnemyBattleUpdate'
import {EnemyUpdateOfBattle} from './EnemyUpdateOfBattle'

/**
 * 敵戦闘行動判定更新
 * @export
 * @class EnemyBattleOfJudgeAction
 * @implements {EnemyBattleUpdate}
 */
export class EnemyBattleOfJudgeAction implements EnemyBattleUpdate{
    /**
     * モード
     * @public
     * @readonly
     * @type {EnemyBattleUpdateMode}
     * @memberof EnemyBattleOfJudgeAction
     */
    public readonly mode : EnemyBattleUpdateMode = EnemyBattleUpdateMode.JudgeAction;
    /**
     * 敵戦闘更新
     * @public
     * @readonly
     * @type {EnemyUpdateOfBattle}
     * @memberof EnemyBattleOfJudgeAction
     */
    private readonly battle_ : EnemyUpdateOfBattle;
    /**
     * 次の行動が移動かどうか?
     * @private
     * @type {boolean}
     * @memberof EnemyBattleOfJudgeAction
     */
    private isNextMoveOfButtleAction_ : boolean;


    /**
     * コンストラクタ
     * @public
     * @param {EnemyUpdateOfBattle} _battle 敵戦闘更新
     * @memberof EnemyUpdateOfNormal
     */
    public constructor(_battle:EnemyUpdateOfBattle){
        this.battle_ = _battle;
        this.isNextMoveOfButtleAction_ = true;
    }

    /**
     * 変更された
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyBattleOfJudgeAction
     */
    public HasChanged() : boolean {
        this.isNextMoveOfButtleAction_ = true;
        return true;
    }
    /**
     * 変更される
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyBattleOfJudgeAction
     */
    public OnChange() : boolean {
        return true;
    }
    /**
     * 更新処理
     * @public
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof EnemyBattleOfJudgeAction
     */
    public Update(_elapsedTime:number) : boolean {
        // 各行動ポイントの計算
        const movePoint:number = this.CalculateBattleMovePoint();
        const useSkillPoint:number = this.CalculateBattleUseSkillPoint();

        // 点数が一番高い行動をする
        if(movePoint < useSkillPoint){
            this.isNextMoveOfButtleAction_ = true;
            // スキルスタンバイへ
            this.battle_.updater.ChangeMode(EnemyBattleUpdateMode.SkillStandby);
        }
        else{
            this.isNextMoveOfButtleAction_ = false;
            // 移動へ
            this.battle_.updater.ChangeMode(EnemyBattleUpdateMode.Move);
        }

        return true;
    }

    /**
     * 戦闘行動ポイントの計算
     * @private
     * @returns {number} 戦闘行動ポイント
     * @memberof EnemyBattleOfJudgeAction
     */
    private CalculateBattleMovePoint() : number {
        // TODO:
        return (this.isNextMoveOfButtleAction_ ? 1 : 0);
    }
    /**
     * 戦闘スキル使用ポイントの計算
     * @private
     * @returns {number} 戦闘スキル使用ポイント
     * @memberof EnemyBattleOfJudgeAction
     */
    private CalculateBattleUseSkillPoint() : number {
        // TODO:
        return (this.isNextMoveOfButtleAction_ ? 0 : 1);
    }
}
