import { dataBase } from '../../app';

export async function userByUsername(username: string) {
	return new Promise((resolve, reject) => {
		dataBase.query(
			`SELECT * FROM user WHERE username = '${username}'`,
			(error, result) => {
				if (error) {
					reject(error);
				}
				resolve(result);
			}
		);
	});
}

function generateActivationKey() {
	let result = '';
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (var i = 0; i < 32; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}
	return result;
}

export async function userRegister(userInformation) {
	return new Promise((resolve, reject) => {
		var sqlUserRegister =
			"INSERT INTO user (username, email, password, registrationDate, activated, activationKey) VALUES ('" +
			userInformation.username +
			"', '" +
			userInformation.email +
			"', '" +
			userInformation.password +
			"', '" +
			new Date().toISOString().slice(0, 19).replace('T', ' ') +
			"', " +
			'FALSE' +
			", '" +
			generateActivationKey() +
			"')";
		console.log(sqlUserRegister);
		dataBase.query(sqlUserRegister, (error, result) => {
			if (error) {
				throw error;
			}
			resolve(result);
			console.log('1 record inserted');
		});
	});
}

/*
		const params = [
			'id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT',
			'username TEXT NOT NULL',
			'email TEXT NOT NULL',
			'password TEXT NOT NULL',
			'registrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL',
			'activated BOOLEAN DEFAULT 0 NOT NULL',
			'activationKey CHAR(32) NOT NULL',
		];
		const userTable = `CREATE TABLE user (${params})`;
		console.log('--> userTable  = \n', userTable);
		
		db.query(userTable, function (err, result) {
			if (err) throw err;
			console.log('Table created');
		});
		var sql = `INSERT INTO user (id, username, email, password, registrationDate, activated, activationKey) VALUES ('1', 'jfleury', 'test@test.test', '0000', '${new Date()
			.toISOString()
			.slice(0, 19)
			.replace('T', ' ')}', TRUE, 'abcd')`;
			db.query(sql, function (err, result) {
				if (err) throw err;
				console.log('1 record inserted');
			});
			db.query('SELECT * FROM user', function (err, result, fields) {
				if (err) throw err;
				console.log(result);
			});
		});
*/
