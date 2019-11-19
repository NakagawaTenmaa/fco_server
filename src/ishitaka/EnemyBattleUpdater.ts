/**
 * @fileoverview 敵更新者の実装ファイル
 * @file EnemyBattleUpdate.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */
import {EnemyBattleUpdate,EnemyBattleUpdateMode} from './EnemyBattleUpdate'
import {EnemyBattleOfJudgeAction} from './EnemyBattleOfJudgeAction'
import {EnemyBattleOfMove} from './EnemyBattleOfMove'
import {EnemyBattleOfSkillStandby} from './EnemyBattleOfSkillStandby'
import {EnemyBattleOfSkillRigid} from './EnemyBattleOfSkillRigid'
import {EnemyBattleOfSkillInterruption} from './EnemyBattleOfSkillInterruption'
import {EnemyUpdateOfBattle} from './EnemyUpdateOfBattle'

/**
 * 敵更新者
 * @export
 * @class EnemyBattleUpdater
 */
export class EnemyBattleUpdater{
    /**
     * 行動判定
     * @private
     * @readonly
     * @type {EnemyBattleOfJudgeAction}
     * @memberof EnemyBattleUpdater
     */
    private readonly judgeAction_ : EnemyBattleOfJudgeAction;
    /**
     * 移動
     * @private
     * @readonly
     * @type {EnemyBattleOfMove}
     * @memberof EnemyBattleUpdater
     */
    private readonly move_ : EnemyBattleOfMove;
    /**
     * スキルスタンバイ
     * @private
     * @readonly
     * @type {EnemyBattleOfSkillStandby}
     * @memberof EnemyBattleUpdater
     */
    private readonly skillStandby_ : EnemyBattleOfSkillStandby;
    /**
     * スキル硬直
     * @private
     * @readonly
     * @type {EnemyBattleOfSkillRigid}
     * @memberof EnemyBattleUpdater
     */
    private readonly skillRigid_ : EnemyBattleOfSkillRigid;
    /**
     * スキル中断
     * @private
     * @readonly
     * @type {EnemyBattleOfSkillInterruption}
     * @memberof EnemyBattleUpdater
     */
    private readonly skillInterruption_ : EnemyBattleOfSkillInterruption;
    /**
     * 現在の状態
     * @private
     * @readonly
     * @type {EnemyBattleUpdate}
     * @memberof EnemyBattleUpdater
     */
    private currentState_ : EnemyBattleUpdate;
    /**
     * 現在の状態
     * @public
     * @readonly
     * @type {EnemyBattleUpdate}
     * @memberof EnemyBattleUpdater
     */
    public get currentState() : EnemyBattleUpdate {
        return this.currentState_;
    }


    /**
     * コンストラクタ
     * @public
     * @param {EnemyUpdateOfBattle} _battle 敵戦闘更新
     * @memberof EnemyBattleUpdater
     */
    public constructor(_battle:EnemyUpdateOfBattle){
        this.judgeAction_ = new EnemyBattleOfJudgeAction(_battle);
        this.move_ = new EnemyBattleOfMove(_battle);
        this.skillStandby_ = new EnemyBattleOfSkillStandby(_battle);
        this.skillRigid_ = new EnemyBattleOfSkillRigid(_battle);
        this.skillInterruption_ = new EnemyBattleOfSkillInterruption(_battle);
        this.currentState_ = this.judgeAction_;
    }

    /**
     * 状態切り替え
     * @public
     * @param {EnemyBattleUpdateMode} _nextMode 切り換え後の状態
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyBattleUpdater
     */
    public ChangeMode(_nextMode:EnemyBattleUpdateMode) : boolean {
        if(!(this.currentState_.OnChange())){
            return false;
        }

        switch(_nextMode){
            case EnemyBattleUpdateMode.JudgeAction:
            {
                this.currentState_ = this.judgeAction_;
                break;
            }

            case EnemyBattleUpdateMode.Move:
            {
                this.currentState_ = this.move_;
                break;
            }

            case EnemyBattleUpdateMode.SkillStandby:
            {
                this.currentState_ = this.skillStandby_;
                break;
            }

            case EnemyBattleUpdateMode.SkillRigid:
            {
                this.currentState_ = this.skillRigid_;
                break;
            }

            case EnemyBattleUpdateMode.SkillInterruption:
            {
                this.currentState_ = this.skillInterruption_;
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

    /**
     * スキル中断
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyBattleUpdater
     */
    public OnInterruptSkill() : boolean {
        if(this.currentState.mode === EnemyBattleUpdateMode.SkillStandby){
            // スキルスタンバイモードなら中断させる
            return this.ChangeMode(EnemyBattleUpdateMode.SkillInterruption);
        }
        return false;
    }
}
