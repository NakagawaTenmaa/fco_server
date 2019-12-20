import { BaseModel } from './modelBase'
import { SkillData } from '../controller/DatabaseAccessors/SkillDataAccessor';

// ユーザーモデル
export class UserModel extends BaseModel{
    static TABLE_NAME = "skill";

    public static async getData(): Promise<SkillData[]>{
        const data = await this.findAll();
        let skills: Array<SkillData> = []
        data.forEach((_skill: any) => {
            skills.push(new SkillData(
                _skill.name,
                _skill.type,
                _skill.castTime,
                _skill.recastTime,
                _skill.consumptionHitPoint,
                _skill.consumptionMagicPoint,
                _skill.basePhysicalDamage,
                _skill.strengthPhysicalDamageRate,
                _skill.baseMagicalDamage,
                _skill.intelligenceMagicalDamageRate,
                _skill.effectFlag,
                _skill.effectTarget,
                _skill.effectRangeType,
                _skill.effectRangeScale
            ));
        });


        return skills;
    }
}