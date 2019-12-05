/**
 * @fileoverview 3次元ベクトルの実装ファイル
 * @file Vector3.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Vector2} from './Vector2'

/**
 * 3次元ベクトル
 * @export
 * @class Vector3
 */
export class Vector3{
    /**
     * ゼロベクトル
     * @public
     * @readonly
     * @static
     * @type {Vector3}
     * @memberof Vector3
     */
    public static get zero() : Vector3 { return new Vector3(0, 0, 0); }

    
    /**
     * X成分
     * @private
     * @type {number}
     * @memberof Vector3
     */
    private x_ : number;
    /**
     * Y成分
     * @private
     * @type {number}
     * @memberof Vector3
     */
    private y_ : number;
    /**
     * Z成分
     * @private
     * @type {number}
     * @memberof Vector3
     */
    private z_ : number;

    /**
     * X成分
     * @public
     * @type {number}
     * @memberof Vector3
     */
    public get x() : number { return this.x_; }
    public set x(_x:number){ this.x_ = _x; }
    /**
     * Y成分
     * @public
     * @type {number}
     * @memberof Vector3
     */
    public get y() : number { return this.y_; }
    public set y(_y:number){ this.y_ = _y; }
    /**
     * Z成分
     * @public
     * @type {number}
     * @memberof Vector3
     */
    public get z() : number { return this.z_; }
    public set z(_z:number){ this.z_ = _z; }

    /**
     * XYベクトル
     * @public
     * @type {Vector2}
     * @memberof Vector3
     */
    public get xy() : Vector2 { return new Vector2(this.x, this.y); }
    public set xy(_xy:Vector2){ this.x = _xy.x; this.y = _xy.y; }
    /**
     * XZベクトル
     * @public
     * @type {Vector2}
     * @memberof Vector3
     */
    public get xz() : Vector2 { return new Vector2(this.x, this.z); }
    public set xz(_xz:Vector2){ this.x = _xz.x; this.z = _xz.y; }

    /**
     * 長さの二乗
     * @public
     * @readonly
     * @type {number}
     * @memberof Vector3
     */
    public get lengthSquared() : number {
        return this.Dot(this);
    }
    /**
     * 長さ
     * @public
     * @readonly
     * @type {number}
     * @memberof Vector3
     */
    public get length() : number {
        return Math.sqrt(this.Dot(this));
    }

    /**
     * 正規化したベクトル
     * @public
     * @readonly
     * @type {Vector3}
     * @memberof Vector3
     */
    public get normalizedVector() : Vector3 {
        const len = this.length;
        if((len > (-Number.MIN_VALUE)) && (len < Number.MIN_VALUE)){
            console.error('Couldn\'t normalize vector.');
            return new Vector3(this);
        }
        return this.Multiplication(1.0/len);
    }


    /**
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof Vector3
     */
    public constructor()
    /**
     * コピーコンストラクタ
     * @public
     * @constructor
     * @param {Vector3} _vector 3次元ベクトル
     * @memberof Vector3
     */
    public constructor(_vector:Vector3)
    /**
     * フルコンストラクタ
     * @public
     * @constructor
     * @param {number} _x X成分
     * @param {number} _y Y成分
     * @param {number} _z Z成分
     * @memberof Vector3
     */
    public constructor(_x:number, _y:number, _z:number)
    /**
     * コンストラクタの実装
     * @constructor
     * @param {number|Vector3} [_x_vector] X成分 または 3次元ベクトル
     * @param {number} [_y] Y成分
     * @param {number} [_z] Z成分
     * @memberof Vector3
     */
    public constructor(_x_vector?:number|Vector3, _y?:number, _z?:number){
        // undefined が渡された場合
        if(_x_vector === undefined){
            this.x_ = 0;
            this.y_ = 0;
            this.z_ = 0;
            return;
        }
        
        if(_x_vector instanceof Vector3){
            this.x_ = _x_vector.x_;
            this.y_ = _x_vector.y_;
            this.z_ = _x_vector.z_;
        }
        else{
            this.x_ = _x_vector;
            this.y_ = (_y===undefined) ? (0.0) : _y;
            this.z_ = (_z===undefined) ? (0.0) : _z;
        }
    }

    /**
     * 加算
     * @public
     * @param {Vector3} _vector 加算するベクトル
     * @returns {Vector3} 加算したベクトル
     * @memberof Vector3
     */
    public Addition(_vector:Vector3) : Vector3 {
        return new Vector3(
            this.x + _vector.x,
            this.y + _vector.y,
            this.z + _vector.z
        );
    }

    /**
     * 減算
     * @public
     * @param {Vector3} _vector 減算するベクトル
     * @returns {Vector3} 減算したベクトル
     * @memberof Vector3
     */
    public Subtraction(_vector:Vector3) : Vector3 {
        return new Vector3(
            this.x - _vector.x,
            this.y - _vector.y,
            this.z - _vector.z
        );
    }

    /**
     * 乗算
     * @public
     * @param {number} _scalar 乗算する値
     * @returns {Vector3} 乗算したベクトル
     * @memberof Vector3
     */
    public Multiplication(_scalar:number) : Vector3 {
        return new Vector3(
            this.x * _scalar,
            this.y * _scalar,
            this.z * _scalar
        );
    }

    /**
     * 除算
     * @public
     * @param {number} _scalar 除算する値
     * @returns {Vector3} 除算したベクトル
     * @memberof Vector3
     */
    public Division(_scalar:number) : Vector3 {
        if((_scalar > (-Number.MIN_VALUE)) || (_scalar < Number.MIN_VALUE)){
            console.error('Couldn\'t division of vector.');
            return new Vector3(this);
        }
        return new Vector3(
            this.x / _scalar,
            this.y / _scalar,
            this.z / _scalar
        );
    }

    /**
     * 内積
     * @public
     * @param {Vector3} _vector 3次元ベクトル
     * @returns {number} 内積の値
     * @memberof Vector3
     */
    public Dot(_vector:Vector3) : number {
        return (this.x*_vector.x + this.y*_vector.y + this.z*_vector.z);
    }

    /**
     * 外積
     * @public
     * @param {Vector3} _vector 3次元ベクトル
     * @returns {Vector3} 外積の値
     * @memberof Vector3
     */
    public Cross(_vector:Vector3) : Vector3 {
        return new Vector3(
            this.y*_vector.z - this.z*_vector.y,
            this.z*_vector.x - this.x*_vector.z,
            this.x*_vector.y - this.y*_vector.x
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
            this.z_.toString(_radix)+')'
        );
    }
}
