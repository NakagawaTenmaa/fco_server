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
     * @param {Character} _character 対象となるキャラクタ
     * @returns {boolean} true:成功 false:失敗
     * @memberof CharacterEffect
     */
    Show(_character:Character) : boolean;
}
