/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   NotificationsMenu.tsx                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/02 18:22:04 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/08 19:05:22 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useHistory } from "react-router-dom";

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
import { IlistProfiles, Inotification } from "../../types/types";
import { CustomAvatar } from "../../component/CustomAvatar";
import * as constants from "../../services/constants";
import {
	getProfileByUsernameAPI,
	readNotificationAPI,
	deleteNotificationAPI,
} from "../../services/apiCalls";
import { actionUi_showSnackbar } from "../../store/ui/action";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CloseIcon from "@material-ui/icons/Close";
import { getTimeElapsed } from "../../services/timeUtils";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	searchList: state.profilesList.search as IlistProfiles[],
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
	notifications: Inotification[];
	setNotifications: (notifications: Inotification[]) => void;
} & ReduxProps;

const useStyles = makeStyles((theme) => ({
	item: {
		whiteSpace: "normal",
	},
	textGray: {
		color: "grey",
	},
	textPop: {
		color: theme.palette.primary.main,
	},
}));

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
			case "likeBack":
				return " just matched with you";
			case "unlike":
				return " stopped to like your profile";
			case "message":
				return " sent you a message";
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
		handleClose();
	};

	const redirectToChat = () => {
		history.push({
			pathname: constants.CHAT_ROUTE,
		});
		handleClose();
	};

	const handleClickNotification = (notification: Inotification) => {
		notification.notification.notification.split(",")[0] === "message"
			? redirectToChat()
			: redirectToProfile(notification.notifierProfile.username);
	};

	const handleReadNotification = async (
		notification: Inotification,
		index: number
	) => {
		await readNotificationAPI(
			{ id: notification.notification.id },
			props.loggedIn
		)
			.then(() => {
				const tmp = [...props.notifications];
				tmp[index] = notification;
				tmp[index].notification.isRead = true;
				props.setNotifications(tmp);
			})
			.catch((error) => {
				props.dispatch(
					actionUi_showSnackbar({
						message: error.message,
						type: "error",
					})
				);
				console.log(error.message);
			});
	};

	const handleDeleteNotification = async (notification: Inotification) => {
		await deleteNotificationAPI(
			{ id: notification.notification.id },
			props.loggedIn
		)
			.then(() => {
				props.setNotifications(
					props.notifications.filter(
						(entry) => entry.notification.id !== notification.notification.id
					)
				);
			})
			.catch((error) => {
				props.dispatch(
					actionUi_showSnackbar({
						message: error.message,
						type: "error",
					})
				);
				console.log(error.message);
			});
	};

	const getNotificationCard = () => {
		return props.notifications.map((notification, index) => {
			const type = notification.notification.notification.split(",")[0];
			const isRead = notification.notification.isRead;
			return (
				<MenuItem
					key={index}
					className={classes.item}
					onClick={() => {
						handleReadNotification(notification, index);
						handleClickNotification(notification);
					}}
				>
					<Grid container alignItems="center" justify="center">
						<Grid item xs={2}>
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
						<Grid item xs={isRead ? 9 : 8}>
							<Typography className={isRead ? classes.textGray : undefined}>
								{notification.notifierProfile.username}
								{getNotificationText(type)}
							</Typography>
							<Typography
								className={isRead ? classes.textGray : classes.textPop}
							>
								{" " + getTimeElapsed(notification.notification.date)}
							</Typography>
						</Grid>
						{!isRead && (
							<Grid item xs={1}>
								<IconButton
									onClick={(
										event: React.MouseEvent<HTMLButtonElement, MouseEvent>
									) => {
										handleReadNotification(notification, index);
										event.stopPropagation();
									}}
								>
									<FiberManualRecordIcon />
								</IconButton>
							</Grid>
						)}
						<Grid item xs={1}>
							<IconButton
								onClick={(
									event: React.MouseEvent<HTMLButtonElement, MouseEvent>
								) => {
									handleDeleteNotification(notification);
									event.stopPropagation();
								}}
							>
								<CloseIcon />
							</IconButton>
						</Grid>
					</Grid>
				</MenuItem>
			);
		});
	};

	return (
		<div>
			<Badge
				badgeContent={
					props.notifications.filter(
						(notification) => !notification.notification.isRead
					).length
				}
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
