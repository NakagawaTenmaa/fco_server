/**
 * @fileoverview 敵戦闘スキル硬直更新の実装ファイル
 * @file EnemyBattleOfSkillRigid.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */
import {EnemyBattleUpdate,EnemyBattleUpdateMode} from './EnemyBattleUpdate'
import {EnemyUpdateOfBattle} from './EnemyUpdateOfBattle'

/**
 * 敵戦闘スキル硬直更新
 * @export
 * @class EnemyBattleOfSkillRigid
 * @implements {EnemyBattleUpdate}
 */
export class EnemyBattleOfSkillRigid implements EnemyBattleUpdate{
    /**
     * モード
     * @public
     * @readonly
     * @type {EnemyBattleUpdateMode}
     * @memberof EnemyBattleOfSkillRigid
     */
    public readonly mode : EnemyBattleUpdateMode = EnemyBattleUpdateMode.SkillRigid;
    /**
     * 敵戦闘更新
     * @public
     * @readonly
     * @type {EnemyUpdateOfBattle}
     * @memberof EnemyBattleOfSkillRigid
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
     * @memberof EnemyBattleOfSkillRigid
     */
    public HasChanged() : boolean {
        this.waitTime_ = this.battle_.enemy.skillRecastTime;
        return true;
    }
    /**
     * 変更される
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyBattleOfSkillRigid
     */
    public OnChange() : boolean {
        return true;
    }
    /**
     * 更新処理
     * @public
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof EnemyBattleOfSkillRigid
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
