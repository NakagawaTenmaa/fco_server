/**
 * @fileoverview キャラクタ効果の実装ファイル
 * @file CharacterEffect.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Character} from './Character'

/**
 * キャラクタ効果
 * @export
 * @interface CharacterEffect
 */
export interface CharacterEffect{
    /**
     * 効果を発揮する
     * @public
     * @param {Character} _user 効果使用キャラクタ
     * @param {Character} _receiver 対象キャラクタ
     *  @returns {number} 成功:ダメージ量 失敗:-1
     * @memberof CharacterEffect
     */
    Show(_user:Character, _receiver:Character) : number;
}
