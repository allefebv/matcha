import crypto from 'crypto';

export const hashPassword = (password: string): string =>
	crypto.createHash("sha512").update(password).digest("hex");

export function checkPassword(password: string, hash: string) {
	return new Promise((resolve, reject) => {
		if (hashPassword(password) === hash) {
			resolve();
		} else {
			reject("Password invalid");
		}
	});
}
