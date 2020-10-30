/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   socket.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/22 09:44:14 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/30 12:46:20 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import socketIo from 'socket.io';

import { addMMessage } from './model/messageRepositories';

export function socketRouter(io: socketIo.Server) {
	io.on("connection", (socket) => {
		socket.on("chatMessage", (msg) => {
			io.emit("message" + msg.receiver, msg);
			if (msg && msg.sender && msg.receiver && msg.timestamp && msg.message) {
				addMMessage(msg.sender, msg.receiver, msg.timestamp, msg.message);
			}
		});
		socket.on("connect", (msg) => {
			console.log(msg.username + "connect on websocket");
		});
		socket.on("disconnect", (msg) => {
			console.log(msg.username + "disconnect on websocket");
		});
	});
}
