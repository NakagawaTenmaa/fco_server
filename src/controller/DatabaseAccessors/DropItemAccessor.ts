import { DatabaseAccessor } from './DatabaseAccessor';
import { EnemyDropModel } from '../../model/enemyDropModel';

export class DropItemData {
    private id_: number;
    public get id() : number { return this.id_; }
    private items_: number[];
    public get items(): number[] { return this.items_; }
    
    constructor(_id: number, _items: number[]){
        this.id_ = _id;
        this.items_ = _items;
    }
}

export class DropItemDataAccessor implements DatabaseAccessor {
    private static instance_ ?: DropItemDataAccessor = undefined;

    public static get instance() : DropItemDataAccessor {
        if(DropItemDataAccessor.instance_ === undefined){
            DropItemDataAccessor.instance_ = new DropItemDataAccessor();
        }
        return DropItemDataAccessor.instance_;
    }

    private dataArray_: Array<DropItemData>;

    private constructor(){
        this.dataArray_ = new Array<DropItemData>();
    }

    public async Load() : Promise<boolean> {
        this.dataArray_ = await EnemyDropModel.createItemsTable();
        console.log('Loaded the drop item data.');
        return true;
    }

    public randomDropId(_dropTable: number): number {
        const data: DropItemData | undefined = this.dataArray_.find((_data: DropItemData) => { return _data.id === _dropTable });
        if(data === undefined) return -1;
        const min: number = 0 ;
        const max: number = data.items.length;
        const index: number = Math.floor(Math.random() * (max + 1 - min)) + min;
        return data.items[index];
    }
}