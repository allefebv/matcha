/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   mailer.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:53 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/26 16:37:01 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { user } from '../../types/types';
import { transporter } from '../app';

export async function activatedUserMailer(user: user, link: string) {
	try {
		await transporter.sendMail({
			to: user.email,
			subject: "Matcha: Activate your account",
			text: `Hello,\nFor activate your account click on this link: ${link}\n`,
		});
	} catch (error) {
		console.log("Mailer = ", error);
	}
}

export async function newPasswordMailer(user: user, password: string) {
	try {
		await transporter.sendMail({
			to: user.email,
			subject: "Matcha: Reset password",
			text: `Hello,\nYour new password is: ${password}\n`,
		});
	} catch (error) {
		console.log("Mailer = ", error);
	}
}

export async function newEmailMailer(email: string, link: string) {
	try {
		await transporter.sendMail({
			to: email,
			subject: "Matcha: Activate your new email",
			text: `Hello,\nTo activate your new email click here ${link}\n`,
		});
	} catch (error) {
		console.log("Mailer = ", error);
	}
}
