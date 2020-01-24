/**
 * @fileoverview スキル情報アクセサーの実装ファイル
 * @file SkillDataAccessor.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {DatabaseAccessor} from './DatabaseAccessor'
import { QuestModel } from '../../model/questModel';

/**
 * スキル情報
 * @export
 * @class SkillData
 */
export class QuestData{
    
    public id             : number;
    public name           : string;
    public difficulty     : number;
    public targetId       : number;
    public comment        : string;
    public mapId          : number;
    public time           : number;
    public items          : Array<number>;


    public constructor(
        _id: number,
        _name : string,
        _difficulty: number,
        _targetId : number,
        _comment : string,
        _mapId : number,
        _time  : number,
        _items : Array<number>
    ){
        this.id = _id;
        this.name = _name;
        this.difficulty = _difficulty;
        this.targetId = _targetId;
        this.comment = _comment;
        this.mapId = _mapId;
        this.time  = _time;
        this.items = _items;
    }
}


export class QuestDataAccessor implements DatabaseAccessor{
    private static instance_ ?: QuestDataAccessor = undefined;
    public static get instance() : QuestDataAccessor {
        if(QuestDataAccessor.instance_ === undefined){
            QuestDataAccessor.instance_ = new QuestDataAccessor();
        }
        return QuestDataAccessor.instance_;
    }

    private dataArray_ : Array<QuestData>;
    public get dataArray() : Array<QuestData> {
        return this.dataArray_.concat([]);
    }

    public getAll() : QuestData[]{
        return this.dataArray_;
    }
    private constructor(){
        this.dataArray_ = new Array<QuestData>();
    }

    public findById(_id: number): QuestData|undefined {
        return this.dataArray_.find((_data: QuestData) => { return _data.id === _id; })
    }

    public Find(_id:number) : QuestData|undefined
    public Find(_name:string) : QuestData|undefined
    public Find(_key:number|string) : QuestData|undefined
    public Find(_key:number|string) : QuestData|undefined {
        // number型
        if(typeof(_key) === 'number'){
            return this.dataArray_.filter(
                function(
                    _data : QuestData,
                    _id : number,
                    _array : QuestData[]
                ) : boolean {
                    return (_key === _data.id);
                }
            ).shift();
        }

        // string型
        return this.dataArray_.filter(
            function(
                _data : QuestData,
                _id : number,
                _array : QuestData[]
            ) : boolean {
                return (_key === _data.name);
            }
        ).shift();
    }

    /**
     * データを読み込む [非同期]
     * @public
     * @returns {Promise<boolean>} true:成功 false:失敗
     * @memberof QuestDataAccessor
     */
    public async Load() : Promise<boolean> {
        // TODO:データベースから情報を読み取る
        this.dataArray_ = await QuestModel.getList();
        console.log('Loaded the skill data.');
        return true;
    }
}
