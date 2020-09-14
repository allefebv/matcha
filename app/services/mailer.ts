/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   mailer.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/14 17:03:39 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/14 18:32:26 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import nodemailer from 'nodemailer';
import { user } from '../types/types';

export async function mailer(user: user, link: string) {
	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: 'project.matcha.42@gmail.com',
			pass: '@Matacha1234',
		},
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		to: user.email, // list of receivers
		subject: 'Matcha: Activate your account', // Subject line
		text: `Hello ${user.username},\nFor activate your account click on this link: ${link}\n`,
	});

	console.log('Message sent: %s', info.messageId);
}
