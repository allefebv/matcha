import { getUserByLogin } from "./controller/getUserByLogin";
import { Request, Response } from "express";

export function appRoutes(app) {
	// Authentication
	app.get("/getUserByLogin", (req: Request, res: Response) =>
		getUserByLogin(req, res)
	);

	// Error
	app.use((req: Request, res: Response, next) => {
		res.setHeader("Content-Type", "text/plain");
		res.status(404).send("Error 404: Page not found!");
	});
}
