/**
 * @fileoverview 敵戦闘移動更新の実装ファイル
 * @file EnemyBattleOfMove.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */
import {EnemyBattleUpdate,EnemyBattleUpdateMode} from './EnemyBattleUpdate'
import {EnemyUpdateOfBattle} from './EnemyUpdateOfBattle'
import { Character } from '../character/Character';

/**
 * 敵戦闘移動更新
 * @export
 * @class EnemyBattleOfMove
 * @implements {EnemyBattleUpdate}
 */
export class EnemyBattleOfMove implements EnemyBattleUpdate{
    /**
     * 移動インターバル
     * @private
     * @static
     * @type {number}
     * @memberof EnemyBattleOfMove
     */
    private static readonly moveInterval_ : number = 1000.0;
    /**
     * 最大移動スピード
     * @private
     * @static
     * @type {number}
     * @memberof EnemyUpdateOfNormal
     */
    private static readonly maxMoveSpeed_ : number = 1.0;
    /**
     * 最大回転スピード
     * @private
     * @static
     * @type {number}
     * @memberof EnemyUpdateOfNormal
     */
    private static readonly maxRotateSpeed_ : number = 1.0;

    /**
     * モード
     * @public
     * @readonly
     * @type {EnemyBattleUpdateMode}
     * @memberof EnemyBattleOfMove
     */
    public readonly mode : EnemyBattleUpdateMode = EnemyBattleUpdateMode.Move;
    /**
     * 敵戦闘更新
     * @public
     * @readonly
     * @type {EnemyUpdateOfBattle}
     * @memberof EnemyBattleOfMove
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
    public constructor(_battle:EnemyUpdateOfBattle){
        this.battle_ = _battle;
        this.waitTime_ = 0.0;
    }

    /**
     * 変更された
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyBattleOfMove
     */
    public HasChanged() : boolean {
        this.waitTime_ = EnemyBattleOfMove.moveInterval_;
        return true;
    }
    /**
     * 変更される
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyBattleOfMove
     */
    public OnChange() : boolean {
        return true;
    }
    /**
     * 更新処理
     * @public
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof EnemyBattleOfMove
     */
    public Update(_elapsedTime:number) : boolean {
        // ターゲットに近づく
        const targetCharacter:Character|undefined = this.battle_.attackTarget;
        if(targetCharacter === undefined){
            console.warn("Couldn't get target character.");
            // 行動選択ヘ
            this.battle_.updater.ChangeMode(EnemyBattleUpdateMode.JudgeAction);
            return true;
        }

        // 移動
        this.battle_.enemy.transform.Move(
            targetCharacter.transform.position,
            _elapsedTime,
            EnemyBattleOfMove.maxMoveSpeed_,
            EnemyBattleOfMove.maxRotateSpeed_
        );

        this.waitTime_ -= _elapsedTime;
        if(this.waitTime_ < 0){
            // 行動選択ヘ
            this.battle_.updater.ChangeMode(EnemyBattleUpdateMode.JudgeAction);
            return true;
        }
        return true;
    }
}
