/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   socket.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/22 09:44:14 by jfleury           #+#    #+#             */
<<<<<<< HEAD
/*   Updated: 2021/01/16 16:46:17 by jfleury          ###   ########.fr       */
=======
/*   Updated: 2021/01/15 16:19:06 by allefebv         ###   ########.fr       */
>>>>>>> deff0b24fa840f2132f5b0eb477507189e95f9ce
/*                                                                            */
/* ************************************************************************** */

import {
	getProfileByUserId,
	getProfileByUsername,
	updateProfile,
} from '../model/profileRepositories';
import { msg } from 'types/types';

import { io } from '../app';
import { addMessage } from '../model/messageRepositories';
import { handleNotifications } from './handleNotifications';

export function socketRouter() {
<<<<<<< HEAD
	io.on('connection', (socket) => {
		socket.on('online', async (payload: any) => {
=======
	io.on("connection", (socket) => {
		socket.on("online", async (payload: any) => {
>>>>>>> deff0b24fa840f2132f5b0eb477507189e95f9ce
			if (payload.id) {
				try {
					io.emit('online', payload.id);
					const profile = await getProfileByUserId(payload.id);
					profile.online = 1;
					updateProfile(profile, payload.id);
					socket['userId'] = payload.id;
				} catch (e) {
					console.log(e);
				}
			}
		});
		socket.on('chatMessage', async (msg: msg) => {
			if (
				msg &&
				msg.sender &&
				msg.receiver &&
				msg.timestamp &&
				msg.message
			) {
				io.emit('message' + msg.receiver, msg);
				addMessage(
					msg.sender,
					msg.receiver,
					msg.timestamp.toString(),
					msg.message
				);
				const notifierProfile = await getProfileByUsername(msg.sender);
				const notifiedProfile = await getProfileByUsername(
					msg.receiver
				);
				handleNotifications(
					'message',
					notifierProfile,
					notifiedProfile
				);
			}
		});
<<<<<<< HEAD
		socket.on('disconnect', async () => {
=======
		socket.on("disconnect", async () => {
>>>>>>> deff0b24fa840f2132f5b0eb477507189e95f9ce
			try {
				io.emit('offline', socket['userId']);
				const profile = await getProfileByUserId(socket['userId']);
				profile.online = 0;
				profile.lastConnection = Date.now();
				updateProfile(profile, socket['userId']);
			} catch (e) {
				console.log(e);
			}
		});
	});
}
