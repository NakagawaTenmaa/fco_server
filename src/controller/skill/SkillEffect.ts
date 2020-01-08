/**
 * @fileoverview スキル効果の実装ファイル
 * @file SkillEffect.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {Character} from './../character/Character'
import {CharacterEffect} from './../character/CharacterEffect'
import {SkillData} from './../DatabaseAccessors/SkillDataAccessor';

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
     * HP,MP消費
     * @public
     * @param {Character} _user 使用キャラクタ
     * @returns {boolean} true:成功 false:失敗
     * @memberof SkillEffect
     */
    public Consume(_user:Character) : boolean {
        // HP,MPチェック
        if(_user.status.hitPoint <= this.skillData_.consumptionHitPoint){
            console.error("Don't have enough hit point. [userId:" + _user.id.toString() + "]");
            return false;
        }
        if(_user.status.magicPoint <= this.skillData_.consumptionMagicPoint){
            console.error("Don't have enough magic point. [userId:" + _user.id.toString() + "]");
            return false;
        }

        // HP,MP消費
        _user.status.hitPoint = _user.status.hitPoint - this.skillData_.consumptionHitPoint;
        _user.status.magicPoint = _user.status.magicPoint - this.skillData_.consumptionMagicPoint;

        return true;
    }

    /**
     * 効果を発揮する
     * @public
     * @param {Character} _user 効果使用キャラクタ
     * @param {Character} _receiver 対象となるキャラクタ
     * @returns {number} 成功:ダメージ量 失敗:-1
     * @memberof CharacterEffect
     */
    public Show(_user:Character, _receiver:Character) : number {
        // 物理と魔法の攻撃値計算
        const physicalAttack:number = this.skillData_.strengthPhysicalDamageRate*_user.status.strength;
        const magicalAttack:number = this.skillData_.intelligenceMagicalDamageRate*_user.status.intelligence;
        // ダメージ倍率計算
        const damageRate:number = physicalAttack/_receiver.status.vitality + magicalAttack/_receiver.status.mind;
        // ダメージ算出
        const hitPointDamage:number = this.skillData_.basePhysicalDamage * damageRate;
        const magicPointDamage:number = this.skillData_.baseMagicalDamage * damageRate;
        
        // ダメージ反映
        _receiver.ReceiveDamage(_user, hitPointDamage, magicPointDamage);

//        console.log(
//            "skill attacked. [atk_id:" + _user.id +
//            ", def_id:" + _receiver.id +
//            ", hpd:" + hitPointDamage +
//            ", mpd:" + magicPointDamage +
//            ", def_hp:" + _receiver.status.hitPoint +
//            "]"
//        );

        // ヘイト変更
        _receiver.ChangeHate(_user, hitPointDamage);

        return hitPointDamage;
    }
}
