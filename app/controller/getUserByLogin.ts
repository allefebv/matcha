import { Request, Response } from 'express';
import {
	userByUsername,
	userRegister,
} from '../model/repositories/userRepository';
import bodyParser from 'body-parser';

export async function getUserByUsername(req: Request, res: Response) {
	const username = req.query.username;
	console.log(username);
	const user = await userByUsername(username as string);
	res.setHeader('Content-Type', 'application/json');
	res.json(user);
}

export async function postUserRegister(req: Request, res: Response) {
	const user = await userRegister(req.body);
	user ? res.json(user) : res.status(400).send('Bad Request');
}
