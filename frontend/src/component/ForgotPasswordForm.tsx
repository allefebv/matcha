/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ForgotPasswordForm.tsx                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:47 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/24 14:18:47 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { FormInput } from "./FormInput";
import { Button } from "./Button";

interface Props {
}

export const ForgotPasswordForm = (props: Props) => {
	return (
		<React.Fragment>
			<FormInput placeholder="email" />
			<Button theme="primary" type="submit">Reset Password</Button>
		</React.Fragment>
	);
};