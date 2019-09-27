import { BaseModel } from './modelBase'

// ユーザーのセーブデータ
class UserMaster extends BaseModel{
    constructor(){
        super('save_data');
    }

    // ユーザーの読み込み
    public async findOne(id: number){
        const data = await this.find(["id", id]);
        return data[0];
    }
}