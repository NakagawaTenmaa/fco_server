/**
 * @fileoverview 4次元ベクトルの実装ファイル
 * @file Vector4.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Vector2} from './Vector2'
import {Vector3} from './Vector3'

/**
 * 4次元ベクトル
 * @export
 * @class Vector4
 */
export class Vector4{
    /**
     * ゼロベクトル
     * @public
     * @readonly
     * @static
     * @type {Vector4}
     * @memberof Vector4
     */
    public static get zero() : Vector4 { return new Vector4(0, 0, 0, 0); }

    
    /**
     * X成分
     * @private
     * @type {number}
     * @memberof Vector4
     */
    private x_ : number;
    /**
     * Y成分
     * @private
     * @type {number}
     * @memberof Vector4
     */
    private y_ : number;
    /**
     * Z成分
     * @private
     * @type {number}
     * @memberof Vector4
     */
    private z_ : number;
    /**
     * W成分
     * @private
     * @type {number}
     * @memberof Vector4
     */
    private w_ : number;

    /**
     * X成分
     * @public
     * @type {number}
     * @memberof Vector4
     */
    public get x() : number { return this.x_; }
    public set x(_x:number){ this.x_ = _x; }
    /**
     * Y成分
     * @public
     * @type {number}
     * @memberof Vector4
     */
    public get y() : number { return this.y_; }
    public set y(_y:number){ this.y_ = _y; }
    /**
     * Z成分
     * @public
     * @type {number}
     * @memberof Vector4
     */
    public get z() : number { return this.z_; }
    public set z(_z:number){ this.z_ = _z; }
    /**
     * W成分
     * @public
     * @type {number}
     * @memberof Vector4
     */
    public get w() : number { return this.w_; }
    public set w(_w:number){ this.w_ = _w; }

    /**
     * XYベクトル
     * @public
     * @type {Vector2}
     * @memberof Vector4
     */
    public get xy() : Vector2 { return new Vector2(this.x, this.y); }
    public set xy(_xy:Vector2){ this.x = _xy.x; this.y = _xy.y; }
    /**
     * XZベクトル
     * @public
     * @type {Vector2}
     * @memberof Vector4
     */
    public get xz() : Vector2 { return new Vector2(this.x, this.z); }
    public set xz(_xz:Vector2){ this.x = _xz.x; this.z = _xz.y; }
    /**
     * XYZベクトル
     * @public
     * @type {Vector3}
     * @memberof Vector4
     */
    public get xyz() : Vector3 { return new Vector3(this.x, this.y, this.z); }
    public set xyz(_xyz:Vector3){
        this.x = _xyz.x;
        this.y = _xyz.y;
        this.z = _xyz.z;
    }

    /**
     * 長さの二乗
     * @public
     * @readonly
     * @type {number}
     * @memberof Vector4
     */
    public get lengthSquared() : number {
        return this.Dot(this);
    }
    /**
     * 長さ
     * @public
     * @readonly
     * @type {number}
     * @memberof Vector4
     */
    public get length() : number {
        return Math.sqrt(this.Dot(this));
    }

    /**
     * 正規化したベクトル
     * @public
     * @readonly
     * @type {Vector3}
     * @memberof Vector4
     */
    public get normalizedVector() : Vector4 {
        const len = this.length;
        if((len > (-Number.MIN_VALUE)) || (len < Number.MIN_VALUE)){
            console.error('Couldn\'t normalize vector.');
            return new Vector4(this);
        }
        return this.Multiplication(1.0/len);
    }


    /**
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof Vector4
     */
    public constructor()
    /**
     * コピーコンストラクタ
     * @public
     * @constructor
     * @param {Vector4} _vector 4次元ベクトル
     * @memberof Vector4
     */
    public constructor(_vector:Vector4)
    /**
     * フルコンストラクタ
     * @public
     * @constructor
     * @param {number} _x X成分
     * @param {number} _y Y成分
     * @param {number} _z Z成分
     * @param {number} _w W成分
     * @memberof Vector4
     */
    public constructor(_x:number, _y:number, _z:number, _w:number)
    /**
     * コンストラクタの実装
     * @constructor
     * @param {number|Vector4} [_x_vector] X成分 または 4次元ベクトル
     * @param {number} [_y] Y成分
     * @param {number} [_z] Z成分
     * @param {number} [_w] W成分
     * @memberof Vector4
     */
    public constructor(_x_vector?:number|Vector4, _y?:number, _z?:number, _w?:number){
        // undefined が渡された場合
        if(_x_vector === undefined){
            this.x_ = 0;
            this.y_ = 0;
            this.z_ = 0;
            this.w_ = 0;
            return;
        }
        
        if(_x_vector instanceof Vector4){
            this.x_ = _x_vector.x_;
            this.y_ = _x_vector.y_;
            this.z_ = _x_vector.z_;
            this.w_ = _x_vector.w_;
        }
        else{
            this.x_ = _x_vector;
            this.y_ = (_y===undefined) ? (0.0) : _y;
            this.z_ = (_z===undefined) ? (0.0) : _z;
            this.w_ = (_w===undefined) ? (0.0) : _w;
        }
    }

    /**
     * 加算
     * @public
     * @param {Vector4} _vector 加算するベクトル
     * @returns {Vector4} 加算したベクトル
     * @memberof Vector4
     */
    public Addition(_vector:Vector4) : Vector4 {
        return new Vector4(
            this.x + _vector.x,
            this.y + _vector.y,
            this.z + _vector.z,
            this.w + _vector.w
        );
    }

    /**
     * 減算
     * @public
     * @param {Vector4} _vector 減算するベクトル
     * @returns {Vector4} 減算したベクトル
     * @memberof Vector4
     */
    public Subtraction(_vector:Vector4) : Vector4 {
        return new Vector4(
            this.x - _vector.x,
            this.y - _vector.y,
            this.z - _vector.z,
            this.w - _vector.w
        );
    }

    /**
     * 乗算
     * @public
     * @param {number} _scalar 乗算する値
     * @returns {Vector4} 乗算したベクトル
     * @memberof Vector4
     */
    public Multiplication(_scalar:number) : Vector4 {
        return new Vector4(
            this.x * _scalar,
            this.y * _scalar,
            this.z * _scalar,
            this.w * _scalar
        );
    }

    /**
     * 除算
     * @public
     * @param {number} _scalar 除算する値
     * @returns {Vector4} 除算したベクトル
     * @memberof Vector4
     */
    public Division(_scalar:number) : Vector4 {
        if((_scalar > (-Number.MIN_VALUE)) || (_scalar < Number.MIN_VALUE)){
            console.error('Couldn\'t division of vector.');
            return new Vector4(this);
        }
        return new Vector4(
            this.x / _scalar,
            this.y / _scalar,
            this.z / _scalar,
            this.w / _scalar
        );
    }

    /**
     * 内積
     * @public
     * @param {Vector4} _vector 3次元ベクトル
     * @returns {number} 内積の値
     * @memberof Vector4
     */
    public Dot(_vector:Vector4) : number {
        return (
            this.x*_vector.x +
            this.y*_vector.y +
            this.z*_vector.z +
            this.w*_vector.w
        );
    }

    /**
     * 文字列に変換
     * @public
     * @param {number} [_radix] 基数 [2～36 (デフォルトで10)]
     * @returns {string}
     * @memberof Vector2
     */
    public toString(_radix?:number) : string {
        return ('('+
            this.x_.toString(_radix)+','+
            this.y_.toString(_radix)+','+
            this.z_.toString(_radix)+','+
            this.w_.toString(_radix)+')'
        );
    }
}
