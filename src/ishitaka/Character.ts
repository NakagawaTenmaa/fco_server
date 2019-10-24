/**
 * @fileoverview キャラクタの実装ファイル
 * @file Character.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {CharacterStatus} from './CharacterStatus'
import {Transform} from './Transform'
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
     * @returns {boolean} true:成功 false:失敗
     * @memberof Character
     */
    UseSkill(_skillId:number, _receiverId:number) : boolean;
    /**
     * 効果を受ける
     * @public
     * @param {CharacterEffect} _effect 効果
     * @returns {boolean} true:成功 false:失敗
     * @memberof Character
     */
    ReceiveAnEffect(_effect:CharacterEffect) : boolean;
}
