import { BaseModel } from "./modelBase";



/**
 * スキルのモデル
 * @export
 * @class SkillModel
 * @extends {BaseModel}
 */
export class SkillModel extends BaseModel{
    
    /**
     * スキルの一覧取得
     * @returns {Promise<any>}
     * @memberof SkillModel
     */
    public async getSkillList(): Promise<any>{
        const skillModel = await this.findAll();
        let skill = "";

        return skill;
    }
}