import { Weapon } from "../controller/object/playerWeapon";
import { Vector3 } from "./utility/Vector3";

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
             * @type {CharctorSatusData}
             * @memberof SimpleDisplayOfCharacter
             */
            public status: Array<CharctorSatusData> = [];

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
         * @class CharctorSatusData
         */
        export class CharctorSatusData{
            // キャラのID
			public charcter_id: number;
			// 最大ヒットポイント
			public max_hp: number;
            // ヒットポイント
			public hp: number;
			// 最大マジックポイント
			public max_mp: number;
            // マジックポイント
            public mp: number;
            // 状態異常
            public status: number;
            constructor(){
				this.charcter_id = 0;
				this.max_hp = 0;
				this.hp = 0;
				this.max_mp = 0;
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
        		/**
		 * セーブデータの読み込み
		 * @export
		 * @class SaveLoadStoC
		 * @implements {Send}
		 */
		export class SaveLoadStoC implements Send{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {SaveLoadStoC}
			 */
			public static readonly id : number = 212;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {SaveLoadStoC}
			 */
			public readonly command : number = SaveLoadStoC.id;
			/**
			 * 位置X
			 * @public
			 * @type {number}
			 * @memberof {SaveLoadStoC}
			 */
			public x : number;
			/**
			 * 位置Y
			 * @public
			 * @type {number}
			 * @memberof {SaveLoadStoC}
			 */
			public y : number;
			/**
			 * 位置Z
			 * @public
			 * @type {number}
			 * @memberof {SaveLoadStoC}
			 */
			public z : number;
			/**
			 * モデルID
			 * @public
			 * @type {number}
			 * @memberof {SaveLoadStoC}
			 */
			public model_id : number;


			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {SaveLoadStoC}
			 */
			public constructor(){
				this.x = -210;
				this.y = 0;
				this.z = -210;
				this.model_id = 0;
			}
		}

        /**
		 * プレイシーンにいる他ユーザーの一覧
		 * @export
		 * @class OtherPlayerList
		 * @implements {Send}
		 */
		export class OtherPlayerList implements Send{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {OtherPlayerList}
			 */
			public static readonly id : number = 214;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {OtherPlayerList}
			 */
			public readonly command : number = OtherPlayerList.id;

            public players: PacketPlayer[];
			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {OtherPlayerList}
			 */
			public constructor(){
                this.players = [];
			}
		}
		/**
		 * キャラクターの詳細
		 * @export
		 * @class FindOfPlayerStoC
		 * @implements {Send}
		 */
		export class FindOfPlayerStoC implements Send{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {FindOfPlayerStoC}
			 */
			public static readonly id : number = 712;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {FindOfPlayerStoC}
			 */
			public readonly command : number = FindOfPlayerStoC.id;
			/**
			 * ユーザーID
			 * @public
			 * @type {number}
			 * @memberof {FindOfPlayerStoC}
			 */
			public user_id : number;
			/**
			 * 位置X
			 * @public
			 * @type {number}
			 * @memberof {FindOfPlayerStoC}
			 */
			public x : number;
			/**
			 * 位置Y
			 * @public
			 * @type {number}
			 * @memberof {FindOfPlayerStoC}
			 */
			public y : number;
			/**
			 * 位置Z
			 * @public
			 * @type {number}
			 * @memberof {FindOfPlayerStoC}
			 */
			public z : number;
			/**
			 * モデルID
			 * @public
			 * @type {number}
			 * @memberof {FindOfPlayerStoC}
			 */
			public model_id : number;
			/**
			 * 名前
			 * @public
			 * @type {string}
			 * @memberof {FindOfPlayerStoC}
			 */
			public name : string;


			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {FindOfPlayerStoC}
			 */
			public constructor(){
				this.user_id = 0;
				this.x = 0;
				this.y = 0;
				this.z = 0;
				this.model_id = 0;
				this.name = '';
			}
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
             * ターゲットのID
             * @public
             * @type {number}
             * @memberof EnemyUseSkill
             */
            public target_id : number;


			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {EnemyUseSkill}
			 */
			public constructor(){
				this.skill_id = 0;
                this.enemy_id = 0;
                this.target_id = 0;
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
		        /**
		 * 他ユーザーの途中ログイン
		 * @export
		 * @class NewOtherUser
		 * @implements {Receive}
		 */
		export class NewOtherUser implements Send{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {NewOtherUser}
			 */
			public static readonly id : number = 215;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {NewOtherUser}
			 */
			public readonly command : number = NewOtherUser.id;
			/**
			 * ユーザーのID
			 * @public
			 * @type {number}
			 * @memberof {NewOtherUser}
			 */
			public user_id : number;
			/**
			 * 位置X
			 * @public
			 * @type {number}
			 * @memberof {NewOtherUser}
			 */
			public x : number;
			/**
			 * 位置Y
			 * @public
			 * @type {number}
			 * @memberof {NewOtherUser}
			 */
			public y : number;
			/**
			 * 位置Z
			 * @public
			 * @type {number}
			 * @memberof {NewOtherUser}
			 */
			public z : number;
			/**
			 * キャラクター名
			 * @public
			 * @type {string}
			 * @memberof {NewOtherUser}
			 */
			public name : string;

			public model_id: number;
			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {NewOtherUser}
			 */
			public constructor(){
				this.user_id = 0;
				this.x = 0;
				this.y = 0;
				this.z = 0;
				this.name = '';
				this.model_id = 0;
			}
		}

		export class LoadingSkillMaster {
			public skills: Array<SkillMasterData>;
			constructor(){
				this.skills = [];
			}
		}

        export type AllTypes = 
        CharacterTransform |
        SimpleDisplayOfCharacter |
        ModelSetting |
        SkillUse |
        LoadCharacter | 
        SaveLoadStoC | 
        LogoutCharacter |
        EnemysData |
        EnemyAlive |
        EnemyDie |
        EnemyUseSkillRequest | 
        EnemyUseSkill | 
        EnemyAttackResult |
        OtherPlayerUseSkill |
        OtherPlayerList |
		FindOfPlayerStoC | 
		NewOtherUser;
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
		 * セーブデータの読み込み
		 * @export
		 * @class SaveLoadCtoS
		 * @implements {Receive}
		 */
		export class SaveLoadCtoS implements Receive{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {SaveLoadCtoS}
			 */
			public static readonly id : number = 211;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {SaveLoadCtoS}
			 */
			public readonly command : number = SaveLoadCtoS.id;

			public user_id : number;

			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {SaveLoadCtoS}
			 */
			public constructor(){
				this.user_id = 0;
			}
		}
		/**
		 * セーブデータの読み込み完了
		 * @export
		 * @class LodingOK
		 * @implements {Receive}
		 */
		export class LodingOK implements Receive{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {LodingOK}
			 */
			public static readonly id : number = 213;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {LodingOK}
			 */
			public readonly command : number = LodingOK.id;

			public user_id : number = 0;
			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {LodingOK}
			 */
			public constructor(){
				this.user_id = 0;
			}
        }
        
		/**
		 * キャラクターの詳細取得
		 * @export
		 * @class FindOfPlayerCtoS
		 * @implements {Receive}
		 */
		export class FindOfPlayerCtoS implements Receive{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {FindOfPlayerCtoS}
			 */
			public static readonly id : number = 711;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {FindOfPlayerCtoS}
			 */
			public readonly command : number = FindOfPlayerCtoS.id;
			/**
			 * ユーザーID
			 * @public
			 * @type {number}
			 * @memberof {FindOfPlayerCtoS}
			 */
			public user_id : number;

			public target_id: number;

			/**
			 * マップID
			 * @public
			 * @type {number}
			 * @memberof {FindOfPlayerCtoS}
			 */
			public map_id : number;


			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {FindOfPlayerCtoS}
			 */
			public constructor(){
				this.user_id = 0;
				this.map_id = 0;
				this.target_id = 0;
			}
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

				/**
		 * モデルの保存
		 * @export
		 * @class SaveModelType
		 * @implements {Receive}
		 */
		export class SaveModelType implements Receive{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {SaveModelType}
			 */
			public static readonly id : number = 713;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {SaveModelType}
			 */
			public readonly command : number = SaveModelType.id;
			/**
			 * ユーザーID
			 * @public
			 * @type {number}
			 * @memberof {SaveModelType}
			 */
			public user_id : number;
			/**
			 * モデルID
			 * @public
			 * @type {number}
			 * @memberof {SaveModelType}
			 */
			public model_id : number;


			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {SaveModelType}
			 */
			public constructor(){
				this.user_id = 0;
				this.model_id = 0;
			}
		}

        export type AllTypes = 
        CharacterTransform | 
        PlayerStatus | 
        LoadCharacter | 
        LogoutCharacter | 
        FindOfPlayerCtoS | 
        GetEnemy | 
        Attack | 
        UserHit |
        LodingOK |
		SaveLoadCtoS | 
		SaveModelType;
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
                case SendData.SaveLoadStoC.id:{
					const data:SendData.SaveLoadStoC = new SendData.SaveLoadStoC();
					data.x = parse.x - 0;
					data.y = parse.y - 0;
					data.z = parse.z - 0;
					data.model_id = parse.model_id - 0;
					return data;
                }
                case SendData.OtherPlayerList.id:{
                    const data:SendData.OtherPlayerList = new SendData.OtherPlayerList();
                    data.players = parse.players;
                    return data;
                }
                case SendData.FindOfPlayerStoC.id:{
					const data:SendData.FindOfPlayerStoC = new SendData.FindOfPlayerStoC();
					data.user_id = parse.user_id - 0;
					data.x = parse.x - 0;
					data.y = parse.y - 0;
					data.z = parse.z - 0;
					data.model_id = parse.model_id - 0;
					data.name = parse.name;
					return data;
				}                
				case SendData.NewOtherUser.id:{
					const data:SendData.NewOtherUser = new SendData.NewOtherUser();
					data.user_id = parse.user_id - 0;
					data.x = parse.x - 0;
					data.y = parse.y - 0;
					data.z = parse.z - 0;
					data.name = parse.name;
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
                case ReceiveData.SaveLoadCtoS.id:{
					const data:ReceiveData.SaveLoadCtoS = new ReceiveData.SaveLoadCtoS();
                    data.user_id = parse.user_id;
                    return data;
                }
                case ReceiveData.LodingOK.id:{
					const data:ReceiveData.LodingOK = new ReceiveData.LodingOK();
                    data.user_id = parse.user_id;
                    return data;
                }
                case ReceiveData.FindOfPlayerCtoS.id:{
					const data:ReceiveData.FindOfPlayerCtoS = new ReceiveData.FindOfPlayerCtoS();
					data.user_id = parse.user_id - 0;
					data.target_id = parse.target_id - 0;
					data.map_id = parse.map_id - 0;
					return data;
				}
				case ReceiveData.SaveModelType.id:
				{
					const data:ReceiveData.SaveModelType = new ReceiveData.SaveModelType();
					data.user_id = parse.user_id - 0;
					data.model_id = parse.model_id - 0;
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

/**
 * プレイヤーの一覧時のデータ
 * @export
 * @class PacketPlayer
 */
export class PacketPlayer{
    public user_id: number = 0;
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;
    public model_id: number = 0;
	public name: string = "";
	
	constructor(_x: number, _y: number, _z: number, _modelId: number, _name: string){
		this.x = _x;
		this.y = _y;
		this.z = _z;
		this.model_id = _modelId;
		this.name = _name;
	}
}

class SkillMasterData{
	public id: number;
	public icon: number;
	public animation: number;
	public effect: number;
	public comment: string;
	public parent: number;
	public max_level: number;

	constructor(_id: number, _icon: number, _animation: number, _effect: number,
		_comment: string, _parent: number, _max_level: number){
			this.id = _id;
			this.icon = _id;
			this.animation = _animation;
			this.effect = _effect;
			this.comment = _comment;
			this.parent = _parent;
			this.max_level = _max_level;
		}
}	