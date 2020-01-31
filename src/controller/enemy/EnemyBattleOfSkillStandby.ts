/**
 * @fileoverview 敵戦闘スキルスタンバイ更新の実装ファイル
 * @file EnemyBattleOfSkillStandby.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */
import {EnemyBattleUpdate,EnemyBattleUpdateMode} from './EnemyBattleUpdate'
import {EnemyUpdateOfBattle} from './EnemyUpdateOfBattle'

/**
 * 敵戦闘スキルスタンバイ更新
 * @export
 * @class EnemyBattleOfSkillStandby
 * @implements {EnemyBattleUpdate}
 */
export class EnemyBattleOfSkillStandby implements EnemyBattleUpdate{
    /**
     * モード
     * @public
     * @readonly
     * @type {EnemyBattleUpdateMode}
     * @memberof EnemyBattleOfSkillStandby
     */
    public readonly mode : EnemyBattleUpdateMode = EnemyBattleUpdateMode.SkillStandby;
    /**
     * 敵戦闘更新
     * @public
     * @readonly
     * @type {EnemyUpdateOfBattle}
     * @memberof EnemyBattleOfSkillStandby
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
     * @memberof EnemyBattleOfSkillStandby
     */
    public HasChanged() : boolean {
        this.waitTime_ = this.battle_.enemy.skillCastTime;
        this.battle_.enemy.SendUseSkillRequest();
        return true;
    }
    /**
     * 変更される
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyBattleOfSkillStandby
     */
    public OnChange() : boolean {
        return true;
    }
    /**
     * 更新処理
     * @public
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof EnemyBattleOfSkillStandby
     */
    public Update(_elapsedTime:number) : boolean {
        this.waitTime_ -= _elapsedTime;
        if(this.waitTime_ < 0){
            // スキル使用
            this.battle_.enemy.SendUseSkill();
            // スキル硬直ヘ
            this.battle_.updater.ChangeMode(EnemyBattleUpdateMode.SkillRigid);

            

            return true;
        }
        return true;
    }
}
