/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   AccountMenu.tsx                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:06 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/30 17:56:49 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';

import { IconButton, Menu, MenuItem } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { actionUser_signin } from '../store/user/action';

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.signin.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const AccountMenuComponent = (props: Props) => {
	const [anchorEl, setAnchorEl] = useState<Element | null>(null);

	function handleClick(event: React.MouseEvent) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	function handleLogout() {
		handleClose();
		props.dispatch(actionUser_signin({ user: null, token: null }));
	}

	return (
		<div>
			<IconButton onClick={handleClick}>
				<KeyboardArrowDownIcon
					aria-controls="simple-menu"
					aria-haspopup="true"
					color="primary"
				/>
			</IconButton>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<Link
					to={"/account-settings"}
					style={{ color: "inherit", textDecoration: "inherit" }}
				>
					<MenuItem onClick={handleClose}>Account Settings</MenuItem>
				</Link>

				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>
		</div>
	);
};

export const AccountMenu = withReduxProps(AccountMenuComponent);
