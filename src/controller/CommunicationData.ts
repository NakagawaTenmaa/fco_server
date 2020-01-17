import { Weapon } from "../controller/object/playerWeapon";
import { Vector3 } from "./utility/Vector3";
import { version } from "bluebird";

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
			 * アクセサリーID
			 * @type {Array<number>}
			 * @memberof SaveLoadStoC
			 */
			public accessorys: Array<number>;

			public wearing_accessory: Array<number>;

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
				this.accessorys = [];
				this.wearing_accessory = [];
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
			public damage_value : number;

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
				this.damage_value = 0;
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

			public damage_value : number;

			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {EnemyDie}
			 */
			public constructor(){
                this.drop = 0;
				this.unique_id = 0;
				this.damage_value = 0;
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

		export class LoadingSkillMaster implements Send {
			public static readonly id : number = 705;
			public readonly command : number = LoadingSkillMaster.id;
			public version: number;
			public skills: Array<SkillMasterData>;
			constructor(){
				this.version = 0;
				this.skills = [];
			}
		}

		export class LoadingAccessoryMaster implements Send {
			public static readonly id : number = 709;
			public readonly command : number = LoadingAccessoryMaster.id;
			public version : number;
            public accessorys : Array<AccessoryMasterData>;

			constructor(){
				this.version = 0;
				this.accessorys = [];
			}
		}

		export class LoadingMapMaster implements Send {
			public static readonly id : number = 717;
			public readonly command : number = LoadingMapMaster.id;
			public version : number;
			public maps : Array<MapMasterData>;

			constructor(){
				this.version = 0;
				this.maps = [];
			}
		}
/**
		 * マップ移動完了(クエスト受注やリタイアに紐づく)
		 * @export
		 * @class MoveingMapOk
		 * @implements {Send}
		 */
		export class MoveingMapOk implements Send{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {MoveingMapOk}
			 */
			public static readonly id : number = 252;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {MoveingMapOk}
			 */
			public readonly command : number = MoveingMapOk.id;

			public mapId : number;

			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {MoveingMapOk}
			 */
			public constructor(){
				this.mapId = 0;
			}
		}
		/**
		 * 報酬選択完了
		 * @export
		 * @class SelectRewardOk
		 * @implements {Send}
		 */
		export class SelectRewardOk implements Send{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {SelectRewardOk}
			 */
			public static readonly id : number = 254;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {SelectRewardOk}
			 */
			public readonly command : number = SelectRewardOk.id;


			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {SelectRewardOk}
			 */
			public constructor(){
			}
		}
		/**
		 * 永久インべの取得
		 * @export
		 * @class InventoryList
		 * @implements {Send}
		 */
		export class InventoryList implements Send{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {InventoryList}
			 */
			public static readonly id : number = 256;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {InventoryList}
			 */
			public readonly command : number = InventoryList.id;
			/**
			 * アクセサリーID
			 * @public
			 * @type {Array<number>}
			 * @memberof {InventoryList}
			 */
			public accessory_ids : Array<number>;


			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {InventoryList}
			 */
			public constructor(){
				this.accessory_ids = new Array<number>();
			}
		}
		/**
		 * ドロップインベの取得
		 * @export
		 * @class DropInventoryList
		 * @implements {Send}
		 */
		export class DropInventoryList implements Send{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {DropInventoryList}
			 */
			public static readonly id : number = 292;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {DropInventoryList}
			 */
			public readonly command : number = DropInventoryList.id;
			/**
			 * アクセサリーID
			 * @public
			 * @type {Array<number>}
			 * @memberof {DropInventoryList}
			 */
			public accessory_ids : Array<number>;


			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {DropInventoryList}
			 */
			public constructor(){
				this.accessory_ids = new Array<number>();
			}
		}
		/**
		 * クエストマスター取得
		 * @export
		 * @class QuestMasterDataList
		 * @implements {Send}
		 */
		export class QuestMasterDataList implements Send{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {QuestMasterDataList}
			 */
			public static readonly id : number = 714;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {QuestMasterDataList}
			 */
			public readonly command : number = QuestMasterDataList.id;
			/**
			 * クエストID
			 * @public
			 * @type {number}
			 * @memberof {QuestMasterDataList}
			 */
			public id : number;
			/**
			 * 難易度
			 * @public
			 * @type {number}
			 * @memberof {QuestMasterDataList}
			 */
			public difficulty : number;
			/**
			 * アイコンID
			 * @public
			 * @type {number}
			 * @memberof {QuestMasterDataList}
			 */
			public icon_id : number;
			/**
			 * マップID
			 * @public
			 * @type {number}
			 * @memberof {QuestMasterDataList}
			 */
			public map_id : number;
			/**
			 * ドロップ品一覧
			 * @public
			 * @type {Array<number>}
			 * @memberof {QuestMasterDataList}
			 */
			public drop_ids : Array<number>;


			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {QuestMasterDataList}
			 */
			public constructor(){
				this.id = 0;
				this.difficulty = 0;
				this.icon_id = 0;
				this.map_id = 0;
				this.drop_ids = new Array<number>();
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
		NewOtherUser | 
		LoadingSkillMaster | 
		LoadingAccessoryMaster |
		MoveingMapOk |
		SelectRewardOk |
		InventoryList |
		DropInventoryList |
		QuestMasterDataList | 
		LoadingMapMaster;
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

		export class LoadingSkillMaster implements Receive{
			public static readonly id : number = 703;
			public readonly command : number = LoadingSkillMaster.id;
		}

		export class LoadingAccessoryMaster implements Receive {
			public static readonly id : number = 708;
			public readonly command : number = LoadingAccessoryMaster.id;

			public user_id : number;

			constructor(){
				this.user_id = 0;
			}
		}
/**
		 * アクセサリー装備変更
		 * @export
		 * @class AccessoryChange
		 * @implements {Receive}
		 */
		export class AccessoryChange implements Receive{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {AccessoryChange}
			 */
			public static readonly id : number = 207;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {AccessoryChange}
			 */
			public readonly command : number = AccessoryChange.id;
			/**
			 * ユーザーID
			 * @public
			 * @type {number}
			 * @memberof {AccessoryChange}
			 */
			public user_id : number;
			/**
			 * アクセサリーID
			 * @public
			 * @type {number}
			 * @memberof {AccessoryChange}
			 */
			public accessory_id : number;
			/**
			 * 装備部位ID
			 * @public
			 * @type {number}
			 * @memberof {AccessoryChange}
			 */
			public part_id : number;


			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {AccessoryChange}
			 */
			public constructor(){
				this.user_id = 0;
				this.accessory_id = 0;
				this.part_id = 0;
			}
		}
		/**
		 * マップ移動コール(クエスト受注やリタイアに紐づく)
		 * @export
		 * @class MoveingMap
		 * @implements {Receive}
		 */
		export class MoveingMap implements Receive{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {MoveingMap}
			 */
			public static readonly id : number = 251;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {MoveingMap}
			 */
			public readonly command : number = MoveingMap.id;
			/**
			 * ユーザーID
			 * @public
			 * @type {number}
			 * @memberof {MoveingMap}
			 */
			public user_id : number;
			/**
			 * マップID
			 * @public
			 * @type {number}
			 * @memberof {MoveingMap}
			 */
			public map_id : number;


			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {MoveingMap}
			 */
			public constructor(){
				this.user_id = 0;
				this.map_id = 0;
			}
		}
		/**
		 * 報酬選択
		 * @export
		 * @class SelectReward
		 * @implements {Receive}
		 */
		export class SelectReward implements Receive{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {SelectReward}
			 */
			public static readonly id : number = 253;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {SelectReward}
			 */
			public readonly command : number = SelectReward.id;
			/**
			 * ユーザーID
			 * @public
			 * @type {number}
			 * @memberof {SelectReward}
			 */
			public user_id : number;
			/**
			 * アクセサリーID
			 * @public
			 * @type {number}
			 * @memberof {SelectReward}
			 */
			public accessory_id : number;


			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {SelectReward}
			 */
			public constructor(){
				this.user_id = 0;
				this.accessory_id = 0;
			}
		}
		/**
		 * 永久インべの取得コール
		 * @export
		 * @class GetInventory
		 * @implements {Receive}
		 */
		export class GetInventory implements Receive{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {GetInventory}
			 */
			public static readonly id : number = 255;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {GetInventory}
			 */
			public readonly command : number = GetInventory.id;
			/**
			 * ユーザーID
			 * @public
			 * @type {number}
			 * @memberof {GetInventory}
			 */
			public user_id : number;


			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {GetInventory}
			 */
			public constructor(){
				this.user_id = 0;
			}
		}
		/**
		 * ドロップインベの取得コール
		 * @export
		 * @class GetDropInventory
		 * @implements {Receive}
		 */
		export class GetDropInventory implements Receive{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {GetDropInventory}
			 */
			public static readonly id : number = 291;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {GetDropInventory}
			 */
			public readonly command : number = GetDropInventory.id;
			/**
			 * ユーザーID
			 * @public
			 * @type {number}
			 * @memberof {GetDropInventory}
			 */
			public user_id : number;


			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {GetDropInventory}
			 */
			public constructor(){
				this.user_id = 0;
			}
		}
		/**
		 * クエストマスターコール
		 * @export
		 * @class QuestMasterData
		 * @implements {Receive}
		 */
		export class QuestMasterData implements Receive{
			/**
			 * コマンドID
			 * @public
			 * @static 
			 * @readonly 
			 * @type {number}
			 * @memberof {QuestMasterData}
			 */
			public static readonly id : number = 713;

			/**
			 * コマンド識別子
			 * @public
			 * @readonly 
			 * @type {number}
			 * @memberof {QuestMasterData}
			 */
			public readonly command : number = QuestMasterData.id;
			/**
			 * ユーザーID
			 * @public
			 * @type {number}
			 * @memberof {QuestMasterData}
			 */
			public user_id : number;


			/**
			 * デフォルトコンストラクタ
			 * @public
			 * @constructor
			 * @memberof {QuestMasterData}
			 */
			public constructor(){
				this.user_id = 0;
			}
		}

		export class LoadingMapMaster implements Receive{
			public static readonly id : number = 716;
			public readonly command : number = LoadingMapMaster.id;
			public user_id : number ;

			constructor(){
				this.user_id = 0;
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
		SaveModelType | 
		LoadingSkillMaster |
		LoadingAccessoryMaster |
		AccessoryChange |
		MoveingMap |
		SelectReward |
		GetInventory |
		GetDropInventory |
		QuestMasterData | 
		LoadingMapMaster;
    }

    export type AllTypes = SendData.AllTypes | ReceiveData.AllTypes;
    
    /**
     * コンバータ
     * @export
     * @class Converter
     */
    export class Converter{
        public static Convert(_data:string) : AllTypes|undefined {
            const parseData:any = JSON.parse(_data);
            const communicationData:Communication = parseData as Communication;
            switch(communicationData.command){
                case SendData.CharacterTransform.id:
                {
                    const data:SendData.CharacterTransform = new SendData.CharacterTransform();
                    data.user_id = parseData.user_id - 0;
                    data.map_id = parseData.map_id - 0;
                    data.x = parseData.x - 0;
                    data.y = parseData.y - 0;
                    data.z = parseData.z - 0;
                    data.dir = parseData.dir - 0;
                    data.name = parseData.name;
                    return data;
                }
                case SendData.SimpleDisplayOfCharacter.id:
                {
                    const data:SendData.SimpleDisplayOfCharacter = new SendData.SimpleDisplayOfCharacter();
                    data.status = parseData.status;
                    return data;
                }
                case SendData.ModelSetting.id:
                {
                    const data:SendData.ModelSetting = new SendData.ModelSetting();
                    data.user_id = parseData.user_id - 0;
                    data.model_id = parseData.model_id - 0;
                    data.color_id = parseData.color_id - 0;
                    return data;
                }
                case SendData.SkillUse.id:
                {
                    const data:SendData.SkillUse = new SendData.SkillUse();
                    data.user_id = parseData.user_id - 0;
                    data.skill_id = parseData.skill_id - 0;
                    return data;
                }
                case SendData.LoadCharacter.id:
                {
                    const data: SendData.LoadCharacter = new SendData.LoadCharacter();
                    data.exp = parseData.exp - 0;
                    data.lv = parseData.lv - 0;
                    data.position = parseData.position;
                    data.weapon = parseData.weapon;
                    return data;
                }
                case SendData.LogoutCharacter.id:
                {
                    const data: SendData.LogoutCharacter = new SendData.LogoutCharacter();
                    data.user_id = parseData.user_id - 0;
                    return data;
                }
                case SendData.EnemysData.id:
                {
                    const data: SendData.EnemysData = new SendData.EnemysData();
                    data.enemys = parseData.enemys;
                    return data;
                }
				case SendData.EnemyAlive.id:
				{
					const data:SendData.EnemyAlive = new SendData.EnemyAlive();
					data.unique_id = parseData.unique_id - 0;
					data.hp = parseData.hp - 0;
					data.status = parseData.status;
					data.damage_value = parseData.damage_value;
					return data;
				}
				case SendData.EnemyDie.id:
				{
					const data:SendData.EnemyDie = new SendData.EnemyDie();
					data.drop = parseData.drop - 0;
					data.unique_id = parseData.unique_id - 0;
					data.damage_value = parseData.damage_value;
					return data;
                }
                case SendData.OtherPlayerUseSkill.id:
				{
					const data:SendData.OtherPlayerUseSkill = new SendData.OtherPlayerUseSkill();
					data.user_id = parseData.user_id - 0;
					data.skill_id = parseData.skill_id - 0;
					return data;
                }
                case SendData.SaveLoadStoC.id:{
					const data:SendData.SaveLoadStoC = new SendData.SaveLoadStoC();
					data.x = parseData.x - 0;
					data.y = parseData.y - 0;
					data.z = parseData.z - 0;
					data.model_id = parseData.model_id - 0;
					return data;
                }
                case SendData.OtherPlayerList.id:{
                    const data:SendData.OtherPlayerList = new SendData.OtherPlayerList();
                    data.players = parseData.players;
                    return data;
				}
				case ReceiveData.AccessoryChange.id:
				{
					const data:ReceiveData.AccessoryChange = new ReceiveData.AccessoryChange();
					data.user_id = parseData.user_id - 0;
					data.accessory_id = parseData.accessory_id - 0;
					data.part_id = parseData.part_id - 0;
					return data;
				}
				case ReceiveData.MoveingMap.id:
				{
					const data:ReceiveData.MoveingMap = new ReceiveData.MoveingMap();
					data.user_id = parseData.user_id - 0;
					data.map_id = parseData.map_id - 0;
					return data;
				}
				case SendData.MoveingMapOk.id:
				{
					const data:SendData.MoveingMapOk = new SendData.MoveingMapOk();
					return data;
				}
				case ReceiveData.SelectReward.id:
				{
					const data:ReceiveData.SelectReward = new ReceiveData.SelectReward();
					data.user_id = parseData.user_id - 0;
					data.accessory_id = parseData.accessory_id - 0;
					return data;
				}
				case SendData.SelectRewardOk.id:
				{
					const data:SendData.SelectRewardOk = new SendData.SelectRewardOk();
					return data;
				}
				case ReceiveData.GetInventory.id:
				{
					const data:ReceiveData.GetInventory = new ReceiveData.GetInventory();
					data.user_id = parseData.user_id - 0;
					return data;
				}
				case SendData.InventoryList.id:
				{
					const data:SendData.InventoryList = new SendData.InventoryList();
					data.accessory_ids = parseData.accessory_ids;
					return data;
				}
				case ReceiveData.GetDropInventory.id:
				{
					const data:ReceiveData.GetDropInventory = new ReceiveData.GetDropInventory();
					data.user_id = parseData.user_id - 0;
					return data;
				}
				case SendData.DropInventoryList.id:
				{
					const data:SendData.DropInventoryList = new SendData.DropInventoryList();
					data.accessory_ids = parseData.accessory_ids;
					return data;
				}
				case ReceiveData.QuestMasterData.id:
				{
					const data:ReceiveData.QuestMasterData = new ReceiveData.QuestMasterData();
					data.user_id = parseData.user_id - 0;
					return data;
				}
				case SendData.QuestMasterDataList.id:
				{
					const data:SendData.QuestMasterDataList = new SendData.QuestMasterDataList();
					data.id = parseData.id - 0;
					data.difficulty = parseData.difficulty - 0;
					data.icon_id = parseData.icon_id - 0;
					data.map_id = parseData.map_id - 0;
					data.drop_ids = parseData.drop_ids;
					return data;
				}
                case SendData.FindOfPlayerStoC.id:{
					const data:SendData.FindOfPlayerStoC = new SendData.FindOfPlayerStoC();
					data.user_id = parseData.user_id - 0;
					data.x = parseData.x - 0;
					data.y = parseData.y - 0;
					data.z = parseData.z - 0;
					data.model_id = parseData.model_id - 0;
					data.name = parseData.name;
					return data;
				}                
				case SendData.NewOtherUser.id:{
					const data:SendData.NewOtherUser = new SendData.NewOtherUser();
					data.user_id = parseData.user_id - 0;
					data.x = parseData.x - 0;
					data.y = parseData.y - 0;
					data.z = parseData.z - 0;
					data.name = parseData.name;
					return data;
				}
				case SendData.LoadingSkillMaster.id:{
					const data : SendData.LoadingSkillMaster = new SendData.LoadingSkillMaster();
					data.skills = parseData.skills;
					data.version = parseData.version;
					return data;
				}
				case SendData.LoadingAccessoryMaster.id:{
					const data : SendData.LoadingAccessoryMaster = new SendData.LoadingAccessoryMaster();
					data.accessorys = parseData.accessorys;
					data.version = parseData.version;
					return data;
				}


                case ReceiveData.CharacterTransform.id:
                {
                    const data: ReceiveData.CharacterTransform = new ReceiveData.CharacterTransform();
                    data.x = parseData.x - 0;
                    data.y = parseData.y - 0;
                    data.z = parseData.z - 0;
                    data.dir = parseData.dir - 0;
                    data.user_id = parseData.user_id - 0;
                    return data;
                }
                case ReceiveData.LoadCharacter.id:
                {
                    const data: ReceiveData.LoadCharacter = new ReceiveData.LoadCharacter();
                    data.user_id = parseData.user_id - 0;
                    return data;
                }
                case ReceiveData.PlayerStatus.id:
                {
                    const data: ReceiveData.PlayerStatus = new ReceiveData.PlayerStatus();
                    data.user_id = parseData.user_id - 0;
                    data.target_id = parseData.target_id - 0;
                    data.type = parseData.type - 0;
                    return data;
                }
                case ReceiveData.LoadCharacter.id:
                {
                    const data: ReceiveData.LoadCharacter = new ReceiveData.LoadCharacter();
                    data.user_id = parseData.user_id - 0;
                    return data;
                }
                case ReceiveData.LogoutCharacter.id:
                {
                    const data: ReceiveData.LogoutCharacter = new ReceiveData.LogoutCharacter();
                    data.user_id = parseData.user_id - 0;
                    return data;
                }
                case ReceiveData.GetEnemy.id:
                {
                    const data: ReceiveData.GetEnemy = new ReceiveData.GetEnemy();
                    data.map_id = parseData.map_id - 0;
                    data.user_id = parseData.user_id - 0;
                    return data;
                }
                case ReceiveData.Attack.id:
                {
                    const data:ReceiveData.Attack = new ReceiveData.Attack();
                    data.enemy_id = parseData.enemy_id - 0;
                    data.user_id = parseData.user_id - 0;
                    data.skill_id = parseData.skill_id - 0;
                    data.map_id = parseData.map_id - 0;
                    return data;
                }
                case ReceiveData.SaveLoadCtoS.id:{
					const data:ReceiveData.SaveLoadCtoS = new ReceiveData.SaveLoadCtoS();
                    data.user_id = parseData.user_id;
                    return data;
                }
                case ReceiveData.LodingOK.id:{
					const data:ReceiveData.LodingOK = new ReceiveData.LodingOK();
                    data.user_id = parseData.user_id;
                    return data;
                }
                case ReceiveData.FindOfPlayerCtoS.id:{
					const data:ReceiveData.FindOfPlayerCtoS = new ReceiveData.FindOfPlayerCtoS();
					data.user_id = parseData.user_id - 0;
					data.target_id = parseData.target_id - 0;
					data.map_id = parseData.map_id - 0;
					return data;
				}
				case ReceiveData.SaveModelType.id:
				{
					const data:ReceiveData.SaveModelType = new ReceiveData.SaveModelType();
					data.user_id = parseData.user_id - 0;
					data.model_id = parseData.model_id - 0;
					return data;
				}
				case ReceiveData.LoadingSkillMaster.id:
				{
					const data : ReceiveData.LoadingSkillMaster = new ReceiveData.LoadingSkillMaster();
					return data;
				}
				case ReceiveData.LoadingAccessoryMaster.id:
				{
					const data : ReceiveData.LoadingAccessoryMaster = new ReceiveData.LoadingAccessoryMaster();
					data.user_id = parseData.user_id - 0;
					return data;
				}
				case ReceiveData.LoadingMapMaster.id:
				{
					const data : ReceiveData.LoadingMapMaster = new ReceiveData.LoadingMapMaster;
					data.user_id = parseData.user_id;
					return data;
				}
				case SendData.LoadingMapMaster.id:
				{
					const data : SendData.LoadingMapMaster = new SendData.LoadingMapMaster;
					data.maps = parseData.maps;
					data.version = parseData.version;
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

export class SkillMasterData{
	public id						: number; //スキルID
	public icon_id					: number; //アイコンID
	public animation_id				: number; //アニメーションID
	public effect_id				: number; //エフェクトID
	public comment					: string; //効果説明文
	public parent_id				: number; //親スキルID
	public max_level				: number; //最大レベル
	public recast_time				: number; //リキャスト
	public consumption_hit_point	: number; //消費HP
	public consumption_magic_point	: number; //消費MP
	public power					: number; //威力
	public target					: number; //効果ターゲット
	public range					: number; //効果範囲
	public target_type				: number; //効果範囲のタイプ


	constructor(_id: number, _cast_time: number, _recast_time: number, _icon_id: number, _animation_id: number, 
		_consumption_hit_point: number, _consumption_magic_point: number, 
		_power: number, _effect_id: number, _target: number, _range: number, _target_type: number,
		_comment: string, _parent_id: number, _max_level: number){
			this.id = _id;
			this.icon_id = _icon_id;
			this.animation_id = _animation_id;
			this.effect_id = _effect_id;
			this.comment = _comment;
			this.parent_id = _parent_id;
			this.max_level = _max_level;
			this.recast_time = _recast_time;
			this.consumption_hit_point = _consumption_hit_point;
			this.consumption_magic_point = _consumption_magic_point;
			this.power = _power;
			this.target = _target;
			this.target_type = _target_type;
			this.range = _range;
		}
}	

export class AccessoryMasterData {
	public id : number;
	public name : string;
	public level : number;
	public comment : string;

	public hp  : number;
	public mp  : number;
	public str : number;
	public vit : number;
	public int : number;
	public mmd : number;
	public dex : number;
	public agi : number;

	public image : string;

	constructor(
		_id : number, 
		_category : number, 
		_name : string,
		_level : number,
		_comment : string,
		_hp  : number,
		_mp  : number,
		_str : number,
		_vit : number,
		_int : number,
		_mmd : number,
		_dex : number,
		_agi : number,
		_image : string
		){
			this.id = _id;
			this.name = _name;
			this.level = _level;
			this.comment = _comment;
			this.hp = _hp;
			this.mp = _mp;
			this.str = _str;
			this.vit = _vit;
			this.int = _int;
			this.mmd = _mmd;
			this.dex = _dex;
			this.agi = _agi;
			this.image = _image;
	}
}

export class MapMasterData{
	public id: number;
	public x : number;
	public y : number;
	public z : number;
	public dir : number;

	constructor(
		_id : number,
		_x  : number,
		_y  : number,
		_z  : number,
		_dir: number
	){
		this.id = _id;
		this.x  = _x;
		this.y  = _y;
		this.z  = _z;
		this.dir= _dir;
	}
}