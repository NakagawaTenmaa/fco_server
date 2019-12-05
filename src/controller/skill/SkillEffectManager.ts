/**
 * @fileoverview スキル効果マネージャの実装ファイル
 * @file SkillEffectManager.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {SkillEffect} from './SkillEffect'
import {SkillData,SkillDataAccessor} from './../DatabaseAccessors/SkillDataAccessor';

export class SkillEffectManager{
    /**
     * シングルトンインスタンス
     * @private
     * @static
     * @type {SkillEffectManager}
     * @memberof SkillEffectManager
     */
    private static instance_ ?: SkillEffectManager;
    /**
     * シングルトンインスタンス
     * @public
     * @static
     * @readonly
     * @type {SkillEffectManager}
     * @memberof SkillEffectManager
     */
    public static get instance() : SkillEffectManager {
        if(SkillEffectManager.instance_ === undefined){
            SkillEffectManager.instance_ = new SkillEffectManager();
            SkillEffectManager.instance_.CreateAllSkillEffect();
        }
        return SkillEffectManager.instance_;
    }


    /**
     * 効果配列
     * @private
     * @type {Array<SkillEffect>}
     * @memberof SkillEffectManager
     */
    private effectArray_ : Array<SkillEffect>;


    /**
     * デフォルトコンストラクタ
     * @private
     * @constructor
     * @memberof SkillEffectManager
     */
    private constructor(){
        this.effectArray_ = new Array<SkillEffect>();
    }

    /**
     * スキル効果の検索
     * @public
     * @param {number} _skillId スキルID
     * @returns {(SkillEffect|undefined)} 対応するスキル効果 なければundefined
     * @memberof SkillEffectManager
     */
    public FindSkillEffect(_skillId:number) : SkillEffect|undefined{
        return this.effectArray_[_skillId];
    }

    /**
     * 全スキル効果の作成
     * @public
     * @returns {boolean} true:成功 false:失敗
     * @memberof SkillEffectManager
     */
    public CreateAllSkillEffect() : boolean {
        const effectArray:Array<SkillEffect> = new Array<SkillEffect>();

        SkillDataAccessor.instance.dataArray.forEach(function(
            _data : SkillData,
            _id : number,
            _array : SkillData[]
        ) : void {
            effectArray[_id] = new SkillEffect(_data);
        });

        this.effectArray_ = effectArray;

        return true;
    }
}
