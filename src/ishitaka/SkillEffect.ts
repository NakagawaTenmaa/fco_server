/**
 * @fileoverview スキル効果の実装ファイル
 * @file SkillEffect.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Character} from './Character'
import {CharacterEffect} from './CharacterEffect'
import {SkillData} from './DatabaseAccessors/SkillDataAccessor';

/**
 * スキル効果
 * @export
 * @class SkillEffect
 * @implements {CharacterEffect}
 */
export class SkillEffect implements CharacterEffect{
    /**
     * スキルデータ
     * @private
     * @type {SkillData}
     * @memberof SkillEffect
     */
    private skillData_ : SkillData;


    /**
     * コンストラクタ
     * @public
     * @constructor
     * @param {SkillData} _data スキル情報
     * @memberof SkillEffect
     */
    public constructor(_data:SkillData){
        this.skillData_ = _data;
    }

    /**
     * 効果を発揮する
     * @public
     * @param {Character} _user 効果使用キャラクタ
     * @param {Character} _receiver 対象となるキャラクタ
     * @returns {boolean} true:成功 false:失敗
     * @memberof CharacterEffect
     */
    public Show(_user:Character, _receiver:Character) : boolean {
        // TODO:
        return true;
    }
}
