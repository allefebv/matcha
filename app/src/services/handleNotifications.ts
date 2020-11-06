/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   handleNotifications.ts                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/03 12:54:24 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/06 17:05:48 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { profile } from "../../types/types";
import { io } from "../app";
import {
	addNotification,
	getLastNotification,
} from "../model/notificationRepositories";

export async function handleNotifications(
	type: string,
	notifierProfile: profile,
	notifiedProfile: profile
) {
	const notification = type + "," + notifierProfile.username;
	try {
		await addNotification(
			notifiedProfile.userId,
			notifierProfile.userId,
			notification
		);
		const notificationId = await getLastNotification(notifiedProfile.userId);
		io.emit("notification" + notifiedProfile.username, {
			notifierProfile: notifierProfile,
			notification: {
				id: notificationId,
				notification: notification,
				isRead: 0,
				date: Date.now(),
			},
		});
	} catch (e) {
		console.log(e);
	}
}
