import { db } from "../../app";
import appSettings from "../../appSettings";

export async function dbUserByLogin(login: string) {
	return new Promise((resolve, reject) => {
		db.collection(appSettings.mongoDb.collections.user).findOne(
			{ login: login },
			(err, result) => {
				if (err) {
					reject(err);
				}
				resolve(result);
			}
		);
	});
}
