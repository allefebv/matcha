/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileCreationPage.tsx                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:16:40 by senz              #+#    #+#             */
/*   Updated: 2020/10/12 19:35:28 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import { Button, CircularProgress, Grid } from "@material-ui/core";

import { BaseProfileForm } from "../profile/BaseProfileForm";
import { Redirect } from "react-router-dom";
import * as constants from "../../services/constants";
import { isProfileEmpty } from "../../services/utils";
import { ExtendedProfileStepper } from "../profile/ExtendedProfileStepper";
import { SettingsBackupRestoreOutlined } from "@material-ui/icons";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	user: state.user.user,
	profile: state.user.profile,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const ProfileCreationPageComponent = (props: Props) => {
	const [loading, setLoading] = useState(false);
	const [redirect, setRedirect] = useState<string | null>(null);
	const [next, setNext] = useState("");

	useEffect(() => {
		if (props.loggedIn === false) {
			setRedirect(constants.LANDING_ROUTE);
		}
	}, [props.loggedIn]);

	const handleExtended = (event: React.MouseEvent<HTMLButtonElement>): void => {
		setNext("extended");
	};

	const handleSkip = (event: React.MouseEvent<HTMLButtonElement>): void => {
		setNext("skip");
	};

	function getComponent() {
		switch (next) {
			case "":
				return (
					<React.Fragment>
						<Button
							variant="outlined"
							color="secondary"
							onClick={handleSkip}
							fullWidth
						>
							Skip
						</Button>
						<Button
							variant="outlined"
							color="secondary"
							onClick={handleExtended}
							fullWidth
						>
							Complete Extended Profile
						</Button>
					</React.Fragment>
				);
			case "skip":
				setRedirect(constants.SEARCH_ROUTE);
				return <div>Hello</div>;
			case "extended":
				return <ExtendedProfileStepper />;
		}
	}

	if (redirect !== null) {
		return <Redirect to={redirect} />;
	} else {
		return (
			<React.Fragment>
				<Grid
					item
					container
					xs={8}
					md={6}
					lg={3}
					justify="center"
					alignItems="center"
				>
					{isProfileEmpty(props.profile) ? (
						<BaseProfileForm handleLoad={setLoading} />
					) : (
						getComponent()
					)}
				</Grid>
				<Grid item>
					{loading && <CircularProgress size={80} color="primary" />}
				</Grid>
			</React.Fragment>
		);
	}
};

export const ProfileCreationPage = withReduxProps(ProfileCreationPageComponent);
