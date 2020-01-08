/**
 * @fileoverview キャラクタの実装ファイル
 * @file Character.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {CharacterStatus} from './CharacterStatus'
import {Transform} from './../utility/Transform'
import {CharacterEffect} from './CharacterEffect'

/**
 * キャラクタタイプ
 * @export
 * @enum {number}
 */
export enum CharacterType{
    /**
     * プレイヤ
     * @memberof CharacterType
     */
    Player,
    /**
     * 敵
     * @memberof CharacterType
     */
    Enemy
}

/**
 * キャラクタ
 * @export
 * @interface Character
 */
export interface Character{
    /**
     * キャラクタ種類
     * @public
     * @readonly
     * @type {CharacterType}
     * @memberof Character
     */
    readonly type : CharacterType;
    /**
     * キャラクタID
     * @public
     * @readonly
     * @type {number}
     * @memberof Character
     */
    readonly id : number;
    /**
     * 戦場ID
     * @public
     * @readonly
     * @type {number}
     * @memberof Character
     */
    readonly battlefieldId : number;
    /**
     * 戦場にいるか
     * @public
     * @readonly
     * @type {boolean}
     * @memberof Character
     */
    readonly isJoinedBattlefield : boolean;
    /**
     * マップID
     * @readonly
     * @type {number}
     * @memberof Character
     */
    readonly mapId : number;
    /**
     * トランスフォーム
     * @public
     * @readonly
     * @type {Transform}
     * @memberof Character
     */
    readonly transform : Transform;
    /**
     * キャラクタステータス
     * @public
     * @readonly
     * @type {CharacterStatus}
     * @memberof Character
     */
    readonly status : CharacterStatus;
    /**
     * 死んでいるかのフラグ
     * @public
     * @readonly
     * @type {boolean}
     * @memberof Character
     */
    readonly isDead : boolean;


    /**
     * 初期化処理
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof Character
     */
    Initialize() : boolean;
    /**
     * 更新処理
     * @public
     * @param {number} _elapsedTime 経過時間
     * @returns {boolean} true:継続 false:終了
     * @memberof Character
     */
    Update(_elapsedTime:number) : boolean;
    /**
     * 終了処理
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof Character
     */
    Finalize() : boolean;

    /**
     * 死んだときの処理
     * @public
     * @memberof Character
     */
    OnDead() : void;

    
    /**
     * スキルが使用できるか?
     * @public
     * @param {number} _skillId 確認するスキルのID
     * @returns {boolean} true:できる false:できない
     * @memberof Character
     */
    IsUsableSkill(_skillId:number) : boolean;

    /**
     * スキル使用
     * @public
     * @param {number} _skillId 使うスキルのID
     * @param {number} _receiverId スキルを受けるキャラクタのID
     * @returns {number} 成功:ダメージ量 失敗:-1
     * @memberof Character
     */
    UseSkill(_skillId:number, _receiverId:number) : number;

    /**
     * ダメージを受ける
     * @public
     * @param {Character} _attacker 攻撃キャラクタ
     * @param {number} _hitPointDamage 体力ダメージ
     * @param {number} _magicPointDamage 魔力ダメージ
     * @returns {boolean} true:成功 false:失敗
     * @memberof Character
     */
    ReceiveDamage(_attacker:Character, _hitPointDamage:number, _magicPointDamage:number) : boolean;

    /**
     * 戦場に入る
     * @public
     * @param {number} _battlefieldId 戦場ID
     * @param {boolean} _isCall 周りに通知するかのフラグ
     * @returns {boolean} true:成功 false:失敗
     * @memberof Character
     */
    JoinBattlefield(_battlefieldId:number, _isCall:boolean) : boolean;
    /**
     * 戦場から出た
     * @public
     * @memberof Character
     */
    OnRemovedBattlefield() : void;

    /**
     * ヘイト変更
     * @public
     * @param {Character} _target ターゲット
     * @param {number} _hateDifference ヘイト差分
     * @memberof Character
     */
    ChangeHate(_target:Character, _hateDifference:number) : void;
}
