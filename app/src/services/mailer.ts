/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   mailer.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/14 17:03:39 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/28 11:18:35 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import nodemailer from 'nodemailer';
import { user } from '../../types/types';

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: 'project.matcha.42@gmail.com',
		pass: '@Matacha1234',
	},
});

export async function activatedUserMailer(user: user, link: string) {
	transporter.sendMail({
		to: user.email,
		subject: 'Matcha: Activate your account',
		text: `Hello,\nFor activate your account click on this link: ${link}\n`,
	});
}

export async function newPasswordMailer(user: user, password: string) {
	transporter.sendMail({
		to: user.email,
		subject: 'Matcha: Reset password',
		text: `Hello,\nYour new password is: ${password}\n`,
	});
}

export async function newEmailMailer(email: string, link: string) {
	transporter.sendMail({
		to: email,
		subject: 'Matcha: Activate your new email',
		text: `Hello,\nTo activate your new email click here ${link}\n`,
	});
}
