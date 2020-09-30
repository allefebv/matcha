/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileCreationPage.tsx                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:16:40 by senz              #+#    #+#             */
/*   Updated: 2020/09/30 17:26:33 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { Grid } from '@material-ui/core';

import { ProfileCreationStepper } from '../component/ProfileCreationStepper';

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.signin.isLoggedIn,
	user: state.user.signin.user,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const ProfileCreationPageComponent = (props: Props) => {
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
				<ProfileCreationStepper />
			</Grid>
		</React.Fragment>
	);
};

export const ProfileCreationPage = withReduxProps(ProfileCreationPageComponent);
