import { BaseModel } from './modelBase'
import { QuestData } from '../controller/DatabaseAccessors/questAccessor';

// 敵のモデル
export class QuestModel extends BaseModel{
    static TABLE_NAME = 'quests';

    // 敵の一覧の取得 連想配列を返す
    public static async getList(): Promise<QuestData[]>{
        const questModel = await QuestModel.findAll();
        let quests: Array<QuestData> = [];
        questModel.forEach((_quest: any) => {
            quests.push(new QuestData(
                _quest.id,
                _quest.name,
                _quest.targetId,
                _quest.comment,
                _quest.mapId
            ));
        })
        
       return quests;
    }
}