/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   userValidation.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:07:04 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/13 19:07:04 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export function addUserValidation(
	email: string,
	password: string
): Promise<void> {
	return new Promise(async (resolve, reject) => {
		const emailRegex = new RegExp(
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		);
		const passwordRegex = new RegExp(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}/);
		if (!emailRegex.test(email)) {
			reject("Email invalid");
		}
		if (!passwordRegex.test(password)) {
			reject("Password invalid");
		}
		resolve();
	});
}
