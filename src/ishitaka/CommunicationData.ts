/**
 * @fileoverview 通信データの実装ファイル
 * @file CommunicationData.ts
 * @author 石川 貴祥
 * @license Copyright(c) 2019 Ishikawa Takayoshi All Rights Reserved.
 */

/**
 * 通信データ
 * @export
 * @namespace CommunicationData
 */
export namespace CommunicationData{
    /**
     * 通信データ
     * @interface Communication
     */
    interface Communication{
        /**
         * コマンドID
         * @public
         * @readonly
         * @type {number}
         * @memberof Communication
         */
        readonly command : number;
    }

    /**
     * 送信データ
     * @export
     * @namespace SendData
     */
    export namespace SendData{
        /**
         * 送信データ
         * @interface Send
         * @extends {Communication}
         */
        interface Send extends Communication{
            // 何もない
        }

        /**
         * キャラクタ位置情報
         * @export
         * @class CharacterTransform
         * @implements {Send}
         */
        export class CharacterTransform implements Send{
            /**
             * コマンドID
             * @public
             * @static
             * @readonly
             * @type {number}
             * @memberof CharacterTransform
             */
            public static readonly id : number = 201;
            /**
             * コマンドID
             * @public
             * @readonly
             * @type {number}
             * @memberof CharacterTransform
             */
            public readonly command : number = CharacterTransform.id;
            /**
             * キャラクタID
             * @public
             * @type {number}
             * @memberof CharacterTransform
             */
            public user_id : number;
            /**
             * マップID
             * @type {number}
             * @memberof CharacterTransform
             */
            public map_id : number;
            /**
             * X位置座標
             * @public
             * @type {number}
             * @memberof CharacterTransform
             */
            public x : number;
            /**
             * Y位置座標
             * @public
             * @type {number}
             * @memberof CharacterTransform
             */
            public y : number;
            /**
             * Z位置座標
             * @public
             * @type {number}
             * @memberof CharacterTransform
             */
            public z : number;
            /**
             * Y軸回転量
             * @public
             * @type {number}
             * @memberof CharacterTransform
             */
            public dir : number;

            /**
             * デフォルトコンストラクタ
             * @public
             * @constructor
             * @memberof CharacterTransform
             */
            public constructor(){
                this.user_id = 0;
                this.map_id = 0;
                this.x = 0;
                this.y = 0;
                this.z = 0;
                this.dir = 0;
            }
        }

        /**
         * キャラクタ簡易表示情報
         * @export
         * @class SimpleDisplayOfCharacter
         * @implements {Send}
         */
        export class SimpleDisplayOfCharacter implements Send{
            /**
             * コマンドID
             * @public
             * @static
             * @readonly
             * @type {number}
             * @memberof SimpleDisplayOfCharacter
             */
            public static readonly id : number = 205;
            /**
             * コマンドID
             * @public
             * @readonly
             * @type {number}
             * @memberof SimpleDisplayOfCharacter
             */
            public readonly command : number = SimpleDisplayOfCharacter.id;
            /**
             * キャラクタID
             * @public
             * @type {number}
             * @memberof SimpleDisplayOfCharacter
             */
            public user_id : number;
            /**
             * 体力比率 [0%～100%～]
             * 100%以上の場合は2本目以上のバーが重なる
             * @public
             * @type {number}
             * @memberof SimpleDisplayOfCharacter
             */
            public hp : number;
            /**
             * 魔力比率 [0%～100%]
             * 100%以上の場合は2本目以上のバーが重なる
             * @public
             * @type {number}
             * @memberof SimpleDisplayOfCharacter
             */
            public mp : number;
            /**
             * 状態異常フラグ
             * @public
             * @type {number}
             * @memberof SimpleDisplayOfCharacter
             */
            public status : number;

            /**
             * デフォルトコンストラクタ
             * @public
             * @constructor
             * @memberof SimpleDisplayOfCharacter
             */
            public constructor(){
                this.user_id = 0;
                this.hp = 0;
                this.mp = 0;
                this.status = 0;
            }
        }

        /**
         * キャラクタモデル設定情報
         * @export
         * @class ModelSetting
         * @implements {Send}
         */
        export class ModelSetting implements Send{
            /**
             * コマンドID
             * @public
             * @static
             * @readonly
             * @type {number}
             * @memberof ModelSetting
             */
            public static readonly id : number = -1; // TODO
            /**
             * コマンドID
             * @public
             * @readonly
             * @type {number}
             * @memberof ModelSetting
             */
            public readonly command : number = ModelSetting.id;
            /**
             * キャラクタID
             * @public
             * @type {number}
             * @memberof ModelSetting
             */
            public user_id : number;
            /**
             * モデルID
             * @public
             * @type {number}
             * @memberof ModelSetting
             */
            public model_id : number;
            /**
             * 色ID
             * @public
             * @type {number}
             * @memberof ModelSetting
             */
            public color_id : number;

            /**
             * デフォルトコンストラクタ
             * @public
             * @constructor
             * @memberof ModelSetting
             */
            public constructor(){
                this.user_id = 0;
                this.model_id = 0;
                this.color_id = 0;
            }
        }

        /**
         * スキル使用情報
         * @export
         * @class SkillUse
         * @implements {Send}
         */
        export class SkillUse implements Send{
            /**
             * コマンドID
             * @public
             * @static
             * @readonly
             * @type {number}
             * @memberof SkillUse
             */
            public static readonly id : number = -1; // TODO
            /**
             * コマンドID
             * @public
             * @readonly
             * @type {number}
             * @memberof SkillUse
             */
            public readonly command : number = SkillUse.id;
            /**
             * キャラクタID
             * @public
             * @type {number}
             * @memberof SkillUse
             */
            public user_id : number;
            /**
             * スキルID
             * @public
             * @type {number}
             * @memberof SkillUse
             */
            public skill_id : number;

            /**
             * デフォルトコンストラクタ
             * @public
             * @constructor
             * @memberof SkillUse
             */
            public constructor(){
                this.user_id = 0;
                this.skill_id = 0;
            }
        }

        export type AllTypes = 
        CharacterTransform |
        SimpleDisplayOfCharacter |
        ModelSetting |
        SkillUse;
    }
    /**
     * 受信データ
     * @export
     * @namespace ReceiveData
     */
    export namespace ReceiveData{
        /**
         * 受信データ
         * @interface Receive
         * @extends {Communication}
         */
        interface Receive extends Communication{
            // 何もない
        }

        export class TEST implements Receive{
            command: number = 0;
            static id: number = 0;
        }

        export type AllTypes = TEST;
    }

    export type AllTypes = SendData.AllTypes | ReceiveData.AllTypes;
    
    /**
     * コンバータ
     * @export
     * @class Converter
     */
    export class Converter{
        public static Convert(_data:string) : AllTypes|undefined {
            const parse:any = JSON.parse(_data);
            const communicationData:Communication = parse as Communication;
            switch(communicationData.command){
                case SendData.CharacterTransform.id:
                {
                    const data:SendData.CharacterTransform = new SendData.CharacterTransform();
                    data.user_id = parse.user_id;
                    data.map_id = parse.map_id;
                    data.x = parse.x;
                    data.y = parse.y;
                    data.z = parse.z;
                    data.dir = parse.dir;
                    return data;
                }
                case SendData.SimpleDisplayOfCharacter.id:
                {
                    const data:SendData.SimpleDisplayOfCharacter = new SendData.SimpleDisplayOfCharacter();
                    data.user_id = parse.user_id;
                    data.hp = parse.hp;
                    data.mp = parse.mp;
                    data.status = parse.status;
                    return data;
                }
                case SendData.ModelSetting.id:
                {
                    const data:SendData.ModelSetting = new SendData.ModelSetting();
                    data.user_id = parse.user_id;
                    data.model_id = parse.model_id;
                    data.color_id = parse.color_id;
                    return data;
                }
                case SendData.SkillUse.id:
                {
                    const data:SendData.SkillUse = new SendData.SkillUse();
                    data.user_id = parse.user_id;
                    data.skill_id = parse.skill_id;
                    return data;
                }
                case ReceiveData.TEST.id:
                {
                    const data: ReceiveData.TEST = new ReceiveData.TEST();
                    
                }
            }
            console.error("Convert Error");
            return undefined;
        }
    }
}
