import { hash, genSalt } from "bcrypt";

const figureLength: number = 10;

// ハッシュ化
export async function createHash(str: string,salt: string): Promise<string>{
    return hash(str,salt);
}

// ソルト値の作成
export async function createSalt(): Promise<string>{
    return genSalt(figureLength);
}