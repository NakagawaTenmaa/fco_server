import { Weapon } from "../controller/object/playerWeapon";
import { Vector3 } from "./Vector3";

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
            public static readonly id : number = 202;
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
             * 名前
             * @type {string}
             * @memberof CharacterTransform
             */
            public name: string;
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
                this.name = "";
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
            public static readonly id : number = 206;
            /**
             * コマンドID
             * @public
             * @readonly
             * @type {number}
             * @memberof SimpleDisplayOfCharacter
             */
            public readonly command : number = SimpleDisplayOfCharacter.id;

            /**
             * キャラクターのデータ
             * @type {StatusData}
             * @memberof SimpleDisplayOfCharacter
             */
            public status: Array<StatusData> = [];

            /**
             * デフォルトコンストラクタ
             * @public
             * @constructor
             * @memberof SimpleDisplayOfCharacter
             */
            public constructor(){
            }
        }


        /**
         * 状態共有用のデータ
         * @class StatusData
         */
        export class StatusData{
            // キャラのID
            public charcter_id: number;
            // ヒットポイント
            public hp: number;
            // マジックポイント
            public mp: number;
            // 状態異常
            public status: number;
            constructor(){
                this.charcter_id = 0;
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
            public static readonly id : number = 213;
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

        export class LoadCharacter implements Send{
            public readonly command: number = 210;
            public static id = 210;
            public weapon: Weapon = new Weapon();
            public position: Vector3 = new Vector3();
            public lv: number = 0;
            public exp: number = 0;
            constructor(){}
        }

        export class InitCharacter implements Send{
            public readonly command: number = 212;
            public static id: number = 212;
            public user_id: number = 0;
            public name: string = "";
            constructor(){}
        }

        // キャラクターのログアウト
        export class LogoutCharacter implements Send {
            public readonly command: number = 707;
            public static id: number = 707;
            public user_id: number = 0;
            constructor(){}
        }


        /**
         * 敵の送信
         * @export
         * @class EnemysData
         * @implements {Send}
         */
        export class EnemysData implements Send {
            public readonly command: number = 204;
            public static id = 204;
            public enemys: Array<SendEnemyData> = [];
            constructor(){}
        }

        /**
		 * 判定後生きている
		 * @export
		 * @class EnemyAlive
		 * @implements {Send}
		 */
		export class EnemyAlive implements Send{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {EnemyAlive}
			 */
			public static readonly id : number = 221;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {EnemyAlive}
			 */
			public readonly command : number = EnemyAlive.id;
			/**
			 * 敵のID
			 * @public
			 * @type {number}
			 * @memberof {EnemyAlive}
			 */
			public unique_id : number;
			/**
			 * ヒットポイント
			 * @public
			 * @type {number}
			 * @memberof {EnemyAlive}
			 */
			public hp : number;
			/**
			 * 状態
			 * @public
			 * @type {number}
			 * @memberof {EnemyAlive}
			 */
			public status : number;


			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {EnemyAlive}
			 */
			public constructor(){
				this.unique_id = 0;
				this.hp = 0;
				this.status = 0;
			}
		}
		/**
		 * 判定後死亡
		 * @export
		 * @class EnemyDie
		 * @implements {Send}
		 */
		export class EnemyDie implements Send{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {EnemyDie}
			 */
			public static readonly id : number = 222;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {EnemyDie}
			 */
			public readonly command : number = EnemyDie.id;
			/**
			 * ドロップ品のID
			 * @public
			 * @type {number}
			 * @memberof {EnemyDie}
			 */
			public drop : number;
			/**
			 * 敵のID
			 * @public
			 * @type {number}
			 * @memberof {EnemyDie}
			 */
			public unique_id : number;


			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {EnemyDie}
			 */
			public constructor(){
                this.drop = 0;
                this.unique_id = 0;
			}
        }
        
        /**
		 * 敵のスキル使用申請
		 * @export
		 * @class EnemyUseSkillRequest
		 * @implements {Send}
		 */
		export class EnemyUseSkillRequest implements Send{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {EnemyUseSkillRequest}
			 */
			public static readonly id : number = 225;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {EnemyUseSkillRequest}
			 */
			public readonly command : number = EnemyUseSkillRequest.id;
			/**
			 * スキルのID
			 * @public
			 * @type {number}
			 * @memberof {EnemyUseSkillRequest}
			 */
			public skill_id : number;
			/**
			 * 敵のID
			 * @public
			 * @type {number}
			 * @memberof {EnemyUseSkillRequest}
			 */
			public enemy_id : number;


			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {EnemyUseSkillRequest}
			 */
			public constructor(){
				this.skill_id = 0;
				this.enemy_id = 0;
			}
		}
		/**
		 * 敵のスキル使用
		 * @export
		 * @class EnemyUseSkill
		 * @implements {Send}
		 */
		export class EnemyUseSkill implements Send{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {EnemyUseSkill}
			 */
			public static readonly id : number = 226;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {EnemyUseSkill}
			 */
			public readonly command : number = EnemyUseSkill.id;
			/**
			 * スキルのID
			 * @public
			 * @type {number}
			 * @memberof {EnemyUseSkill}
			 */
			public skill_id : number;
			/**
			 * 敵のID
			 * @public
			 * @type {number}
			 * @memberof {EnemyUseSkill}
			 */
			public enemy_id : number;


			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {EnemyUseSkill}
			 */
			public constructor(){
				this.skill_id = 0;
				this.enemy_id = 0;
			}
		}
		/**
		 * 敵の攻撃
		 * @export
		 * @class EnemyAttackResult
		 * @implements {Send}
		 */
		export class EnemyAttackResult implements Send{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {EnemyAttackResult}
			 */
			public static readonly id : number = 227;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {EnemyAttackResult}
			 */
			public readonly command : number = EnemyAttackResult.id;
			/**
			 * ユーザーのID
			 * @public
			 * @type {number}
			 * @memberof {EnemyAttackResult}
			 */
			public user_id : number;
			/**
			 * ヒットポイント
			 * @public
			 * @type {number}
			 * @memberof {EnemyAttackResult}
			 */
			public hp : number;


			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {EnemyAttackResult}
			 */
			public constructor(){
				this.user_id = 0;
				this.hp = 0;
			}
        }
        /**
		 * 他のプレイヤーがスキルを使用したとき
		 * @export
		 * @class OtherPlayerUseSkill
		 * @implements {Send}
		 */
		export class OtherPlayerUseSkill implements Send{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {OtherPlayerUseSkill}
			 */
			public static readonly id : number = 224;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {OtherPlayerUseSkill}
			 */
			public readonly command : number = OtherPlayerUseSkill.id;
			/**
			 * 使用者ID
			 * @public
			 * @type {number}
			 * @memberof {OtherPlayerUseSkill}
			 */
			public user_id : number;
			/**
			 * スキルID
			 * @public
			 * @type {number}
			 * @memberof {OtherPlayerUseSkill}
			 */
			public skill_id : number;


			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {OtherPlayerUseSkill}
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
        SkillUse |
        LoadCharacter | 
        InitCharacter | 
        LogoutCharacter |
        EnemysData |
        EnemyAlive |
        EnemyDie |
        EnemyUseSkillRequest | 
        EnemyUseSkill | 
        EnemyAttackResult |
        OtherPlayerUseSkill;
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

        // 位置同期
        export class CharacterTransform implements Receive{
            public readonly command: number = 201;
            public static id: number = 201;
            public user_id: number = 0;
            public x: number;
            public y: number;
            public z: number;
            public dir: number;
            constructor(){
                this.x = 0;
                this.y = 0;
                this.z = 0;
                this.dir = 0;
            }
        }



        // プレイヤーの状態
        export class PlayerStatus implements Receive{
            public readonly command: number = 205;
            public static id = 205;
            public user_id: number = 0;
            public target_id: number = 0;
            public type: number = 0;

            constructor(){}
        }

        // セーブデータの読み込み
        export class LoadCharacter implements Receive{
            public readonly command: number = 209;
            public static id = 209;
            public user_id = 0;
        }


        /**
         * 読み込み完了
         * @export
         * @class LoadOK
         * @implements {Receive}
         */
        export class LoadOK implements Receive{
            public readonly command: number = 211;
            public static id = 211;
            public user_id: number = 0;
            constructor(){}
        }

        // ログアウト
        export class LogoutCharacter implements Receive {
            public readonly command: number = 701;
            public static id = 701;
            public user_id = 0;
            constructor(){}
        }

        /**
         * 敵の取得
         * @export
         * @class GetEnemy
         * @implements {Receive}
         */
        export class GetEnemy implements Receive {
            public readonly command: number = 203;
            public static id = 203;
            public map_id: number = 0;
            public user_id: number = 0;
        }

        /**
		 * 攻撃
		 * @export
		 * @class Attack
		 * @implements {Receive}
		 */
		export class Attack implements Receive{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {Attack}
			 */
			public static readonly id : number = 220;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {Attack}
			 */
			public readonly command : number = Attack.id;
			/**
			 * 敵のID
			 * @public
			 * @type {number}
			 * @memberof {Attack}
			 */
			public enemy_id : number;
			/**
			 * プレイヤーID
			 * @public
			 * @type {number}
			 * @memberof {Attack}
			 */
			public user_id : number;
			/**
			 * スキルID
			 * @public
			 * @type {number}
			 * @memberof {Attack}
			 */
			public skill_id : number;
			/**
			 * マップのID
			 * @public
			 * @type {number}
			 * @memberof {Attack}
			 */
			public map_id : number;


			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {Attack}
			 */
			public constructor(){
				this.enemy_id = 0;
				this.user_id = 0;
				this.skill_id = 0;
				this.map_id = 0;
			}
        }
        
        /**
		 * comment
		 * @export
		 * @class UserHit
		 * @implements {Receive}
		 */
		export class UserHit implements Receive{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {UserHit}
			 */
			public static readonly id : number = 228;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {UserHit}
			 */
			public readonly command : number = UserHit.id;
			/**
			 * ユーザーのID
			 * @public
			 * @type {number}
			 * @memberof {UserHit}
			 */
			public user_id : number;
			/**
			 * 敵のID
			 * @public
			 * @type {number}
			 * @memberof {UserHit}
			 */
			public enemy_id : number;


			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {UserHit}
			 */
			public constructor(){
				this.user_id = 0;
				this.enemy_id = 0;
			}
		}

        export type AllTypes = 
        CharacterTransform | 
        PlayerStatus | 
        LoadCharacter | 
        LogoutCharacter | 
        LoadOK | 
        GetEnemy | 
        Attack | 
        UserHit;
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
                    data.user_id = parse.user_id - 0;
                    data.map_id = parse.map_id - 0;
                    data.x = parse.x - 0;
                    data.y = parse.y - 0;
                    data.z = parse.z - 0;
                    data.dir = parse.dir - 0;
                    data.name = parse.name;
                    return data;
                }
                case SendData.SimpleDisplayOfCharacter.id:
                {
                    const data:SendData.SimpleDisplayOfCharacter = new SendData.SimpleDisplayOfCharacter();
                    data.status = parse.status;
                    return data;
                }
                case SendData.ModelSetting.id:
                {
                    const data:SendData.ModelSetting = new SendData.ModelSetting();
                    data.user_id = parse.user_id - 0;
                    data.model_id = parse.model_id - 0;
                    data.color_id = parse.color_id - 0;
                    return data;
                }
                case SendData.SkillUse.id:
                {
                    const data:SendData.SkillUse = new SendData.SkillUse();
                    data.user_id = parse.user_id - 0;
                    data.skill_id = parse.skill_id - 0;
                    return data;
                }
                case SendData.LoadCharacter.id:
                {
                    const data: SendData.LoadCharacter = new SendData.LoadCharacter();
                    data.exp = parse.exp - 0;
                    data.lv = parse.lv - 0;
                    data.position = parse.position;
                    data.weapon = parse.weapon;
                    return data;
                }
                case SendData.InitCharacter.id:
                {
                    const data: SendData.InitCharacter = new SendData.InitCharacter();
                    data.user_id = parse.user_id - 0;
                    data.name = parse.name;
                    return data;
                }
                case SendData.LogoutCharacter.id:
                {
                    const data: SendData.LogoutCharacter = new SendData.LogoutCharacter();
                    data.user_id = parse.user_id - 0;
                    return data;
                }
                case SendData.EnemysData.id:
                {
                    const data: SendData.EnemysData = new SendData.EnemysData();
                    data.enemys = parse.enemys;
                    return data;
                }
				case SendData.EnemyAlive.id:
				{
					const data:SendData.EnemyAlive = new SendData.EnemyAlive();
					data.unique_id = parse.unique_id - 0;
					data.hp = parse.hp - 0;
					data.status = parse.status;
					return data;
				}
				case SendData.EnemyDie.id:
				{
					const data:SendData.EnemyDie = new SendData.EnemyDie();
					data.drop = parse.drop - 0;
					data.unique_id = parse.unique_id - 0;
					return data;
                }
                case SendData.OtherPlayerUseSkill.id:
				{
					const data:SendData.OtherPlayerUseSkill = new SendData.OtherPlayerUseSkill();
					data.user_id = parse.user_id - 0;
					data.skill_id = parse.skill_id - 0;
					return data;
				}



                case ReceiveData.CharacterTransform.id:
                {
                    const data: ReceiveData.CharacterTransform = new ReceiveData.CharacterTransform();
                    data.x = parse.x - 0;
                    data.y = parse.y - 0;
                    data.z = parse.z - 0;
                    data.dir = parse.dir - 0;
                    data.user_id = parse.user_id - 0;
                    return data;
                }
                case ReceiveData.LoadCharacter.id:
                {
                    const data: ReceiveData.LoadCharacter = new ReceiveData.LoadCharacter();
                    data.user_id = parse.user_id - 0;
                    return data;
                }
                case ReceiveData.PlayerStatus.id:
                {
                    const data: ReceiveData.PlayerStatus = new ReceiveData.PlayerStatus();
                    data.user_id = parse.user_id - 0;
                    data.target_id = parse.target_id - 0;
                    data.type = parse.type - 0;
                    return data;
                }
                case ReceiveData.LoadCharacter.id:
                {
                    const data: ReceiveData.LoadCharacter = new ReceiveData.LoadCharacter();
                    data.user_id = parse.user_id - 0;
                    return data;
                }
                case ReceiveData.LogoutCharacter.id:
                {
                    const data: ReceiveData.LogoutCharacter = new ReceiveData.LogoutCharacter();
                    data.user_id = parse.user_id - 0;
                    return data;
                }
                case ReceiveData.LoadOK.id:
                {
                    const data: ReceiveData.LoadOK = new ReceiveData.LoadOK();
                    data.user_id = parse.user_id - 0;
                    return data;
                }
                case ReceiveData.GetEnemy.id:
                {
                    const data: ReceiveData.GetEnemy = new ReceiveData.GetEnemy();
                    data.map_id = parse.map_id - 0;
                    data.user_id = parse.user_id - 0;
                    return data;
                }
                case ReceiveData.Attack.id:
                {
                    const data:ReceiveData.Attack = new ReceiveData.Attack();
                    data.enemy_id = parse.enemy_id - 0;
                    data.user_id = parse.user_id - 0;
                    data.skill_id = parse.skill_id - 0;
                    data.map_id = parse.map_id - 0;
                    return data;
                }
            }
            console.error("Convert Error");
            return undefined;
        }
    }
}
/**
    * 送信用敵情報
    * @class SendEnemyData
*/
export class SendEnemyData {
    public unique_id: number = 0;
    public master_id: number = 0;
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;
    public dir: number = 0;
    public hp: number = 0; 
}