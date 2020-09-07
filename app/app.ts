import { appRoutes } from "./appRouter";
import express from "express";
import bodyParser from "body-parser";
import appSettings from "./appSettings";

// Init app
const app = express();

// Body parser
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

//mongoDb
export let db = null;
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(
	appSettings.mongoDb.url,
	{ useUnifiedTopology: true },
	(error, client) => {
		if (error) {
			throw error;
		}
		db = client.db("Matcha");
	}
);

// App routes
appRoutes(app);

// Port
const port = 3001;

console.log("http://localhost:" + port);
console.log("http://127.0.0.1:" + port);
app.listen(port);
