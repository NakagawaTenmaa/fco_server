/**
 * @fileoverview パーティの実装ファイル
 * @file Party.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Character} from './Character'
import {Player} from './Player'
import {Battlefield} from './Battlefield';
import {BattlefieldManager} from './BattlefieldManager';

/**
 * パーティ
 * @export
 * @class Party
 */
export class Party{
    /**
     * パーティID
     * @private
     * @type {number}
     * @memberof Party
     */
    private id_ : number;
    /**
     * パーティID
     * @public
     * @readonly
     * @type {number}
     * @memberof Party
     */
    public get id() : number {
        return this.id_;
    }
    /**
     * 戦場ID
     * @private
     * @type {number}
     * @memberof Party
     */
    private battlefieldId_ : number;
    /**
     * 戦場
     * @private
     * @type {Battlefield|undefined}
     * @memberof Party
     */
    private battlefield_ : Battlefield|undefined;
    /**
     * 戦場
     * @public
     * @readonly
     * @type {(Battlefield|undefined)}
     * @memberof Party
     */
    public get battlefield() : Battlefield|undefined {
        return this.battlefield_;
    }
    /**
     * 戦場ID
     * @public
     * @readonly
     * @type {number}
     * @memberof Party
     */
    public get battlefieldId() : number {
        return this.battlefieldId_;
    }
    /**
     * 戦場IDの設定
     * @private
     * @param {number} _battlefieldId 戦場ID
     * @memberof Party
     */
    private SetBattlefieldId(_battlefieldId:number) : void {
        this.battlefieldId_ = _battlefieldId;

        if(_battlefieldId < 0){
            this.battlefield_ = undefined;
        }
        else{
            this.battlefield_ = BattlefieldManager.instance.Search(_battlefieldId);
        }
    }
    /**
     * 戦場にいるか
     * @public
     * @readonly
     * @type {boolean}
     * @memberof Party
     */
    public get isJoinedBattlefield() : boolean {
        return (this.battlefieldId_ >= 0);
    }

    /**
     * パーティキャラクタ配列
     * @private
     * @type {Array<Character>}
     * @memberof Party
     */
    private characterArray_ : Array<Character>;
    /**
     * パーティキャラクタ配列
     * @public
     * @readonly
     * @type {Array<Character>}
     * @memberof Party
     */
    public get characterArray() : Array<Character> {
        return this.characterArray_.concat([]);
    }
    /**
     * 優先度をリセットする
     * @private
     * @type {boolean}
     * @memberof Party
     */
    private isResetPriority_ : boolean;
    /**
     * 死んでいるかのフラグ
     * @public
     * @readonly
     * @type {boolean}
     * @memberof Party
     */
    public get isDead() : boolean {
        if(this.characterArray_.length < 1){
            return true;
        }

        let isDead = true;
        this.characterArray_.every(function(
            _character : Character,
            _index : number,
            _array : Character[]
        ) : boolean {
            isDead = _character.isDead;
            return (!isDead);
        });

        return isDead;
    }


    /**
     * コンストラクタ
     * @public
     * @constructor
     * @param {number} _id パーティID
     * @memberof Party
     */
    public constructor(_id:number){
        this.id_ = _id;
        this.battlefieldId_ = -1;
        this.battlefield_ = undefined;
        this.characterArray_ = new Array<Character>();
        this.isResetPriority_ = false;
    }

    /**
     * 戦場に追加された
     * @public
     * @param {number} _battlefieldId 戦場ID
     * @memberof Party
     */
    public OnAddBattlefield(_battlefieldId:number) : void {
        this.SetBattlefieldId(_battlefieldId);
        this.characterArray.forEach(function(
            _character : Character,
            _priority : number,
            _memberArray : Character[]
        ) : void {
            _character.JoinBattlefield(_battlefieldId, false);
        });
    }
    /**
     * 戦場から削除された
     * @public
     * @param {(_character:Character)=>void} _Remove キャラクタ削除用関数
     * @memberof Party
     */
    public OnRemovedBattlefield(
        _Remove : (_character:Character)=>void
    ) : void {
        this.characterArray.forEach(function(
            _character : Character,
            _priority : number,
            _memberArray : Character[]
        ) : void {
            _Remove(_character);
            _character.OnRemovedBattlefield();
        });
        this.SetBattlefieldId(-1);
    }

    /**
     * プレイヤの追加
     * @param {Player} _player プレイヤ
     * @returns {boolean} true:追加した false:追加しなかった
     * @memberof Party
     */
    public AddPlayer(_player:Player) : boolean {
        // キャラクタがいるか探す
        const index:number = this.characterArray_.indexOf(_player);
        if(index >= 0){
            // 既に追加されている
            return false;
        }

        // 優先度に穴が開いている場合にリセット
        if(this.isResetPriority_){
            this.ResetPriority();
        }

        // 優先度を最後にする
        _player.partyPriority = this.characterArray_.length;

        // 追加
        this.characterArray_.push(_player);
        return true;
    }
    /**
     * キャラクタの削除
     * @param {Player} _player プレイヤ
     * @returns {boolean} true:削除した false:削除しなかった
     * @memberof Battlefield
     */
    public RemovePlayer(_player:Player) : boolean {
        // キャラクタがいるか探す
        const index:number = this.characterArray_.indexOf(_player);
        if(index < 0){
            // ここにはいない
            return false;
        }

        // 削除
        this.characterArray_.splice(index, 1);

        // 戦場に入っていたならその戦場にいる敵のターゲットから外す
        if(this.isJoinedBattlefield){
            const currentBattlefield:Battlefield|undefined = this.battlefield;
            if(currentBattlefield !== undefined){
                currentBattlefield.ClearEnemyTarget(_player);
                _player.OnRemovedBattlefield();
            }
        }

        this.isResetPriority_ = true;
        return true;
    }

    /**
     * 優先度をリセット
     * @private
     * @returns {boolean} true:成功 false:失敗
     * @memberof Party
     */
    private ResetPriority() : boolean {
        let isSuccess:boolean = true;

        // 優先度をインデックスでリセット
        this.characterArray_.forEach(function(
            _character : Character,
            _index : number,
            _array : Character[]
        ) : void {
            if(_character === undefined){
                isSuccess = false;
                return;
            }
            const player:Player = _character as Player;
            player.partyPriority = _index;
        });

        this.isResetPriority_ = false;

        return isSuccess;
    }
}