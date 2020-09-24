/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.ts                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/09 16:20:08 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/24 13:02:28 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { router } from './router';
import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'mysql';
import cors from 'cors';

export let dataBase = null;
let app: express.Application | null = null;

function initMiddelware() {
	app.use(cors());
	app.use(bodyParser.json());
	app.use(
		bodyParser.urlencoded({
			extended: true,
		})
	);
}

function initDatabase() {
	dataBase = createConnection({
		host: 'fj199397-001.dbaas.ovh.net',
		port: 35833,
		user: 'jfleury',
		database: 'matcha',
		password: 'Matcha1234',
	});
	dataBase.connect((error) => {
		if (error) {
			throw error;
		}
		console.log('\x1b[33m' + 'Database connected\n' + '\x1b[0m');
	});
}

function main() {
	app = express();
	initMiddelware();
	initDatabase();
	router(app);

	const port = 3001;
	console.log('http://localhost:' + port);
	console.log('http://127.0.0.1:' + port);
	app.listen(port);
}

main();