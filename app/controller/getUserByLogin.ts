import { Request, Response } from 'express';
import { dbUserByLogin } from '../model/repositories/userRepository';
import appSettings from '../appSettings';

export async function getUserByLogin(req: Request, res: Response) {
	const user = await dbUserByLogin('jfleury');
	res.setHeader('Content-Type', 'text/plain');
	res.send(user);
}
