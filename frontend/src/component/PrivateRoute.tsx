import React, { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import * as constants from "../services/constants"

interface Props {
	component: FC | React.ComponentClass;
	isLogged: Boolean;
	path: string;
}

export const PrivateRoute = ({ component, isLogged, ...rest }: Props) => {
	const routeComponent = (props: any) =>
		isLogged ? (
			React.createElement(component, props)
		) : (
			<Redirect to={{ pathname: constants.LANDING_ROUTE }} />
		);
	return <Route {...rest} render={routeComponent} />;
};
