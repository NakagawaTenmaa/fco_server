/**
 * @fileoverview 4x4の行列(行優先)の実装ファイル
 * @file Matrix4x4.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Vector4} from './Vector4'

/**
 * 4x4の行列(行優先)
 * @export
 * @class Matrix4x4
 */
export class Matrix4x4 {
    /**
     * 単位行列
     * @private
     * @static
     * @readonly
     * @type {Matrix4x4}
     * @memberof Matrix4x4
     */
    public static get identity() : Matrix4x4 {
        return new Matrix4x4(
            new Vector4(1, 0, 0, 0),
            new Vector4(0, 1, 0, 0),
            new Vector4(0, 0, 1, 0),
            new Vector4(0, 0, 0, 1)
        );
    }

    /**
     * Y軸回転行列の作成
     * @public
     * @static
     * @param {number} _rotation 回転量
     * @returns {Matrix4x4} 回転行列
     * @memberof Matrix4x4
     */
    public static CreateRotationYMatrix(_rotation:number) : Matrix4x4 {
        const rotation:Matrix4x4 = Matrix4x4.identity;

        const cosValue:number = Math.cos(_rotation);
        const sinValue:number = Math.sin(_rotation);
        rotation.column1.x = cosValue;
        rotation.column1.z = sinValue;
        rotation.column3.x = -sinValue;
        rotation.column3.z = cosValue;
        
        return rotation;
    }


    /**
     * 1行目の成分
     * @private
     * @type {Vector4}
     * @memberof Matrix4x4
     */
    private column1_ : Vector4;
    /**
     * 2行目の成分
     * @private
     * @type {Vector4}
     * @memberof Matrix4x4
     */
    private column2_ : Vector4;
    /**
     * 3行目の成分
     * @private
     * @type {Vector4}
     * @memberof Matrix4x4
     */
    private column3_ : Vector4;
    /**
     * 4行目の成分
     * @private
     * @type {Vector4}
     * @memberof Matrix4x4
     */
    private column4_ : Vector4;

    /**
     * 1行目の成分
     * @public
     * @type {Vector4}
     * @memberof Matrix4x4
     */
    public get column1() : Vector4 { return this.column1_; }
    public set column1(_column1:Vector4){ this.column1_ = _column1; }
    /**
     * 2行目の成分
     * @public
     * @type {Vector4}
     * @memberof Matrix4x4
     */
    public get column2() : Vector4 { return this.column2_; }
    public set column2(_column2:Vector4){ this.column2_ = _column2; }
    /**
     * 3行目の成分
     * @public
     * @type {Vector4}
     * @memberof Matrix4x4
     */
    public get column3() : Vector4 { return this.column3_; }
    public set column3(_column3:Vector4){ this.column3_ = _column3; }
    /**
     * 4行目の成分
     * @public
     * @type {Vector4}
     * @memberof Matrix4x4
     */
    public get column4() : Vector4 { return this.column4_; }
    public set column4(_column4:Vector4){ this.column4_ = _column4; }
    
    /**
     * 1列目の成分
     * @public
     * @type {Vector4}
     * @memberof Matrix4x4
     */
    public get row1() : Vector4 {
        return new Vector4(
            this.column1.x,
            this.column2.x,
            this.column3.x,
            this.column4.x
        );
    }
    public set row1(_row1:Vector4){
        this.column1.x = _row1.x;
        this.column2.x = _row1.y;
        this.column3.x = _row1.z;
        this.column4.x = _row1.w;
    }
    /**
     * 2列目の成分
     * @public
     * @type {Vector4}
     * @memberof Matrix4x4
     */
    public get row2() : Vector4 {
        return new Vector4(
            this.column1.y,
            this.column2.y,
            this.column3.y,
            this.column4.y
        );
    }
    public set row2(_row2:Vector4){
        this.column1.y = _row2.x;
        this.column2.y = _row2.y;
        this.column3.y = _row2.z;
        this.column4.y = _row2.w;
    }
    /**
     * 3列目の成分
     * @public
     * @type {Vector4}
     * @memberof Matrix4x4
     */
    public get row3() : Vector4 {
        return new Vector4(
            this.column1.z,
            this.column2.z,
            this.column3.z,
            this.column4.z
        );
    }
    public set row3(_row3:Vector4){
        this.column1.z = _row3.x;
        this.column2.z = _row3.y;
        this.column3.z = _row3.z;
        this.column4.z = _row3.w;
    }
    /**
     * 4列目の成分
     * @public
     * @type {Vector4}
     * @memberof Matrix4x4
     */
    public get row4() : Vector4 {
        return new Vector4(
            this.column1.w,
            this.column2.w,
            this.column3.w,
            this.column4.w
        );
    }
    public set row4(_row4:Vector4){
        this.column1.w = _row4.x;
        this.column2.w = _row4.y;
        this.column3.w = _row4.z;
        this.column4.w = _row4.w;
    }

    /**
     * 転置行列
     * @public
     * @returns {Matrix4x4} 転置行列
     * @memberof Matrix4x4
     */
    public get transposeMatrix() : Matrix4x4 {
        return new Matrix4x4(
            new Vector4(this.row1),
            new Vector4(this.row2),
            new Vector4(this.row3),
            new Vector4(this.row4)
        );
    }

    /**
     * 逆行列
     * @public
     * @returns {Matrix4x4} 逆行列
     * @memberof Matrix4x4
     */
    public get invertMatrix() : Matrix4x4 {
        const newColumn1:Vector4 = new Vector4(
            + this.column2.y*this.column3.z*this.column4.w
            + this.column2.z*this.column3.w*this.column4.y
            + this.column2.w*this.column3.y*this.column4.z
            - this.column2.w*this.column3.z*this.column4.y
            - this.column2.z*this.column3.y*this.column4.w
            - this.column2.y*this.column3.w*this.column4.z
            ,
            - this.column1.y*this.column3.z*this.column4.w
            - this.column1.z*this.column3.w*this.column4.y
            - this.column1.w*this.column3.y*this.column4.z
            + this.column1.w*this.column3.z*this.column4.y
            + this.column1.z*this.column3.y*this.column4.w
            + this.column1.y*this.column3.w*this.column4.z
            ,
            + this.column1.y*this.column2.z*this.column4.w
            + this.column1.z*this.column2.w*this.column4.y
            + this.column1.w*this.column2.y*this.column4.z
            - this.column1.w*this.column2.z*this.column4.y
            - this.column1.z*this.column2.y*this.column4.w
            - this.column1.y*this.column2.w*this.column4.z
            ,
            - this.column1.y*this.column2.z*this.column3.w
            - this.column1.z*this.column2.w*this.column3.y
            - this.column1.w*this.column2.y*this.column3.z
            + this.column1.w*this.column2.z*this.column3.y
            + this.column1.z*this.column2.y*this.column3.w
            + this.column1.y*this.column2.w*this.column3.z
        );

        const matrixValue:number =
            this.column1.x*newColumn1.x +
            this.column2.x*newColumn1.y +
            this.column3.x*newColumn1.z +
            this.column4.x*newColumn1.w;
        if((matrixValue > (-Number.MIN_VALUE)) || (matrixValue < Number.MIN_VALUE)){
            console.error('Couldn\'t create invert matrix.');
            return new Matrix4x4(this);
        }

        const newColumn2:Vector4 = new Vector4(
            - this.column2.x*this.column3.z*this.column4.w
            - this.column2.z*this.column3.w*this.column4.x
            - this.column2.w*this.column3.x*this.column4.z
            + this.column2.w*this.column3.z*this.column4.x
            + this.column2.z*this.column3.x*this.column4.w
            + this.column2.x*this.column3.w*this.column4.z
            ,
            + this.column1.x*this.column3.z*this.column4.w
            + this.column1.z*this.column3.w*this.column4.x
            + this.column1.w*this.column3.x*this.column4.z
            - this.column1.w*this.column3.z*this.column4.x
            - this.column1.z*this.column3.x*this.column4.w
            - this.column1.x*this.column3.w*this.column4.z
            ,
            - this.column1.x*this.column2.z*this.column4.w
            - this.column1.z*this.column2.w*this.column4.x
            - this.column1.w*this.column2.x*this.column4.z
            + this.column1.w*this.column2.z*this.column4.x
            + this.column1.z*this.column2.x*this.column4.w
            + this.column1.x*this.column2.w*this.column4.z
            ,
            + this.column1.x*this.column2.z*this.column3.w
            + this.column1.z*this.column2.w*this.column3.x
            + this.column1.w*this.column2.x*this.column3.z
            - this.column1.w*this.column2.z*this.column3.x
            - this.column1.z*this.column2.x*this.column3.w
            - this.column1.x*this.column2.w*this.column3.z
        );
        const newColumn3:Vector4 = new Vector4(
            + this.column2.x*this.column3.y*this.column4.w
            + this.column2.y*this.column3.w*this.column4.x
            + this.column2.w*this.column3.x*this.column4.y
            - this.column2.w*this.column3.y*this.column4.x
            - this.column2.y*this.column3.x*this.column4.w
            - this.column2.x*this.column3.w*this.column4.y
            ,
            - this.column1.x*this.column3.y*this.column4.w
            - this.column1.y*this.column3.w*this.column4.x
            - this.column1.w*this.column3.x*this.column4.y
            + this.column1.w*this.column3.y*this.column4.x
            + this.column1.y*this.column3.x*this.column4.w
            + this.column1.x*this.column3.w*this.column4.y
            ,
            + this.column1.x*this.column2.y*this.column4.w
            + this.column1.y*this.column2.w*this.column4.x
            + this.column1.w*this.column2.x*this.column4.y
            - this.column1.w*this.column2.y*this.column4.x
            - this.column1.y*this.column2.x*this.column4.w
            - this.column1.x*this.column2.w*this.column4.y
            ,
            - this.column1.x*this.column2.y*this.column3.w
            - this.column1.y*this.column2.w*this.column3.x
            - this.column1.w*this.column2.x*this.column3.y
            + this.column1.w*this.column2.y*this.column3.x
            + this.column1.y*this.column2.x*this.column3.w
            + this.column1.x*this.column2.w*this.column3.y
        );
        const newColumn4:Vector4 = new Vector4(
            - this.column2.x*this.column3.y*this.column4.z
            - this.column2.y*this.column3.z*this.column4.x
            - this.column2.z*this.column3.x*this.column4.y
            + this.column2.z*this.column3.y*this.column4.x
            + this.column2.y*this.column3.x*this.column4.z
            + this.column2.x*this.column3.z*this.column4.y
            ,
            + this.column1.x*this.column3.y*this.column4.z
            + this.column1.y*this.column3.z*this.column4.x
            + this.column1.z*this.column3.x*this.column4.y
            - this.column1.z*this.column3.y*this.column4.x
            - this.column1.y*this.column3.x*this.column4.z
            - this.column1.x*this.column3.z*this.column4.y
            ,
            - this.column1.x*this.column2.y*this.column4.z
            - this.column1.y*this.column2.z*this.column4.x
            - this.column1.z*this.column2.x*this.column4.y
            + this.column1.z*this.column2.y*this.column4.x
            + this.column1.y*this.column2.x*this.column4.z
            + this.column1.x*this.column2.z*this.column4.y
            ,
            + this.column1.x*this.column2.y*this.column3.z
            + this.column1.y*this.column2.z*this.column3.x
            + this.column1.z*this.column2.x*this.column3.y
            - this.column1.z*this.column2.y*this.column3.x
            - this.column1.y*this.column2.x*this.column3.z
            - this.column1.x*this.column2.z*this.column3.y
        );

        const invertMatrixValue:number = 1.0 / matrixValue;
        return new Matrix4x4(
            newColumn1.Multiplication(invertMatrixValue),
            newColumn2.Multiplication(invertMatrixValue),
            newColumn3.Multiplication(invertMatrixValue),
            newColumn4.Multiplication(invertMatrixValue)
        );
    }


    /**
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof Matrix4x4
     */
    public constructor()
    /**
     * コピーコンストラクタ
     * @public
     * @constructor
     * @param {Matrix4x4} _matrix 4x4行列
     * @memberof Matrix4x4
     */
    public constructor(_matrix:Matrix4x4)
    /**
     * フルコンストラクタ
     * @public
     * @constructor
     * @param {Vector4} _column1 1行目の成分
     * @param {Vector4} _column2 2行目の成分
     * @param {Vector4} _column3 3行目の成分
     * @param {Vector4} _column4 4行目の成分
     * @memberof Matrix4x4
     */
    public constructor(
        _column1 : Vector4,
        _column2 : Vector4,
        _column3 : Vector4,
        _column4 : Vector4
    )
    /**
     * コンストラクタの実装
     * @constructor
     * @param {undefined|Vector4|Matrix4x4} [_column1_matrix] 1行目の成分 または 4x4行列
     * @param {undefined|Vector4} [_column2] 2行目の成分
     * @param {undefined|Vector4} [_column3] 3行目の成分
     * @param {undefined|Vector4} [_column4] 4行目の成分
     * @memberof Vector4
     */
    public constructor(
        _column1_matrix ?: Vector4|Matrix4x4,
        _column2 ?: Vector4,
        _column3 ?: Vector4,
        _column4 ?: Vector4
    ){
        // undefined が渡された場合
        if(_column1_matrix === undefined){
            this.column1_ = new Vector4(1, 0, 0, 0);
            this.column2_ = new Vector4(0, 1, 0, 0);
            this.column3_ = new Vector4(0, 0, 1, 0);
            this.column4_ = new Vector4(0, 0, 0, 1);
            return;
        }
        
        if(_column1_matrix instanceof Matrix4x4){
            this.column1_ = new Vector4(_column1_matrix.column1_);
            this.column2_ = new Vector4(_column1_matrix.column2_);
            this.column3_ = new Vector4(_column1_matrix.column3_);
            this.column4_ = new Vector4(_column1_matrix.column4_);
        }
        else{
            this.column1_ = new Vector4(_column1_matrix);
            this.column2_ = (_column2===undefined) ? (new Vector4(0, 1, 0, 0)) : (new Vector4(_column2));
            this.column3_ = (_column3===undefined) ? (new Vector4(0, 0, 1, 0)) : (new Vector4(_column3));
            this.column4_ = (_column4===undefined) ? (new Vector4(0, 0, 0, 1)) : (new Vector4(_column4));
        }
    }

    /**
     * 加算
     * @public
     * @param {Matrix4x4} _matrix 加算する4x4行列
     * @returns {Matrix4x4} 加算した4x4行列
     * @memberof Matrix4x4
     */
    public Addition(_matrix:Matrix4x4) : Matrix4x4 {
        return new Matrix4x4(
            this.column1.Addition(_matrix.column1),
            this.column2.Addition(_matrix.column2),
            this.column3.Addition(_matrix.column3),
            this.column4.Addition(_matrix.column4)
        );
    }

    /**
     * 減算
     * @public
     * @param {Matrix4x4} _matrix 減算する4x4行列
     * @returns {Matrix4x4} 減算した4x4行列
     * @memberof Matrix4x4
     */
    public Subtraction(_matrix:Matrix4x4) : Matrix4x4 {
        return new Matrix4x4(
            this.column1.Subtraction(_matrix.column1),
            this.column2.Subtraction(_matrix.column2),
            this.column3.Subtraction(_matrix.column3),
            this.column4.Subtraction(_matrix.column4)
        );
    }

    /**
     * 乗算
     * @public
     * @param {Matrix4x4} _mairix 乗算する4x4行列
     * @returns {Matrix4x4} 乗算した4x4行列
     * @memberof Matrix4x4
     */
    public Multiplication(_mairix:Matrix4x4) : Matrix4x4 {
        return new Matrix4x4(
            new Vector4(
                this.column1.x*_mairix.column1.x +
                this.column1.y*_mairix.column2.x +
                this.column1.z*_mairix.column3.x +
                this.column1.w*_mairix.column4.x
                ,
                this.column1.x*_mairix.column1.y +
                this.column1.y*_mairix.column2.y +
                this.column1.z*_mairix.column3.y +
                this.column1.w*_mairix.column4.y
                ,
                this.column1.x*_mairix.column1.z +
                this.column1.y*_mairix.column2.z +
                this.column1.z*_mairix.column3.z +
                this.column1.w*_mairix.column4.z
                ,
                this.column1.x*_mairix.column1.w +
                this.column1.y*_mairix.column2.w +
                this.column1.z*_mairix.column3.w +
                this.column1.w*_mairix.column4.w
            ),
            new Vector4(
                this.column2.x*_mairix.column1.x +
                this.column2.y*_mairix.column2.x +
                this.column2.z*_mairix.column3.x +
                this.column2.w*_mairix.column4.x
                ,
                this.column2.x*_mairix.column1.y +
                this.column2.y*_mairix.column2.y +
                this.column2.z*_mairix.column3.y +
                this.column2.w*_mairix.column4.y
                ,
                this.column2.x*_mairix.column1.z +
                this.column2.y*_mairix.column2.z +
                this.column2.z*_mairix.column3.z +
                this.column2.w*_mairix.column4.z
                ,
                this.column2.x*_mairix.column1.w +
                this.column2.y*_mairix.column2.w +
                this.column2.z*_mairix.column3.w +
                this.column2.w*_mairix.column4.w
            ),
            new Vector4(
                this.column3.x*_mairix.column1.x +
                this.column3.y*_mairix.column2.x +
                this.column3.z*_mairix.column3.x +
                this.column3.w*_mairix.column4.x
                ,
                this.column3.x*_mairix.column1.y +
                this.column3.y*_mairix.column2.y +
                this.column3.z*_mairix.column3.y +
                this.column3.w*_mairix.column4.y
                ,
                this.column3.x*_mairix.column1.z +
                this.column3.y*_mairix.column2.z +
                this.column3.z*_mairix.column3.z +
                this.column3.w*_mairix.column4.z
                ,
                this.column3.x*_mairix.column1.w +
                this.column3.y*_mairix.column2.w +
                this.column3.z*_mairix.column3.w +
                this.column3.w*_mairix.column4.w
            ),
            new Vector4(
                this.column4.x*_mairix.column1.x +
                this.column4.y*_mairix.column2.x +
                this.column4.z*_mairix.column3.x +
                this.column4.w*_mairix.column4.x
                ,
                this.column4.x*_mairix.column1.y +
                this.column4.y*_mairix.column2.y +
                this.column4.z*_mairix.column3.y +
                this.column4.w*_mairix.column4.y
                ,
                this.column4.x*_mairix.column1.z +
                this.column4.y*_mairix.column2.z +
                this.column4.z*_mairix.column3.z +
                this.column4.w*_mairix.column4.z
                ,
                this.column4.x*_mairix.column1.w +
                this.column4.y*_mairix.column2.w +
                this.column4.z*_mairix.column3.w +
                this.column4.w*_mairix.column4.w
            )
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
        return ('{'+
            this.column1_.toString(_radix)+','+
            this.column2_.toString(_radix)+','+
            this.column3_.toString(_radix)+','+
            this.column4_.toString(_radix)+'}'
        );
    }
}
