import crypto from "crypto";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10; // Maior segurança, mas sem comprometer muito a performance

const getEncryptionKey = (): Buffer => {
	const key = process.env.HASHING_SECRET || "default_secret_key_for_aes256!";
	return Buffer.from(key.padEnd(32, " "), "utf8");
};

/**
 * Gera um hash seguro para a senha do usuário.
 * Aplica SHA-256 antes do bcrypt.
 */
export async function hashPassword(password: string): Promise<string> {
	const key = getEncryptionKey();
	const sha256Hash = crypto
		.createHash("sha256")
		.update(password + key)
		.digest("hex");
	return bcrypt.hash(sha256Hash, SALT_ROUNDS);
}

/**
 * Compara uma senha em texto puro com um hash armazenado.
 */
export async function comparePassword(
	password: string,
	hash: string,
): Promise<boolean> {
	const key = getEncryptionKey();
	const sha256Hash = crypto
		.createHash("sha256")
		.update(password + key)
		.digest("hex");
	return bcrypt.compare(sha256Hash, hash);
}
