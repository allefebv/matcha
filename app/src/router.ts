import express, { Application, Request, Response } from 'express';
import path from 'path';

import {
	getImagesController,
	handleImagesController
} from './controller/imageController';
import {
	addlikedProfileController,
	deletelikedProfileController,
	getProfileLikeController,
	getProfileMatchController
} from './controller/likeController';
import {
	getGeoLocationController,
	getUsageLocationController,
	handleGeoLocationController,
	handleUsageLocationController
} from './controller/locationController';
import {
	addNotificationController,
	getNotificationController
} from './controller/notificationController';
import {
	getAllProfileController,
	getProfileByUsernameController,
	getProfileController,
	handleProfileController
} from './controller/profileController';
import {
	recommendationController
} from './controller/recommendationController';
import {
	addTagProfileController,
	deleteTagProfileController
} from './controller/tagController';
import {
	activateNewEmailController,
	activateUserController,
	addUserController,
	changeEmailController,
	changePasswordController,
	deleteUserController,
	loginUserController,
	resetPasswordController
} from './controller/userController';
import {
	addViewController,
	getViewController
} from './controller/viewController';

function userRouter(app: Application) {
	app.get("/user/activateUser", (req: Request, res: Response) => activateUserController(req, res));
	app.get("/user/activateNewEmail", (req: Request, res: Response) => activateNewEmailController(req, res));
	app.post("/user/addUser", (req: Request, res: Response) => addUserController(req, res));
	app.post("/user/changePassword", (req: Request, res: Response) => changePasswordController(req, res));
	app.post("/user/resetPassword", (req: Request, res: Response) => resetPasswordController(req, res));
	app.post("/user/loginUser", (req: Request, res: Response) => loginUserController(req, res));
	app.post("/user/deleteUser", (req: Request, res: Response) => deleteUserController(req, res));
	app.post("/user/changeEmail", (req: Request, res: Response) => changeEmailController(req, res));
}

function profileRouter(app: Application) {
	app.get("/profile/getProfile", (req: Request, res: Response) => getProfileController(req, res));
	app.get("/profile/getAllProfile", (req: Request, res: Response) => getAllProfileController(req, res));
	app.get("/profile/getProfileByUsername", (req: Request, res: Response) => getProfileByUsernameController(req, res));
	app.post("/profile/handleProfile", (req: Request, res: Response) => handleProfileController(req, res));
}

function likeRouter(app: Application) {
	app.get("/like/getProfileLike", (req: Request, res: Response) => getProfileLikeController(req, res));
	app.get("/like/getProfileMatch", (req: Request, res: Response) => getProfileMatchController(req, res));
	app.post("/like/addLikedProfile", (req: Request, res: Response) => addlikedProfileController(req, res));
	app.post("/like/deleteLikedProfile", (req: Request, res: Response) => deletelikedProfileController(req, res));
}

function notificationRouter(app: Application) {
	app.get("/notification/getNotification", (req: Request, res: Response) => getNotificationController(req, res));
	app.post("/notification/addNotification", (req: Request, res: Response) => addNotificationController(req, res));
}

function tagRouter(app: Application) {
	app.post("/tag/addTagProfile", (req: Request, res: Response) => addTagProfileController(req, res));
	app.post("/tag/deleteTagProfile", (req: Request, res: Response) => deleteTagProfileController(req, res));
}

function viewRouter(app: Application) {
	app.get("/view/getView", (req: Request, res: Response) => getViewController(req, res));
	app.post("/view/addView", (req: Request, res: Response) => addViewController(req, res));
}

function imagesController(app: Application) {
	app.get("/images/getImages", (req: Request, res: Response) => getImagesController(req, res));
	app.post("/images/handleImages", (req: Request, res: Response) => handleImagesController(req, res));
}

function recommendationRouter(app: Application) {
	app.get("/recommendation/getRecommendation", (req: Request, res: Response) => recommendationController(req, res));
}

function loactionRouter(app: Application) {
	app.get("/location/getGeoLocation", (req: Request, res: Response) => getGeoLocationController(req, res));
	app.post("/location/handleGeoLocation", (req: Request, res: Response) => handleGeoLocationController(req, res));
	app.get("/location/getUsageLocation", (req: Request, res: Response) => getUsageLocationController(req, res));
	app.post("/location/handleUsageLocation", (req: Request, res: Response) => handleUsageLocationController(req, res));
}

export function router(app: Application) {
	userRouter(app);
	profileRouter(app);
	likeRouter(app);
	notificationRouter(app);
	tagRouter(app);
	viewRouter(app);
	imagesController(app);
	recommendationRouter(app);
	loactionRouter(app);
	app.use((req: Request, res: Response) => {
		res.setHeader("Content-Type", "text/plain");
		res.status(404).json({ code: 404, error: "Page not found" });
	});
}
