// プレイヤークラス
export class Player
{
    public id: number;
    public x: number;
    public y: number;
    public z: number;
    constructor(_id: number){
        this.id = _id;
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
}