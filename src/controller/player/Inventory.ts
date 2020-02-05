
// インベントリ管理用クラス
export class Inventory{
    // アイテムの最大数
    private readonly MAX_ITEM: number = 90;
    // アイテム一覧
    private items: Array<number> = [];
    
    // コンストラクタ
    constructor(){

    }

    // 一覧の取得
    public getItemList(): Array<number> {
        return this.items;
    }    

    // アイテムの追加
    public add(_id: number, _index: number) : boolean {
        if(_index >= this.MAX_ITEM) return false;

        this.items[_index] = _id;
        return true;
    }

    // 最後尾にアイテムを追加
    public addLast(_id: number) : boolean{
        if(_id === undefined || _id === 0) return false; 
        this.items.push(_id);
        return true;
    }

    // アイテムを捨てる
    public releaseItem(_index: number) {
        if(_index >= this.MAX_ITEM) return;
        this.items[_index] = 0;
    }

    // アイテムの全破棄
    public allReleaseItem() {
        this.items.forEach((_item: number) => {
            _item = 0;
        })
    }

    // アイテム一括設定
    public setItems(_items: Array<number>){
        this.items = _items;
    }
}