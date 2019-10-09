/**
 * @fileoverview 2次元ベクトルの実装ファイル
 * @file Vector2.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

/**
 * 2次元ベクトル
 * @export
 * @class Vector2
 */
export class Vector2{
    /**
     * ゼロベクトル
     * @public
     * @readonly
     * @static
     * @type {Vector2}
     * @memberof Vector2
     */
    public static get zero() : Vector2 { return new Vector2(0, 0); }

    
    /**
     * X成分
     * @private
     * @type {number}
     * @memberof Vector2
     */
    private x_ : number;
    /**
     * Y成分
     * @private
     * @type {number}
     * @memberof Vector2
     */
    private y_ : number;
    
    /**
     * X成分
     * @public
     * @type {number}
     * @memberof Vector2
     */
    public get x() : number { return this.x_; }
    public set x(_x:number){ this.x_ = _x; }
    /**
     * Y成分
     * @public
     * @type {number}
     * @memberof Vector2
     */
    public get y() : number { return this.y_; }
    public set y(_y:number){ this.y_ = _y; }


    /**
     * 長さの二乗
     * @public
     * @readonly
     * @type {number}
     * @memberof Vector2
     */
    public get lengthSquared() : number {
        return this.Dot(this);
    }
    
    /**
     * 長さ
     * @public
     * @readonly
     * @type {number}
     * @memberof Vector2
     */
    public get length() : number {
        return Math.sqrt(this.Dot(this));
    }

    /**
     * 正規化したベクトル
     * @public
     * @readonly
     * @type {Vector2}
     * @memberof Vector2
     */
    public get normalizedVector() : Vector2 {
        const len = this.length;
        if((len > (-Number.MIN_VALUE)) || (len < Number.MIN_VALUE)){
            console.error('Couldn\'t normalize vector.');
            return new Vector2(this);
        }
        return this.Multiplication(1.0/len);
    }


    /**
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof Vector2
     */
    public constructor()
    /**
     * コピーコンストラクタ
     * @public
     * @constructor
     * @param {Vector2} _vector 2次元ベクトル
     * @memberof Vector2
     */
    public constructor(_vector:Vector2)
    /**
     * フルコンストラクタ
     * @public
     * @constructor
     * @param {number} _x X成分
     * @param {number} _y Y成分
     * @memberof Vector2
     */
    public constructor(_x:number, _y:number)
    /**
     * コンストラクタの実装
     * @constructor
     * @param {number|Vector2} [_x_vector] X成分 または 2次元ベクトル
     * @param {number} [_y] Y成分
     * @memberof Vector2
     */
    public constructor(_x_vector?:number|Vector2, _y?:number){
        // undefined が渡された場合
        if(_x_vector === undefined){
            this.x_ = 0;
            this.y_ = 0;
            return;
        }
        
        if(_x_vector instanceof Vector2){
            this.x_ = _x_vector.x_;
            this.y_ = _x_vector.y_;
        }
        else{
            this.x_ = _x_vector;
            this.y_ = (_y===undefined) ? (0.0) : _y;
        }
    }

    /**
     * 加算
     * @public
     * @param {Vector2} _vector 加算するベクトル
     * @returns {Vector2} 加算したベクトル
     * @memberof Vector2
     */
    public Addition(_vector:Vector2) : Vector2 {
        return new Vector2(this.x+_vector.x, this.y+_vector.y);
    }

    /**
     * 減算
     * @public
     * @param {Vector2} _vector 減算するベクトル
     * @returns {Vector2} 減算したベクトル
     * @memberof Vector2
     */
    public Subtraction(_vector:Vector2) : Vector2 {
        return new Vector2(this.x-_vector.x, this.y-_vector.y);
    }

    /**
     * 乗算
     * @public
     * @param {number} _scalar 乗算する値
     * @returns {Vector2} 乗算したベクトル
     * @memberof Vector2
     */
    public Multiplication(_scalar:number) : Vector2 {
        return new Vector2(this.x*_scalar, this.y*_scalar);
    }

    /**
     * 除算
     * @public
     * @param {number} _scalar 除算する値
     * @returns {Vector2} 除算したベクトル
     * @memberof Vector2
     */
    public Division(_scalar:number) : Vector2 {
        if((_scalar > (-Number.MIN_VALUE)) || (_scalar < Number.MIN_VALUE)){
            console.error('Couldn\'t division of vector.');
            return new Vector2(this);
        }
        return new Vector2(this.x/_scalar, this.y/_scalar);
    }

    /**
     * 内積
     * @public
     * @param {Vector2} _vector 3次元ベクトル
     * @returns {number} 内積の値
     * @memberof Vector2
     */
    public Dot(_vector:Vector2) : number {
        return (this.x*_vector.x + this.y*_vector.y);
    }

    /**
     * 外積
     * @public
     * @param {Vector2} _vector 3次元ベクトル
     * @returns {number} 外積の値
     * @memberof Vector2
     */
    public Cross(_vector:Vector2) : number {
        return (this.x*_vector.y - this.y*_vector.x);
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
            this.y_.toString(_radix)+')'
        );
    }
}
