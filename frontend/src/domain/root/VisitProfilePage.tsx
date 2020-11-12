/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   VisitProfilePage.tsx                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/12 18:49:02 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
	Paper,
	makeStyles,
	Typography,
	Grid,
	Button,
	Icon,
	useTheme,
	useMediaQuery,
} from "@material-ui/core";
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
	getAge,
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
		padding: "16px",
		height: "90vh",
		display: "flex",
		justifyContent: "center",
	},
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: "32px",
		[theme.breakpoints.down("xs")]: {
			padding: "16px",
		},
	},
	paper: {
		display: "flex",
		width: "80%",
		height: "80%",
		[theme.breakpoints.down("xs")]: {
			width: "100%",
			height: "100%",
		},
		backgroundColor: (isBlackListed) =>
			isBlackListed ? "grey" : theme.palette.secondary.main,
	},
	element: {
		display: "flex",
		backgroundColor: "pink",
		flexDirection: "column",
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end",
		marginTop: "auto",
		width: "100%",
	},
	bio: {
		width: "60%",
		[theme.breakpoints.down("xs")]: {
			width: "100%",
		},
		alignSelf: "center",
	},
}));

const VisitProfilePageComponent = (props: Props) => {
	const historyLocation = useLocation<IlistProfiles>();
	const [profile, setProfile] = useState<Iprofile>();
	const [location, setLocation] = useState<Iaddress | null>(null);
	const [tags, setTags] = useState<string[] | null>(null);
	const [likeStatus, setLikeStatus] = useState<{
		iLike: boolean;
		heLike: boolean;
	}>();
	const ref = useRef(profile);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

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
			<Typography variant="button" color="primary" display="inline" key={tag}>
				#{tag}{" "}
			</Typography>
		));
	};

	const getLikeButtonText = () => {
		if (likeStatus) {
			console.log(likeStatus);
			if (likeStatus.iLike === true) {
				return "UNLIKE";
			} else if (likeStatus.heLike === true) {
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

	const getOrientationIcon = () => {
		console.log(profile?.sexualOrientation);
		switch (profile?.sexualOrientation) {
			case "lesbian":
				return "fa fa-venus";
			case "gay":
				return "fa fa-mars";
			case "bisexual":
				return "fa fa-venus-mars";
		}
		if (profile?.gender === "male") {
			return "fa fa-venus";
		}
		return "fa fa-mars";
	};

	return (
		<div className={classes.main}>
			<Paper elevation={5} className={classes.paper}>
				{profile && (
					<div className={classes.container}>
						<div>
							<ProfilePictures
								imgs={[null, null, null, null, null]}
								modifiable={false}
								username={profile.username}
							/>
						</div>
						<div>
							{!isMobile ? (
								<Typography variant="h5" align="center">
									{profile.username +
										" - " +
										profile.firstname +
										" " +
										profile.lastname +
										(location &&
											", " + location.distanceInKm?.toFixed(1) + " km")}
								</Typography>
							) : (
								<React.Fragment>
									<Typography variant="h5" align="center">
										{profile.username +
											(location &&
												", " + location.distanceInKm?.toFixed(1) + " km")}
									</Typography>
									<Typography variant="h5" align="center">
										-
									</Typography>
									<Typography variant="h5" align="center">
										{profile.firstname + " " + profile.lastname}
									</Typography>
								</React.Fragment>
							)}
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Typography
									style={{
										display: "flex",
										alignItems: "center",
									}}
									variant="button"
									color="primary"
									display="inline"
								>
									{profile.dob && getAge(profile.dob) + " y/o"}
									<Icon
										className={
											profile.gender === "female" ? "fa fa-venus" : "fa fa-mars"
										}
									></Icon>
									{"looking for  "}
									<Icon className={getOrientationIcon()}></Icon>
								</Typography>
							</div>
							<Typography align="center">
								{getConnectionStatusText()}
							</Typography>
						</div>
						<div style={{ marginTop: "40px" }}>{tags && formatTags(tags)}</div>
						<div className={classes.bio}>
							<Typography align="center">{profile.bio}</Typography>
						</div>
						<div>
							{likeStatus !== undefined && props.hasImages && (
								<Button
									color="primary"
									variant="contained"
									onClick={toggleLikeProfile}
									style={{ justifySelf: "center", marginTop: "30px" }}
									disabled={isBlackListed}
								>
									{getLikeButtonText()}
								</Button>
							)}
						</div>
						<div className={classes.buttons}>
							<Typography
								variant="button"
								color="primary"
								style={{
									display: "flex",
									alignItems: "center",
									marginRight: "auto",
								}}
							>
								Pop. score {" " + profile.popularityScore}
							</Typography>
							<Button
								style={{ display: "flex", justifySelf: "flex-end" }}
								variant="outlined"
								onClick={toggleBlackListProfile}
							>
								{isBlackListed ? "UNBLOCK" : "BLOCK"}
							</Button>
							<Button variant="outlined">REPORT</Button>
						</div>
					</div>
				)}
			</Paper>
		</div>
	);
};

export const VisitProfilePage = withReduxProps(VisitProfilePageComponent);
