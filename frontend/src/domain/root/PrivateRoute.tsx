/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   PrivateRoute.tsx                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:19:03 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/20 09:13:28 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { FC } from "react";
import { Redirect, Route } from "react-router-dom";

import * as constants from "../../services/constants";
import { connect, ConnectedProps } from "react-redux";
import { isProfileEmpty } from "../../services/profileUtils";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	isProfileEmpty: isProfileEmpty(
		state.user.profile,
		state.user.usagelocation,
		state.user.tagList
	),
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
	component: FC | React.ComponentClass;
	path: string;
} & ReduxProps;

const PrivateRouteComponent = (props: Props) => {
	const Component = () => {
		if (!props.loggedIn) {
			return <Redirect to={{ pathname: constants.LANDING_ROUTE }} />;
		} else if (props.isProfileEmpty) {
			return <Redirect to={{ pathname: constants.PROFILE_CREATION_ROUTE }} />;
		} else {
			return React.createElement(props.component);
		}
	};
	return (
		<Route>
			<Component />
		</Route>
	);
};

export const PrivateRoute = withReduxProps(PrivateRouteComponent);

// interface Props {
// 	component: FC | React.ComponentClass;
// 	isLogged: Boolean;
// 	path: string;
// }

// export const PrivateRoute = ({ component, isLogged, ...rest }: Props) => {
// 	const routeComponent = (props: any) =>
// 		isLogged ? (
// 			React.createElement(component, props)
// 		) : (
// 			<Redirect to={{ pathname: constants.LANDING_ROUTE }} />
// 		);
// 	return <Route {...rest} render={routeComponent} />;
// };
