/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   NotificationsMenu.tsx                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/02 18:22:04 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/04 17:25:49 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   AccountMenu.tsx                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:06 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/20 11:17:02 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import {
	Badge,
	Divider,
	Grid,
	IconButton,
	makeStyles,
	Menu,
	MenuItem,
	Typography,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Iprofile, IlistProfiles } from "../../types/types";
import { CustomAvatar } from "../../component/CustomAvatar";
import * as constants from "../../services/constants";
import {
	getProfileAPI,
	getProfileByUsernameAPI,
} from "../../services/apiCalls";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	searchList: state.profilesList.search as IlistProfiles[],
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
	notifications: {
		notifierProfile: Iprofile;
		notification: { notification: string; date: number; isRead: number };
	}[];
} & ReduxProps;

const useStyles = makeStyles({
	item: {
		whiteSpace: "normal",
	},
});

const NotificationsMenuComponent = (props: Props) => {
	const [anchorEl, setAnchorEl] = useState<Element | null>(null);
	const classes = useStyles();
	const history = useHistory();

	function handleClick(event: React.MouseEvent) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	const getNotificationText = (type: string) => {
		switch (type) {
			case "view":
				return " has seen your profile";
			case "like":
				return " has liked your profile";
			case "unlike":
				return " stopped to like your profile";
			case "message":
				return " sent you a message";
		}
	};

	const getNotificationTime = (date: number) => {
		const diff = Date.now() - date;
		const ms_Min = 60 * 1000;
		const ms_Hour = ms_Min * 60;
		const ms_Day = ms_Hour * 24;
		const ms_Mon = ms_Day * 30;
		const ms_Yr = ms_Day * 365;
		if (diff < ms_Min) {
			return "less than a minute ago";
		} else if (diff < ms_Hour) {
			return Math.round(diff / ms_Min) + " minutes ago";
		} else if (diff < ms_Day) {
			return Math.round(diff / ms_Hour) + " hours ago";
		} else if (diff < ms_Mon) {
			return Math.round(diff / ms_Day) + " days ago";
		} else if (diff < ms_Yr) {
			return Math.round(diff / ms_Mon) + " months ago";
		} else {
			return Math.round(diff / ms_Yr) + " years ago";
		}
	};

	const redirectToProfile = async (notifierUsername: string) => {
		let profile = props.searchList.filter(
			(entry) => entry.profile.username === notifierUsername
		)[0];
		if (!profile) {
			profile = await getProfileByUsernameAPI(props.loggedIn, notifierUsername);
		}
		history.push({
			pathname: constants.VISIT_PROFILE,
			state: profile,
		});
	};

	const redirectToChat = () => {
		history.push({
			pathname: constants.CHAT_ROUTE,
		});
	};

	const getNotificationCard = () => {
		return props.notifications.map((notification, index) => {
			const type = notification.notification.notification.split(",")[0];
			return (
				<MenuItem
					key={index}
					className={classes.item}
					onClick={() => {
						type === "message"
							? redirectToChat()
							: redirectToProfile(notification.notifierProfile.username);
					}}
				>
					<Grid container>
						<Grid item xs={3}>
							<CustomAvatar
								id={0}
								src={
									"http://localhost:3001/images/" +
									notification.notifierProfile.username +
									"img0"
								}
								modifiable={false}
							/>
						</Grid>
						<Grid item xs={9}>
							{notification.notifierProfile.username}
							{getNotificationText(type)}
							{" " + getNotificationTime(notification.notification.date)}
						</Grid>
					</Grid>
				</MenuItem>
			);
		});
	};

	return (
		<div>
			<Badge
				badgeContent={props.notifications.length}
				color="error"
				max={50}
				overlap="circle"
			>
				<IconButton onClick={handleClick}>
					<NotificationsIcon aria-controls="simple-menu" aria-haspopup="true" />
				</IconButton>
			</Badge>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<Typography variant="h4">Notifications</Typography>
				<Divider />
				{getNotificationCard()}
			</Menu>
		</div>
	);
};

export const NotificationsMenu = withReduxProps(NotificationsMenuComponent);
