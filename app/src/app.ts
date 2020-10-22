/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.ts                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:07:30 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/22 10:15:36 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import bodyParser from 'body-parser';
import cors from 'cors';
import { Socket } from 'dgram';
import express from 'express';
import fileUpload from 'express-fileupload';
import { createConnection } from 'mysql';

import { router } from './router';
import { socketRouter } from './socket';

export let dataBase = null;
let app: express.Application = null;
const http = require("http");
const socketIo = require("socket.io");

function initMiddelware() {
	app.use(
		fileUpload({
			createParentPath: true,
		})
	);
	var corsOptions = {
		origin: "http://localhost:3000",
		optionsSuccessStatus: 200,
		credentials: true,
	};
	app.use(express.static("public", { extensions: ["png", "jpg", "jpeg"] }));
	app.use(cors(corsOptions));
	app.use(bodyParser.json());
	app.use(function (error, req, res, next) {
		if (error instanceof SyntaxError) {
			res.status(400).send("Error: JSON syntax");
		} else {
			next();
		}
	});
}

function initDatabase() {
	dataBase = createConnection({
		host: "fj199397-001.dbaas.ovh.net",
		port: 35833,
		user: "jfleury",
		database: "matcha",
		password: "Matcha1234",
	});
	dataBase.connect((error) => {
		if (error) {
			throw error;
		}
		console.log("\x1b[33m" + "Database connected\n" + "\x1b[0m");
	});
}

async function main() {
	app = express();
	const server = http.createServer(app);
	const io = socketIo(server);
	initMiddelware();
	initDatabase();
	router(app);
	socketRouter(io);

	server.listen(3001, () => {
		console.log(`Server started on port 3001`);
	});
}

main();
