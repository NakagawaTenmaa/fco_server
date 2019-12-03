import { createHash, createSalt } from './../controller/utility/hash'
import { BaseModel } from './modelBase'
import { format } from 'mysql'
import { SkillData } from '../ishitaka/DatabaseAccessors/SkillDataAccessor';

// ユーザーモデル
export class UserModel extends BaseModel{
    static TABLE_NAME = "skill";

    public static async getData(): Promise<SkillData[]>{
        const data = await this.findAll();
        let skills: Array<SkillData> = []
        data.forEach((_skill: any) => {

        });


        return skills;
    }
}