/**
 * @fileoverview 戦場の実装ファイル
 * @file Battlefield.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Character,CharacterType} from './Character'
import {Party} from './Party';
import {Enemy} from './Enemy';

/**
 * 戦場
 * @export
 * @class Battlefield
 */
export class Battlefield{
    /**
     * 戦場ID
     * @private
     * @type {number}
     * @memberof Battlefield
     */
    private id_ : number;
    /**
     * 戦場ID
     * @public
     * @readonly
     * @type {number}
     * @memberof Battlefield
     */
    public get id() : number {
        return this.id_;
    }
    /**
     * 戦場キャラクタID配列
     * @private
     * @type {Array<Character>}
     * @memberof Battlefield
     */
    private characterArray_ : Array<Character>;
    /**
     * 戦場キャラクタ配列
     * @public
     * @readonly
     * @type {Array<Character>}
     * @memberof Battlefield
     */
    public get characterArray() : Array<Character> {
        return this.characterArray_.concat([]);
    }
    /**
     * 戦場にいるパーティの配列
     * @private
     * @type {Array<Party>}
     * @memberof Battlefield
     */
    private partyArray_ : Array<Party>;
    /**
     * 戦場にいる敵の配列
     * @private
     * @type {Array<Enemy>}
     * @memberof Battlefield
     */
    private enemyArray_ : Array<Enemy>;
    /**
     * 死んでいるかのフラグ
     * @public
     * @readonly
     * @type {boolean}
     * @memberof Battlefield
     */
    public get isDead() : boolean {
        return ((this.partyArray_.length < 1) || (this.enemyArray_.length < 1));
    }


    /**
     * コンストラクタ
     * @public
     * @constructor
     * @param {number} _id 戦場ID
     * @memberof Battlefield
     */
    public constructor(_id:number){
        this.id_ = _id;
        this.characterArray_ = new Array<Character>();
        this.partyArray_ = new Array<Party>();
        this.enemyArray_ = new Array<Enemy>();
    }


    /**
     * 更新
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof Battlefield
     */
    public Update() : boolean {
        this.partyArray_ = this.partyArray_.filter(function(
            _party : Party,
            _id : number,
            _array : Party[]
        ) : boolean {
            // 死んでいたら消す
            if(_party.isDead){
                return false;
            }

            // TODO:メンバ全員が範囲外に出ていたら消す

            return true;
        });

        const isDeadAllParty:boolean = (this.partyArray_.length < 1);

        this.enemyArray_ = this.enemyArray_.filter(function(
            _enemy : Enemy,
            _id : number,
            _array : Enemy[]
        ) : boolean {
            if(_enemy.isDead){
                // 死んでいたら消す
                return false;
            }

            if(isDeadAllParty){
                // 全パーティがいなくなっているなら通常状態へ
                _enemy.OnNormal();
            }

            return true;
        });

        return true;
    }


    /**
     * パーティの追加
     * @public
     * @param {Party} _party パーティ
     * @returns {boolean} true:追加した false:追加しなかった
     * @memberof Battlefield
     */
    public AddParty(_party:Party) : boolean {
        if(_party.id in this.partyArray_){
            return false;
        }
        this.partyArray_[_party.id] = _party;
        return true;
    }
    /**
     * 敵の追加
     * @public
     * @param {Enemy} _enemy 敵
     * @returns {boolean} true:追加した false:追加しなかった
     * @memberof Battlefield
     */
    public AddEnemy(_enemy:Enemy) : boolean {
        if(_enemy.id in this.enemyArray_){
            return false;
        }
        this.enemyArray_.push(_enemy);
        return true;
    }

    /**
     * 全キャラクタを移動させる
     * @public
     * @param {Battlefield} _toBattlefield 移動先の戦場
     * @returns {boolean}
     * @memberof Battlefield
     */
    public MoveAllCharacters(_toBattlefield:Battlefield) : boolean {
        let isSuccess:boolean = true;

        this.partyArray_.forEach(function(
            _party : Party,
            _id : number,
            _array : Party[]
        ) : void {
            const isAdd:boolean = _toBattlefield.AddParty(_party);
            isSuccess = isSuccess && isAdd;
        });

        this.enemyArray_.forEach(function(
            _enemy : Enemy,
            _id : number,
            _array : Enemy[]
        ) : void {
            const isAdd:boolean = _toBattlefield.AddEnemy(_enemy);
            isSuccess = isSuccess && isAdd;
        });

        return isSuccess;
    }

    /**
     * パーティの削除
     * @public
     * @param {Party} _party パーティ
     * @returns {boolean} true:削除した false:削除しなかった
     * @memberof Battlefield
     */
    public RemoveParty(_party:Party) : boolean {
        if(_party.id in this.partyArray_){
            delete this.partyArray_[_party.id];
            return true;
        }
        return false;
    }
    /**
     * 敵の削除
     * @public
     * @param {Enemy} _enemy 敵
     * @returns {boolean} true:削除した false:削除しなかった
     * @memberof Battlefield
     */
    public RemoveEnemy(_enemy:Enemy) : boolean {
        if(_enemy.id in this.enemyArray_){
            delete this.enemyArray_[_enemy.id];
            return true;
        }
        return false;
    }
}