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

    public get rotationY() : number {
        const x : number = this.worldMatrix.column1.x;
        const z : number = this.worldMatrix.column1.z;
        return Math.atan2(z, x);
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
}
