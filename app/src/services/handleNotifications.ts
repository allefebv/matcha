/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   handleNotifications.ts                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/03 12:54:24 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/03 23:09:08 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { profile } from "../../types/types";
import { io } from "../app";
import { addNotification } from "../model/notificationRepositories";

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
		io.emit("notification" + notifiedProfile.username, {
			notifierProfile: notifierProfile,
			notification: {
				notification: notification,
				isRead: 0,
				date: Date.now(),
			},
		});
	} catch (e) {
		console.log(e);
	}
}
