

/**
 * 敵のドロップ品
 * @class EnemyDrop
 */
export class EnemyDrop{
    private items: Array<number> = [];

    /**
     *Creates an instance of EnemyDrop.
     * @memberof EnemyDrop
     */
    constructor(){}

    /**
     * アイテムの追加
     * @param {number} _id
     * @memberof EnemyDrop
     */
    public addItem(_id: number){
        this.items.push(_id);
    }

    /**
     * アイテムをランダムで取得
     * @param {number} _id
     * @memberof EnemyDrop
     */
    public randomItem(): number{
        const num = this.items.length;
        const result = Math.floor(Math.random() * num);
        return this.items[result];
    }
}