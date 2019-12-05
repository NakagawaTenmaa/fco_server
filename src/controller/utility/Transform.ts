/**
 * @fileoverview トランスフォームの実装ファイル
 * @file Transform.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Vector3} from './Vector3'
import {Vector4} from './Vector4'
import {Matrix4x4} from './Matrix4x4'

/**
 * トランスフォーム
 * @export
 * @class Transform
 */
export class Transform{
    /**
     * ワールド変換行列
     * @private
     * @type {Matrix4x4}
     * @memberof Transform
     */
    private worldMatrix_ : Matrix4x4;
    /**
     * ワールド変換行列
     * @public
     * @type {Matrix4x4}
     * @memberof Transform
     */
    public get worldMatrix() : Matrix4x4 { return this.worldMatrix_; }
    public set worldMatrix(_worldMatrix:Matrix4x4){ this.worldMatrix_ = _worldMatrix; }

    /**
     * 位置座標
     * @public
     * @type {Vector3}
     * @memberof Transform
     */
    public get position() : Vector3 { return this.worldMatrix.column4.xyz; }
    public set position(_position:Vector3){ this.worldMatrix.column4.xyz = _position; }

    /**
     * Y軸回転量 [デグリー]
     * @public
     * @readonly
     * @type {number}
     * @memberof Transform
     */
    public get rotationY() : number {
        const x : number = this.worldMatrix.column3.x;
        const z : number = this.worldMatrix.column3.z;
        const radian : number = Math.atan2(x, z);
        return ((radian/Math.PI)*180.0);
    }

    /**
     * 拡大率
     * @public
     * @readonly
     * @type {Vector3}
     * @memberof Transform
     */
    public get scale() : Vector3 {
        return new Vector3(
            this.worldMatrix.column1.length,
            this.worldMatrix.column2.length,
            this.worldMatrix.column3.length
        );
    }

    /**
     * 回転行列
     * @public
     * @readonly
     * @type {Matrix4x4}
     * @memberof Transform
     */
    public get rotationMatrix() : Matrix4x4 {
        const scaling:Vector3 = this.scale;
        return new Matrix4x4(
            this.worldMatrix.column1.Division(scaling.x),
            this.worldMatrix.column2.Division(scaling.y),
            this.worldMatrix.column3.Division(scaling.z),
            new Vector4(0, 0, 0, 1)
        );
    }


    /**
     * デフォルトコンストラクタ
     * @public
     * @memberof Transform
     */
    public constructor(){
        this.worldMatrix_ = new Matrix4x4();
    }

    /**
     * 移動
     * @public
     * @param {Vector3} _targetPosition 目的地
     * @param {number} _deltaTime 移動時間
     * @param {number} _maxMoveSpeed 最大移動速度
     * @param {number} _maxRotateSpeed 最大回転速度
     * @returns {boolean} true:成功 false:失敗
     * @memberof Transform
     */
    public Move(
        _targetPosition : Vector3,
        _deltaTime : number,
        _maxMoveSpeed : number,
        _maxRotateSpeed : number
    ) : boolean {
        // 目的地に近づく
        const toWalkMatrix:Matrix4x4 = Matrix4x4.identity;
        toWalkMatrix.column4.xyz = _targetPosition;
        const toPosition:Vector3 = toWalkMatrix.Multiplication(this.worldMatrix.invertMatrix).column4.xyz;
        const move:Vector3 = new Vector3(0, 0, 0);

        let rotation:number = 0.0;
        // 前に進む
        if(toPosition.z > 0.0){
            // 移動量と回転量を計算
            const moveDistance:number = (toPosition.z>_maxMoveSpeed) ? (_maxMoveSpeed) : (toPosition.z);
            // 移動
            move.z += moveDistance * (_deltaTime / 1000.0);

            // 回転量を計算
            rotation = _maxRotateSpeed*(toPosition.x*toPosition.x)/(toPosition.x*toPosition.x + toPosition.z*toPosition.z);
            if(toPosition.x < 0.0){
                rotation = -rotation;
            }
        }
        else{
            // 回転量を計算
            rotation = (toPosition.x < 0.0) ? (-_maxRotateSpeed) : (_maxRotateSpeed);
        }

        // 移動、回転
        const transformMatrix:Matrix4x4 = Matrix4x4.CreateRotationYMatrix(-rotation * (_deltaTime / 1000.0));
        transformMatrix.column4.xyz = move;
        this.worldMatrix = transformMatrix.Multiplication(this.worldMatrix);

        return true;
    }
}
