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
    
    private id_             : number;
    public get  id()        : number { return this.id_; }
    private name_           : string;
    public get name()       : string { return this.name_; }
    private difficulty_     : number;
    public get difficulty() : number { return this.difficulty_; }
    private targetId_       : number;
    public get targetId()   : number { return this.targetId_; }
    private comment_        : string;
    public get comment()    : string { return this.comment_; }
    private mapId_          : number;
    public get mapId()      : number { return this.mapId_; }
    private time_           : number;
    public get time()       : number { return this.time_; }
    private items_          : Array<number>;
    public get items()      : Array<number> { return this.items_; }


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
        this.id_ = _id;
        this.name_ = _name;
        this.difficulty_ = _difficulty;
        this.targetId_ = _targetId;
        this.comment_ = _comment;
        this.mapId_ = _mapId;
        this.time_  = _time;
        this.items_ = _items;
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


    private constructor(){
        this.dataArray_ = new Array<QuestData>();
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
