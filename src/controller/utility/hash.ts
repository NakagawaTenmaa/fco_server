import {hash, genSalt} from "bcrypt";

const figureLength: number = 10;

// ハッシュ化
export async function CreateHash(str: string,salt: string): Promise<string>{
    return hash(str,salt);
}

// ソルト値の作成
export async function CreateSalt(): Promise<string>{
    return genSalt(figureLength);
}