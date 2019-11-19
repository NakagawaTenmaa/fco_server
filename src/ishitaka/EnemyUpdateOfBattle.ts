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
import {EnemyTarget} from './EnemyTarget'
import {Character} from './Character';

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
     * ターゲット情報
     * @private
     * @type {Array<EnemyTarget>}
     * @memberof EnemyUpdateOfBattle
     */
    private targetArray_ : Array<EnemyTarget>;
    
    /**
     * 攻撃対象
     * @public
     * @returns {(Character|undefined)} 戦闘相手キャラクタ 居なければundefined
     * @memberof Enemy
     */
    public get attackTarget() : Character|undefined {
        let battleCharacter:Character|undefined = undefined;
        this.targetArray_.every(function(
            _target : EnemyTarget,
            _priority : number,
            _array : EnemyTarget[]
        ) : boolean {
            if(_target.character.isDead){
                return true;
            }
            battleCharacter = _target.character;
            return false;
        });
        return battleCharacter;
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
        this.targetArray_ = new Array<EnemyTarget>();
    }

    /**
     * 変更された
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyUpdateOfBattle
     */
    public HasChanged() : boolean {
        this.ClearTargetArray();
        //console.log("Enemy [id:" + this.enemy_.id.toString() + "] has changed to battle mode.");
        return true;
    }
    /**
     * 変更される
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyUpdateOfBattle
     */
    public OnChange() : boolean {
        this.ClearTargetArray();
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
        if(!(this.UpdateOfAllTargetHate(_elapsedTime))){
            return false;
        }
        this.UpdateOfTargetArray();
        if(this.DoSetNormalMode()){
            this.enemy.OnNormal();
            return true;
        }
        if(!(this.battleUpdater_.currentState.Update(_elapsedTime))){
            return false;
        }
        return true;
    }

    /**
     * ターゲット情報の全削除
     * @private
     * @memberof EnemyUpdateOfBattle
     */
    private ClearTargetArray() : void {
        this.targetArray_ = new Array<EnemyTarget>();
    }
    /**
     * 全ターゲットのヘイト更新
     * @private
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof EnemyUpdateOfBattle
     */
    private UpdateOfAllTargetHate(_elapsedTime:number) : boolean {
        // TODO: ヘイト減少量算出
        const downHate = 0.3 * _elapsedTime / 1000.0;

        this.targetArray_.forEach(function(
            _enemyTarget : EnemyTarget,
            _index : number,
            _array : EnemyTarget[]
        ) : void {
            _enemyTarget.hate = _enemyTarget.hate - downHate;
        });

        // ヘイトが高い順にソート
        this.targetArray_ = this.targetArray_.sort(function(
            _left : EnemyTarget,
            _right : EnemyTarget
        ) : number {
            return (_right.hate - _left.hate);
        });

        return true;
    }
    /**
     * ターゲット配列の更新
     * @private
     * @memberof EnemyUpdateOfBattle
     */
    private UpdateOfTargetArray() : void {
        const maxLength:number = 10.0;
        const check:number = maxLength * maxLength;
        const this_:EnemyUpdateOfBattle = this;

        this.targetArray_ = this.targetArray_.filter(function(
            _enemyTarget : EnemyTarget,
            _index : number,
            _array : EnemyTarget[]
        ) : boolean {
            // ヘイトを持っていないキャラは外す
            if(_enemyTarget.hate <= 0){
                return false;
            }
            // 距離が離れすぎたキャラも外す
            if(
                _enemyTarget.character.transform.position.Subtraction(
                    this_.enemy.transform.position
                ).lengthSquared > check
            ){
                return false;
            }

            // 存続
            return true;
        });
    }
    /**
     * 通常状態に移行するか?
     * @private
     * @returns {boolean} true:する false:しない
     * @memberof EnemyUpdateOfBattle
     */
    private DoSetNormalMode() : boolean {
        return (this.targetArray_.length <= 0);
    }

    /**
     * ヘイト変更
     * @public
     * @param {Character} _target ターゲット
     * @param {number} _hateDifference ヘイト差分
     * @memberof EnemyUpdateOfBattle
     */
    public ChangeHate(_target:Character, _hateDifference:number) : void {
        // ターゲットデータを探す
        let enemyTarget:EnemyTarget|undefined = this.FindTargetData(_target);
        if(enemyTarget === undefined){
            enemyTarget = new EnemyTarget(_target);
            this.targetArray_.push(enemyTarget);
        }
        enemyTarget.hate = enemyTarget.hate + _hateDifference;
    }

    /**
     * ターゲット情報の取得
     * @private
     * @param {Character} _target ターゲットキャラクタ
     * @returns {(EnemyTarget|undefined)} ターゲット情報 なければundefined
     * @memberof EnemyUpdateOfBattle
     */
    private FindTargetData(_target:Character) : EnemyTarget|undefined{
        let targetData:EnemyTarget|undefined = undefined;
        this.targetArray_.every(function (
            _enemyTarget : EnemyTarget,
            _index : number,
            _array : EnemyTarget[]
        ) : boolean {
            if(_enemyTarget.character.id === _target.id){
                targetData = _enemyTarget;
                return false;
            }
            return true;
        });
        return targetData;
    }
    /**
     * ターゲット削除
     * @public
     * @param {Character} _target ターゲットキャラクタ
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyUpdateOfBattle
     */
    public RemoveTarget(_target:Character) : boolean {
        let isRemoved:boolean = false;
        this.targetArray_ = this.targetArray_.filter(function (
            _enemyTarget : EnemyTarget,
            _index : number,
            _array : EnemyTarget[]
        ) : boolean {
            if(_enemyTarget.character.id === _target.id){
                isRemoved = true;
                return false;
            }
            return true;
        });
        return isRemoved;
    }
}
