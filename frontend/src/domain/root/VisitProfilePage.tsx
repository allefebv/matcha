/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   VisitProfilePage.tsx                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/08 18:11:09 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Paper, makeStyles, Typography, Grid, Button } from "@material-ui/core";
import { ProfilePictures } from "../profile/ProfilePictures";
import { Iaddress, Iprofile, IlistProfiles } from "../../types/types";
import {
	visitProfileAPI,
	blacklistProfileAPI,
	likeProfileAPI,
	unlikeProfileAPI,
	getLikeStatusAPI,
	getBlackListAPI,
	deleteBlacklistProfileAPI,
} from "../../services/apiCalls";
import { connect, ConnectedProps } from "react-redux";
import { actionUi_showSnackbar } from "../../store/ui/action";
import { socket } from "./App";
import { getTimeElapsed } from "../../services/timeUtils";
import {
	isProfileBlacklisted,
	profileHasImages,
} from "../../services/profileUtils";
import { actionUser_setBlackList } from "../../store/user/action";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	blackList: state.user.blackList as string[],
	hasImages: profileHasImages(state.user.imgs),
}));

type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const useStyles = makeStyles((theme) => ({
	main: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: "90vh",
		backgroundColor: "cyan",
	},
	paper: {
		display: "flex",
		width: "80%",
		[theme.breakpoints.down("sm")]: {
			width: "100%",
		},
		backgroundColor: (isBlackListed) => (isBlackListed ? "grey" : "blue"),
	},
	element: {
		display: "flex",
		backgroundColor: "pink",
		flexDirection: "column",
	},
	likeButton: {},
}));

const VisitProfilePageComponent = (props: Props) => {
	const historyLocation = useLocation<IlistProfiles>();
	const [profile, setProfile] = useState<Iprofile>();
	const [location, setLocation] = useState<Iaddress | null>(null);
	const [tags, setTags] = useState<string[] | null>(null);
	const [likeStatus, setLikeStatus] = useState<{
		iLike: boolean;
		heLikes: boolean;
	}>();
	const ref = useRef(profile);

	const updateProfile = (profile: Iprofile) => {
		ref.current = profile;
		setProfile(profile);
	};
	const [isBlackListed, setIsBlackListed] = useState(true);
	const classes = useStyles(isBlackListed);

	useEffect(() => {
		if (historyLocation && historyLocation.state) {
			setIsBlackListed(
				isProfileBlacklisted(
					props.blackList,
					historyLocation.state.profile.username
				)
			);
			getLikeStatus();
			const tmp = { ...historyLocation.state.profile };
			updateProfile(tmp);
			setLocation(historyLocation.state.location);
			setTags(historyLocation.state.tag);
			socket.on("online", updateConnectionStatus);
			socket.on("offline", updateConnectionStatus);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [historyLocation]);

	useEffect(() => {
		if (!isBlackListed) {
			visitProfile();
		}
	}, [isBlackListed]);

	useEffect(() => {
		if (historyLocation.state.profile) {
			setIsBlackListed(
				isProfileBlacklisted(
					props.blackList,
					historyLocation.state.profile.username
				)
			);
		}
	}, [props.blackList]);

	const visitProfile = () => {
		visitProfileAPI(
			{ username: historyLocation.state.profile.username },
			props.loggedIn
		).catch((error) => {
			props.dispatch(
				actionUi_showSnackbar({
					message: error.message,
					type: "error",
				})
			);
			console.log(error.message);
		});
	};

	const getLikeStatus = () => {
		getLikeStatusAPI(
			{ username: historyLocation.state.profile.username },
			props.loggedIn
		)
			.then((json) => {
				setLikeStatus(json);
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

	const toggleBlackListProfile = () => {
		if (!isBlackListed) {
			blacklistProfileAPI(
				{ username: historyLocation.state.profile.username },
				props.loggedIn
			)
				.then(() => {
					getBlackListAPI(props.loggedIn)
						.then((json) => {
							props.dispatch(actionUser_setBlackList({ blackList: json }));
						})
						.catch((error) => {
							console.log(error);
							props.dispatch(
								actionUi_showSnackbar({
									message: error.message,
									type: "error",
								})
							);
							console.log(error.message);
						});
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
		} else {
			deleteBlacklistProfileAPI(
				{ username: historyLocation.state.profile.username },
				props.loggedIn
			)
				.then(() => {
					getBlackListAPI(props.loggedIn)
						.then((json) => {
							props.dispatch(actionUser_setBlackList({ blackList: json }));
						})
						.catch((error) => {
							console.log(error);
							props.dispatch(
								actionUi_showSnackbar({
									message: error.message,
									type: "error",
								})
							);
							console.log(error.message);
						});
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
		}
	};

	const toggleLikeProfile = () => {
		if (likeStatus !== undefined && likeStatus.iLike === false) {
			likeProfileAPI(
				{ username: historyLocation.state.profile.username },
				props.loggedIn
			)
				.then(() => {
					setLikeStatus({ ...likeStatus, iLike: true });
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
		} else if (likeStatus !== undefined && likeStatus.iLike === true) {
			unlikeProfileAPI(
				{ username: historyLocation.state.profile.username },
				props.loggedIn
			)
				.then(() => {
					setLikeStatus({ ...likeStatus, iLike: false });
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
		}
	};

	const updateConnectionStatus = (userId: number) => {
		if (ref.current !== undefined) {
			const newStatus = ref.current.online === 1 ? 0 : 1;
			userId &&
				ref.current &&
				ref.current.userId &&
				ref.current.userId === userId &&
				updateProfile({ ...ref.current, online: newStatus });
		}
	};

	const formatTags = (tags: string[]) => {
		return tags.map((tag) => (
			<Typography display="inline" key={tag}>
				#{tag}{" "}
			</Typography>
		));
	};

	const getLikeButtonText = () => {
		if (likeStatus) {
			if (likeStatus.iLike === true) {
				return "UNLIKE";
			} else if (likeStatus.heLikes === true) {
				return "LIKE BACK";
			} else {
				return "LIKE";
			}
		}
	};

	const getConnectionStatusText = () => {
		if (profile) {
			if (profile.online) {
				return "Online";
			} else if (profile.lastConnection) {
				return (
					"Offline - last connection " +
					getTimeElapsed(parseInt(profile.lastConnection))
				);
			} else {
				return "Offline";
			}
		}
	};

	return (
		<div className={classes.main}>
			<Paper elevation={5} className={classes.paper}>
				{profile && (
					<Grid container direction="row">
						<Grid item xs={12}>
							<ProfilePictures
								imgs={[null, null, null, null, null]}
								modifiable={false}
								username={profile.username}
							/>
						</Grid>
						<Grid item xs={12}>
							<Paper variant="outlined" className={classes.element}>
								<Typography display="block">
									Username {profile.username}
								</Typography>
								<Typography>Firstname {profile.firstname}</Typography>
								<Typography>Lastname {profile.lastname}</Typography>
								<Typography>{getConnectionStatusText()}</Typography>
							</Paper>
						</Grid>
						<Grid item xs={12}>
							<Paper>{tags && formatTags(tags)}</Paper>
						</Grid>
						<Grid item xs={12}>
							<Paper>
								<Typography variant="body1">{profile.age}</Typography>
							</Paper>
						</Grid>
						<Grid item xs={12}>
							<Paper variant="outlined" className={classes.element}>
								<Typography variant="body1">
									{profile.popularityScore}
								</Typography>
								<Typography variant="body1">
									{profile.sexualOrientation}
								</Typography>
								<Typography variant="body1">{profile.gender}</Typography>
								<Typography variant="body1">{profile.bio}</Typography>
								<Typography variant="body1">
									{location && location.distanceInKm}
								</Typography>
							</Paper>
						</Grid>
						<Grid item xs={4}>
							<Button onClick={toggleBlackListProfile}>
								{isBlackListed ? "UNBLOCK" : "BLOCK"}
							</Button>
						</Grid>
						<Grid item xs={4}>
							<Button>REPORT</Button>
						</Grid>
						{likeStatus !== undefined && props.hasImages && (
							<Grid item xs={4}>
								<Button
									className={classes.likeButton}
									onClick={toggleLikeProfile}
								>
									{getLikeButtonText()}
								</Button>
							</Grid>
						)}
					</Grid>
				)}
			</Paper>
		</div>
	);
};

export const VisitProfilePage = withReduxProps(VisitProfilePageComponent);
