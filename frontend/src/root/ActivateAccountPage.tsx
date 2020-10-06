/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ActivateAccountPage.tsx                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/06 18:56:20 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/06 20:51:03 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect } from "react";

import { connect, ConnectedProps } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { fetchApi } from "../services/fetchApi";
import * as constants from "../services/constants";
import { actionUser_validate } from "../store/user/action";

const withReduxProps = connect((state: any) => ({
	signupToken: state.user.signupToken,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const ActivateAccountPageComponent = (props: Props) => {
	let location = useLocation();

	useEffect(() => {
		getUri();
	}, [location]);

	function getUri() {
		const parameters = new URLSearchParams(location.search);
		let details = {
			key: parameters.get("activationKey"),
			id: parameters.get("id"),
		};

		fetchApi<{ user: Object; token: string }>(
			constants.URL + constants.URI_ACTIVATE_ACCOUNT,
			{
				method: constants.POST_METHOD,
				headers: {
					"Content-Type": "application/json",
				},
				body: details,
			}
		)
			.then((json) => {
				props.dispatch(actionUser_validate({ token: props.signupToken }));
			})
			.catch((error) => {});
	}

	return (
		<React.Fragment>
			<CircularProgress />
		</React.Fragment>
	);
};

export const ActivateAccountPage = withReduxProps(ActivateAccountPageComponent);
