import { DatabaseAccessor } from './DatabaseAccessor';
import { EnemyDropModel } from '../../model/enemyDropModel';

export class DropItemData {
    private id_: number;
    public get id() : number { return this.id_; }
    private items_: number[];
    public get items(): number[] { return this.items_; }
    private enemyId_: number;
    public get enemyId(): number { return this.enemyId_; }
    
    constructor(_id: number, _items: number[], _enemyId: number){
        this.id_ = _id;
        this.items_ = _items;
        this.enemyId_ = _enemyId;
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
        //this.dataArray_ = await EnemyDropModel.createItemsTable();
        this.dataArray_[0] = new DropItemData(
            0,
            [0, 0, 0, 0],
            0
        );

        console.log('Loaded the drop item data.');
        return true;
    }

}