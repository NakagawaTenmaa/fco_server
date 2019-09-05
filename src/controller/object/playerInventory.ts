import { getInventoryModel} from './../../model/inventoryModel'

// アイテムの最大数
export const itemMax: number = 30;

// インベントリ管理用クラス
export class Inventory{
    // アイテム一覧
    private items: {[key: number]: number } = [];
    
    // コンストラクタ
    constructor(){
    }

    // 一覧の取得
    public getItemList(): {[key: number]: number }{
        return this.items;
    }    

    // 一覧をDBから取得
    public getItemListBD(userId: number, callback: (data: any) => void){
        getInventoryModel(userId, (data: any) => {
            callback(data);
        });
    }

    // アイテムの追加
    // type (1: 追加) (2 削除)
    // true 成功 / false 失敗
    public changeItem(id: number, num: number, type: number): boolean{
        let result: boolean = false;
        if(type === 1) result = this.addItem(id, num);
        else if(type === 2) result = this.deleteItem(id, num);
        return result;
    }

    // アイテムの追加
    private addItem(id: number, num: number): boolean{
        // 容量オーバー
        if(Object.keys(this.items).length >= 30) return false; 
        // 追加
        if(!this.items[id]) this.items[id] = num;
        else this.items[id] += num;

        return true;
    }

    // アイテムのお削除
    private deleteItem(id: number, num: number): boolean{
        // アイテムがない 
        if(!this.items[id]) return false;
        this.items[id] -= num;
        // なくなった時に削除
        if(this.items[id] <= 0) delete this.items[id];
        return true;
    }
}