import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import { createConnection } from "mysql";

import { router } from "./router";

export let dataBase = null;
let app: express.Application | null = null;

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
	app.use(express.static("public"));
	app.use(express.static("files"));
	app.use(cors(corsOptions));
	app.use(bodyParser.json());
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

function main() {
	app = express();
	initMiddelware();
	initDatabase();
	router(app);

	const port = 3001;
	console.log("http://localhost:" + port);
	console.log("http://127.0.0.1:" + port);
	app.listen(port);
}

main();
