/**
 * @fileoverview プレイヤーステータスの実装ファイル
 * @file PlayerSutatus.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

import {CharacterStatus} from './../character/CharacterStatus'
import {LevelStatus} from './../status/LevelStatus'
import {PointStatus} from './../status/PointStatus'
import {AbnormalConditionStatus} from './../status/AbnormalConditionStatus'
import {JobData} from './../DatabaseAccessors/JobDataAccessor'
import { AccessoryStatus } from './../status/accessoryStatus';
import { AccessoryData } from '../DatabaseAccessors/AccessoryAccessor'

/**
 * プレイヤーステータス
 * @export
 * @class PlayerStatus
 * @implements {CharacterStatus}
 */
export class PlayerStatus implements CharacterStatus {
    private readonly MAX_ACCESSORY = 4;

    /**
     * レベルステータス
     * @private
     * @type {LevelStatus}
     * @memberof PlayerStatus
     */
    private levelStatus_ : LevelStatus;
    
    /**
     * アクセサリーのステータス
     * @private
     * @type {number}
     * @memberof PlayerStatus
     */
    private accessoryStatus_ : Array<AccessoryStatus>;

    /**
     * ポイントステータス
     * @private
     * @type {PointStatus}
     * @memberof PlayerStatus
     */
    private pointStatus_ : PointStatus;
    /**
     * 状態異常ステータス
     * @private
     * @type {AbnormalConditionStatus}
     * @memberof PlayerStatus
     */
    private abnormalConditionStatus_ : AbnormalConditionStatus;
    /**
     * 体力
     * @private
     * @type {number}
     * @memberof PlayerStatus
     */
    private hitPoint_ : number;
    /**
     * 魔力
     * @private
     * @type {number}
     * @memberof PlayerStatus
     */
    private magicPoint_ : number;

    /**
     * レベルステータス
     * @public
     * @readonly
     * @type {LevelStatus}
     * @memberof PlayerStatus
     */
    public get levelStatus() : LevelStatus{
        return this.levelStatus_;
    }
    /**
     * レベル
     * @public
     * @type {number}
     * @memberof PlayerStatus
     */
    public get level() : number {
        return this.levelStatus_.level;
    }
    /**
     * ポイントステータス
     * @public
     * @readonly
     * @type {PointStatus}
     * @memberof PlayerStatus
     */
    public get pointStatus() : PointStatus{
        return this.pointStatus_;
    }
    /**
     * 状態異常ステータス
     * @public
     * @readonly
     * @type {AbnormalConditionStatus}
     * @memberof PlayerStatus
     */
    public get abnormalConditionStatus() : AbnormalConditionStatus{
        return this.abnormalConditionStatus_;
    }
    /**
     * 最大体力
     * @public
     * @readonly
     * @type {number}
     * @memberof PlayerStatus
     */
    public get maxHitPoint() : number {
        let accessoryHitPoint = 0;
        this.accessoryStatus_.forEach((_accessory: AccessoryStatus) =>{
            accessoryHitPoint += _accessory.hitpoint;
        })
        return (
            this.levelStatus_.maxHitPoint +
            this.pointStatus_.maxHitPoint +
            this.abnormalConditionStatus_.maxHitPoint +
            accessoryHitPoint
        );
    }
    /**
     * 体力
     * @public
     * @type {number}
     * @memberof PlayerStatus
     */
    public get hitPoint() : number {
        return this.hitPoint_;
    }
    public set hitPoint(_hitPoint:number){
        this.hitPoint_ = (_hitPoint < 0.0) ? (0.0) :
            ((_hitPoint > this.maxHitPoint) ? (this.maxHitPoint) :
                (_hitPoint));
    }
    /**
     * 最大魔力
     * @public
     * @readonly
     * @type {number}
     * @memberof PlayerStatus
     */
    public get maxMagicPoint() : number {
        let accessoryMagicPoint = 0;
        this.accessoryStatus_.forEach((_accessory: AccessoryStatus) =>{
            accessoryMagicPoint += _accessory.magicpoint;
        })
        return (
            this.levelStatus_.maxMagicPoint +
            this.pointStatus_.maxMagicPoint +
            this.abnormalConditionStatus_.maxMagicPoint + 
            accessoryMagicPoint
        );
    }
    /**
     * 魔力
     * @public
     * @type {number}
     * @memberof PlayerStatus
     */
    public get magicPoint() : number {
        return this.magicPoint_;
    }
    public set magicPoint(_magicPoint:number){
        this.magicPoint_ = (_magicPoint < 0.0) ? (0.0) :
            ((_magicPoint > this.maxMagicPoint) ? (this.maxMagicPoint) :
                (_magicPoint));
    }
    /**
     * 物理攻撃力
     * @public
     * @readonly
     * @type {number}
     * @memberof PlayerStatus
     */
    public get strength() : number {
        let accessoryStrength = 0;
        this.accessoryStatus_.forEach((_accessory: AccessoryStatus) =>{
            accessoryStrength += _accessory.strength;
        })
        return (
            this.levelStatus_.strength +
            this.pointStatus_.strength +
            this.abnormalConditionStatus_.strength +
            accessoryStrength
        );
    }
    /**
     * 物理防御力
     * @public
     * @readonly
     * @type {number}
     * @memberof PlayerStatus
     */
    public get vitality() : number {
        let accessoryVitality = 0;
        this.accessoryStatus_.forEach((_accessory: AccessoryStatus) =>{
            accessoryVitality += _accessory.vitality;
        })
        return (
            this.levelStatus_.vitality +
            this.pointStatus_.vitality +
            this.abnormalConditionStatus_.vitality +
            accessoryVitality
        );
    }
    /**
     * 魔法攻撃力
     * @public
     * @readonly
     * @type {number}
     * @memberof PlayerStatus
     */
    public get intelligence() : number {
        let accessoryIntelligence = 0;
        this.accessoryStatus_.forEach((_accessory: AccessoryStatus) =>{
            accessoryIntelligence += _accessory.intelligence;
        })
        return (
            this.levelStatus_.intelligence +
            this.pointStatus_.intelligence +
            this.abnormalConditionStatus_.intelligence +
            accessoryIntelligence
        );
    }
    /**
     * 魔法防御力
     * @public
     * @readonly
     * @type {number}
     * @memberof PlayerStatus
     */
    public get mind() : number {
        let accessoryMind = 0;
        this.accessoryStatus_.forEach((_accessory: AccessoryStatus) =>{
            accessoryMind += _accessory.mind;
        })
        return (
            this.levelStatus_.mind +
            this.pointStatus_.mind +
            this.abnormalConditionStatus_.mind +
            accessoryMind
        );
    }
    /**
     * 器用さ
     * @public
     * @readonly
     * @type {number}
     * @memberof PlayerStatus
     */
    public get dexterity() : number {
        let accessoryDexterity = 0;
        this.accessoryStatus_.forEach((_accessory: AccessoryStatus) =>{
            accessoryDexterity += _accessory.dexterity;
        })
        return (
            this.levelStatus_.dexterity +
            this.pointStatus_.dexterity +
            this.abnormalConditionStatus_.dexterity +
            accessoryDexterity
        );
    }
    /**
     * 敏捷性
     * @public
     * @readonly
     * @type {number}
     * @memberof PlayerStatus
     */
    public get agility() : number {
        let accessoryAgility = 0;
        this.accessoryStatus_.forEach((_accessory: AccessoryStatus) =>{
            accessoryAgility += _accessory.agility;
        })
        return (
            this.levelStatus_.agility +
            this.pointStatus_.agility +
            this.abnormalConditionStatus_.agility +
            accessoryAgility
        );
    
    }

    
    /**
     * 死んでいるか?
     * @public
     * @readonly
     * @type {boolean}
     * @memberof PlayerStatus
     */
    public get isDead() : boolean {
        return (this.hitPoint <= 0.0);
    }


    /**
     * デフォルトコンストラクタ
     * @public
     * @constructor
     * @memberof PlayerStatus
     */
    public constructor(){
        this.levelStatus_ = new LevelStatus();
        this.pointStatus_ = new PointStatus();
        this.abnormalConditionStatus_ = new AbnormalConditionStatus();
        this.hitPoint_ = 0;
        this.magicPoint_ = 0;

        this.accessoryStatus_ = [];
        for(let i = 0; i < this.MAX_ACCESSORY; i++){
            this.accessoryStatus_.push(new AccessoryStatus());
        }
    }


    /**
     * 初期化
     * @public
     * @memberof PlayerStatus
     */
    public Initialize() : void {
        this.abnormalConditionStatus_.Initialize();
        this.hitPoint_ = this.maxHitPoint;
        this.magicPoint_ = this.maxMagicPoint;
    }

    /**
     * 職業の変更
     * @public
     * @param {JobData} _jobData 職業データ
     * @memberof PlayerStatus
     */
    public ChangeJob(_jobData:JobData) : void {
        this.levelStatus_.ChangeJob(_jobData);
    }

    public ChangeAccessory(_accessoryData: AccessoryData, _index: number) : void{
        if(_index >= this.MAX_ACCESSORY) return;
        this.accessoryStatus_[_index].ChangeAccessory(_accessoryData);
    }

    public ChangeAllAccessory(_accessorys: Array<AccessoryData>){
        _accessorys.forEach((_data: AccessoryData, _index: number) => {
            this.accessoryStatus_[_index].ChangeAccessory(_data);
        });
    }

    public getAccessoryId(): Array<number>{
        let datas: Array<number> = [];
        this.accessoryStatus_.forEach((_data: AccessoryStatus) =>{
            datas.push(_data.id);
        })
        console.log("accessory saveing : " + JSON.stringify(datas));
        return datas;
    }
}
