import { Request, Response } from 'express';

import {
	activateUser, addUser, changeEmail, changePassword, deleteUser,
	getUserByEmail, getUserById
} from '../model/userRepositories';
import { generatePassword } from '../services/generateString';
import { generateTokenForUser, jwtVerify } from '../services/jwt';
import {
	activatedUserMailer, newEmailMailer, newPasswordMailer
} from '../services/mailer';
import { checkPassword, hashPassword } from '../services/password';
import { addUserValidation } from '../services/userValidation';

export async function loginUserController(req: Request, res: Response) {
	try {
		const user = await getUserByEmail(req.body.email);
		await checkPassword(req.body.password, user.password);
		res.status(200).json({
			user: {
				email: user.email,
				registrationDate: user.registrationDate,
				activated: user.activated,
			},
			token: generateTokenForUser(user),
		});
	} catch (error) {
		res.status(400).send(error);
	}
}

export async function activateUserController(req: Request, res: Response) {
	try {
		let user = await getUserById(req.body.id);
		if (user.activationKey === req.body.activationKey) {
			const result = await activateUser(req.body.id);
			res.status(200).json(result);
		}
	} catch (error) {
		res.status(400).send(error);
	}
}

export async function activateNewEmailController(req: Request, res: Response) {
	try {
		const userId = parseInt(req.query.id.toString());
		const result = await changeEmail(userId, req.query.email as string);
		res.status(200).send(result);
	} catch (error) {
		res.status(400).send(error);
	}
}

export async function addUserController(req: Request, res: Response) {
	try {
		await addUserValidation(req.body.email, req.body.password);
		const password = hashPassword(req.body.password);
		const newUser = await addUser(req.body.email, password);
		await activatedUserMailer(
			newUser,
			`${req.body.redirectUrl}?activationKey=${newUser.activationKey}&id=${newUser.id}`
		);
		res.status(200).json({
			user: {
				email: newUser.email,
				registrationDate: newUser.registrationDate,
				activated: newUser.activated,
			},
			token: generateTokenForUser(newUser),
		});
	} catch (error) {
		res.status(400).send(error);
	}
}

export async function changePasswordController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const user = await getUserById(jwt.decoded.id);
		await checkPassword(req.body.password, user.password);
		await changePassword(jwt.decoded.id, hashPassword(req.body.newPassword));
		res.status(200).send("Password change");
	} catch (error) {
		res.status(400).send(error);
	}
}

export async function changeEmailController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const user = await getUserById(jwt.decoded.id);
		await checkPassword(req.body.password, user.password);
		newEmailMailer(
			req.body.newEmail,
			`http://localhost:3001/user/activateNewEmail?email=${req.body.newEmail}&id=${user.id}`
		);
		res.status(200).send("Email send to your new email");
	} catch (error) {
		res.status(400).send(error);
	}
}

export async function resetPasswordController(req: Request, res: Response) {
	try {
		const user = await getUserByEmail(req.body.email);
		const newPassword = generatePassword();
		await changePassword(user.id, hashPassword(newPassword));
		newPasswordMailer(user, newPassword);
		res.status(200).send("New password send in email");
	} catch (error) {
		res.status(400).send(error);
	}
}

export async function deleteUserController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const user = await getUserById(jwt.decoded.id);
		await checkPassword(req.body.password, user.password);
		await deleteUser(parseInt(jwt.decoded.id.toString()));
		res.status(200).send("User as deleted");
	} catch (error) {
		res.status(400).send(error);
	}
}
