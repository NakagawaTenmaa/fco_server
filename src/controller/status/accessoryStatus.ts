import { AccessoryData } from './../DatabaseAccessors/AccessoryAccessor';

export class AccessoryStatus {
    private accessryData_ : AccessoryData;

    constructor(){
        this.accessryData_ = new AccessoryData(
            0,'',0,'',0,0,0,0,0,0,0,0,''
        );
    }

    public get strength() : number{
        return this.accessryData_.str;
    }
    
    public get vitality() : number{
        return this.accessryData_.vit;
    }
    
    public get intelligence() : number{
        return this.accessryData_.int;
    }
    
    public get mind() : number {
        return this.accessryData_.mmd;
    }
    
    public get dexterity() : number{
        return this.accessryData_.dex;
    }
    
    public get agility() : number{
        return this.accessryData_.agi;
    }

    public get hitpoint() : number {
        return this.accessryData_.hp;
    }

    public get magicpoint() : number {
        return this.accessryData_.mp;
    }

    public get id() : number{
        return this.accessryData_.id;
    }

    public ChangeAccessory(_accessryData: AccessoryData){
        this.accessryData_ = _accessryData;
    }
}