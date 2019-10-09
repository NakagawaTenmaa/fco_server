/**
 * @fileoverview スキル効果の実装ファイル
 * @file SkillEffect.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Character} from './Character'
import {CharacterEffect} from './CharacterEffect'

/**
 * スキル効果
 * @export
 * @interface SkillEffect
 * @extends {CharacterEffect}
 */
export interface SkillEffect extends CharacterEffect{
    /**
     * スキルを利用しているキャラクタ
     * @public
     * @type {Character}
     * @memberof SkillEffect
     */
    characterUsingASkill : Character;
}
