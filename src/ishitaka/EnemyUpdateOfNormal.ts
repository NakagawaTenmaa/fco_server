/**
 * @fileoverview 敵通常更新の実装ファイル
 * @file EnemyUpdateOfNormal.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */
import {EnemyUpdate,EnemyUpdateMode} from './EnemyUpdate'
import {Enemy} from './Enemy'
import {Vector3} from './Vector3'
import {EnemyPopAreaData,EnemyPopAreaDataAccessor} from './DatabaseAccessors/EnemyPopAreaDataAccessor'

/**
 * 敵通常更新
 * @export
 * @class EnemyUpdateOfNormal
 * @implements {EnemyUpdate}
 */
export class EnemyUpdateOfNormal implements EnemyUpdate{
    /**
     * 歩行待機インターバル
     * @private
     * @static
     * @type {number}
     * @memberof EnemyUpdateOfNormal
     */
    private static readonly walkWaitInterval_ : number = 1000.0;
    /**
     * 最大移動スピード
     * @private
     * @static
     * @type {number}
     * @memberof EnemyUpdateOfNormal
     */
    private static readonly maxMoveSpeed_ : number = 0.5;
    /**
     * 最大回転スピード
     * @private
     * @static
     * @type {number}
     * @memberof EnemyUpdateOfNormal
     */
    private static readonly maxRotateSpeed_ : number = 0.5;
    /**
     * 歩行時到着判定半径
     * @private
     * @static
     * @type {number}
     * @memberof EnemyUpdateOfNormal
     */
    private static readonly walkCheckRange_ : number = 0.1;
    /**
     * 歩行時到着判定値
     * @private
     * @static
     * @type {number}
     * @memberof EnemyUpdateOfNormal
     */
    private static readonly walkCheckValue_ : number =
        EnemyUpdateOfNormal.walkCheckRange_ * EnemyUpdateOfNormal.walkCheckRange_;

    /**
     * モード
     * @public
     * @readonly
     * @type {EnemyUpdateMode}
     * @memberof EnemyUpdateOfNormal
     */
    public readonly mode : EnemyUpdateMode = EnemyUpdateMode.Normal;
    /**
     * 敵情報
     * @public
     * @readonly
     * @type {Enemy}
     * @memberof EnemyUpdateOfNormal
     */
    private readonly enemy_ : Enemy;
    /**
     * 待機時間
     * @private
     * @type {number}
     * @memberof EnemyUpdateOfNormal
     */
    private waitTime_ : number;
    /**
     * 歩いて近づく位置
     * @private
     * @type {Vector3}
     * @memberof EnemyUpdateOfNormal
     */
    private walkTargetPosition_ : Vector3;


    /**
     * コンストラクタ
     * @public
     * @param {Enemy} _enemy 敵情報
     * @memberof EnemyUpdateOfNormal
     */
    public constructor(_enemy:Enemy){
        this.enemy_ = _enemy;
        this.waitTime_ = 0.0;
        this.walkTargetPosition_ = Vector3.zero;
    }

    /**
     * 変更された
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyUpdateOfNormal
     */
    public HasChanged() : boolean {
        this.waitTime_ = 0.0;
        this.ChangeWalkPosition();
        //console.log("Enemy [id:" + this.enemy_.id.toString() + "] has changed to normal mode.");
        return true;
    }
    /**
     * 変更される
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyUpdateOfNormal
     */
    public OnChange() : boolean {
        return true;
    }
    /**
     * 更新処理
     * @public
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof EnemyUpdateOfNormal
     */
    public Update(_elapsedTime:number) : boolean {
        if(this.waitTime_ > 0.0){
            // 待機状態なら動かない
            this.waitTime_ -= _elapsedTime;
            if(this.waitTime_ < 0.0){
                this.waitTime_ = 0.0;
            }
        }
        else{
            // 通常移動
            this.enemy_.transform.Move(
                this.walkTargetPosition_,
                _elapsedTime,
                EnemyUpdateOfNormal.maxMoveSpeed_,
                EnemyUpdateOfNormal.maxRotateSpeed_
            );

            // 目的地に到着したら目的地を変更し待機状態へ
            if(this.IsArrivedWalkPosition()){
                this.ChangeWalkPosition();
                this.waitTime_ = EnemyUpdateOfNormal.walkWaitInterval_;
            }
        }

        return true;
    }

    /**
     * 歩き目的地に到着したか?
     * @private
     * @returns {boolean} true:した false:してない
     * @memberof EnemyUpdateOfNormal
     */
    private IsArrivedWalkPosition() : boolean {
        const delta:Vector3 = this.walkTargetPosition_.Subtraction(
            this.enemy_.transform.worldMatrix.column4.xyz
        );
        return (delta.lengthSquared < EnemyUpdateOfNormal.walkCheckValue_);
    }
    /**
     * 歩き目的地変更
     * @private
     * @returns {boolean} true:成功 false:失敗
     * @memberof EnemyUpdateOfNormal
     */
    private ChangeWalkPosition() : boolean {
        const area:EnemyPopAreaData|undefined = EnemyPopAreaDataAccessor.instance.Find(this.enemy_.mapId);
        if(area === undefined){
            return false;
        }

        const direction:number = 2.0*Math.PI * (Math.random()-0.5);
        const delta:number = area.areaRadius * Math.random();
        this.walkTargetPosition_ = new Vector3(
            area.positionX + delta*Math.cos(direction),
            area.positionY,
            area.positionZ + delta*Math.sin(direction)
        );

        return true;
    }
}
