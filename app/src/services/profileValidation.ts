import { Response } from 'express';

import { profile } from '../../types/types';
import { getProfileByUsername } from '../model/profileRepositories';

export const addProfileValidation = async (body: profile, id: number) => {
	return new Promise((resolve, reject) => {
		resolve();
	});
};

export const updateProfileValidation = async (body: profile, id: number) => {
	return new Promise((resolve, reject) => {
		resolve();
	});
};
