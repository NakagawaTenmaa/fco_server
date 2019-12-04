

export class UserMasterData{
    public x: number;
    public y: number;
    public z: number;
    
    public model_id: number;        

    constructor(_x: number, _y: number, _z: number, _modeId: number){
        this.x = _x;
        this.y = _y;
        this.z = _z;
        this.model_id = _modeId;    
    }
}