/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   locationController.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:04:54 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/15 10:44:59 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from 'express';

import {
	addGeoLocation, addUsageLocation, getGeoLocation, getUsageLocation,
	updateGeoLocation, updateUsageLocation
} from '../model/locationRepositories';
import { jwtVerify } from '../services/jwt';

async function handleLocation(req: Request, res: Response, table: string) {
	const jwt = await jwtVerify(req.headers.token, res);

	if (jwt && jwt.isLogin) {
		const location =
			table === "GeoLocation"
				? await getGeoLocation(jwt.decoded.id)
				: await getUsageLocation(jwt.decoded.id);
		if (!location) {
			// Add
			try {
				table === "GeoLocation"
					? await addGeoLocation(jwt.decoded.id, req.body)
					: await addUsageLocation(jwt.decoded.id, req.body);
				const location =
					table === "GeoLocation"
						? await getGeoLocation(jwt.decoded.id)
						: await getUsageLocation(jwt.decoded.id);
				console.log(location);
				res.status(200).json(location);
			} catch (error) {
				res.status(400).send(error);
			}
		} else {
			// Update
			try {
				table === "GeoLocation"
					? await updateGeoLocation(jwt.decoded.id, req.body)
					: await updateUsageLocation(jwt.decoded.id, req.body);
				const location =
					table === "GeoLocation"
						? await getGeoLocation(jwt.decoded.id)
						: await getUsageLocation(jwt.decoded.id);

				res.status(200).json(location);
			} catch (error) {
				res.status(400).send(error);
			}
		}
	}
}

async function getLocation(req: Request, res: Response, table: string) {
	const jwt = await jwtVerify(req.headers.token, res);

	if (jwt && jwt.isLogin) {
		try {
			const location =
				table === "GeoLocation"
					? await getGeoLocation(jwt.decoded.id)
					: await getUsageLocation(jwt.decoded.id);
			res.status(200).json(location);
		} catch (error) {
			res.status(400).send(error);
		}
	}
}

export function getGeoLocationController(req: Request, res: Response) {
	getLocation(req, res, "GeoLocation");
}

export function handleGeoLocationController(req: Request, res: Response) {
	handleLocation(req, res, "GeoLocation");
}

export function getUsageLocationController(req: Request, res: Response) {
	getLocation(req, res, "UsageLocation");
}

export function handleUsageLocationController(req: Request, res: Response) {
	handleLocation(req, res, "UsageLocation");
}
