import { BaseModel } from './modelBase'
import { SkillData } from '../controller/DatabaseAccessors/SkillDataAccessor';

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