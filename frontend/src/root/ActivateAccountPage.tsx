/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ActivateAccountPage.tsx                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/06 18:56:20 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/07 20:24:49 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect } from "react";

import { connect, ConnectedProps } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { activateAccountAPI } from "../services/apiCalls";
import { actionUser_validate } from "../store/user/action";

const withReduxProps = connect((state: any) => ({
	signupToken: state.user.signupToken,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const ActivateAccountPageComponent = (props: Props) => {
	let location = useLocation();

	useEffect(() => {
		const parameters = new URLSearchParams(location.search);
		let details = {
			key: parameters.get("activationKey"),
			id: parameters.get("id"),
		};

		activateAccountAPI(details).then(() => {
			props.dispatch(actionUser_validate({ token: props.signupToken }));
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	return (
		<React.Fragment>
			<CircularProgress />
		</React.Fragment>
	);
};

export const ActivateAccountPage = withReduxProps(ActivateAccountPageComponent);
