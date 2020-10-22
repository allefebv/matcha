/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   socket.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/22 09:44:14 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/22 12:14:07 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

let interval = null;

export function socketRouter(io) {
	io.on("connection", (socket) => {
		socket.on("chatMessage", (msg) => {
			io.emit(msg.for, msg);
			console.log("message: ", msg);
		});
	});
}
