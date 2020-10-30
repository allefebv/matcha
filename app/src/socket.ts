/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   socket.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/22 09:44:14 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/30 12:02:25 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { addMMessage } from './model/messageRepositories';

export function socketRouter(io) {
	io.on("connection", (socket) => {
		socket.on("chatMessage", (msg) => {
			io.emit("message" + msg.receiver, msg);
			if (msg && msg.sender && msg.receiver && msg.timestamp && msg.message) {
				addMMessage(msg.sender, msg.receiver, msg.timestamp, msg.message);
			}
		});
	});
}
