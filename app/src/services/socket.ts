/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   socket.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/22 09:44:14 by jfleury           #+#    #+#             */
/*   Updated: 2020/11/03 19:39:26 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { getProfileByUsername } from "../model/profileRepositories";
import { msg } from "types/types";

import { io } from "../app";
import { addMessage } from "../model/messageRepositories";
import { handleNotifications } from "./handleNotifications";

export function socketRouter() {
	io.on("connection", (socket) => {
		socket.on("chatMessage", async (msg: msg) => {
			if (msg && msg.sender && msg.receiver && msg.timestamp && msg.message) {
				io.emit("message" + msg.receiver, msg);
				addMessage(
					msg.sender,
					msg.receiver,
					msg.timestamp.toString(),
					msg.message
				);
				const notifierProfile = await getProfileByUsername(msg.sender);
				const notifiedProfile = await getProfileByUsername(msg.receiver);
				handleNotifications("message", notifierProfile, notifiedProfile);
			}
		});
		socket.on("connect", (msg) => {
			console.log(msg.username + " connect on websocket");
		});
		socket.on("disconnect", (msg) => {
			console.log(msg.username + " disconnect on websocket");
		});
	});
}
