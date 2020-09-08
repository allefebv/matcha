import { appRoutes } from './appRouter';
import express from 'express';
import bodyParser from 'body-parser';
import appSettings from './appSettings';
import mysql from 'mysql';

let app: express.Application | null = null;

function initMiddelware() {
	app.use(bodyParser.json());
	app.use(
		bodyParser.urlencoded({
			extended: true,
		})
	);
}

function initMySql() {
	const client = mysql.createConnection({
		host: 'fj199397-001.dbaas.ovh.net',
		port: 35833,
		user: 'jfleury',
		database: 'matcha',
		password: 'Matcha1234',
	});

	client.connect(function (err) {
		if (err) {
			throw err;
		}
		console.log('\x1b[33m' + 'mysql connected' + '\x1b[0m');
	});
}

function main() {
	app = express();
	initMiddelware();
	initMySql();
	appRoutes(app);

	const port = 3001;

	console.log('http://localhost:' + port);
	console.log('http://127.0.0.1:' + port);
	app.listen(port);
}

main();
