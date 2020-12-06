/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   VisitProfilePage.tsx                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/12/06 19:02:51 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
	Paper,
	makeStyles,
	Typography,
	Button,
	Icon,
	useTheme,
	useMediaQuery,
	CircularProgress,
} from "@material-ui/core";
import { ProfilePictures } from "../profile/ProfilePictures";
import { Iaddress, IlistProfiles } from "../../types/types";
import {
	visitProfileAPI,
	blacklistProfileAPI,
	likeProfileAPI,
	unlikeProfileAPI,
	getLikeStatusAPI,
	getBlackListAPI,
	deleteBlacklistProfileAPI,
	getProfileByUsernameAPI,
} from "../../services/apiCalls";
import { connect, ConnectedProps } from "react-redux";
import { actionUi_showSnackbar } from "../../store/ui/action";
import { socket } from "./App";
import { getTimeElapsed } from "../../services/timeUtils";
import {
	errorHandling,
	getAge,
	isProfileBlacklisted,
	profileHasImages,
} from "../../services/profileUtils";
import { actionUser_setBlackList } from "../../store/user/action";
import { ReportProfileDialog } from "../user/ReportProfileDialog";

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
		justifyContent: "center",
		width: "100vw",
		height: "90vh",
		marginTop: 100,
	},
	container: {
		marginTop: 50,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		[theme.breakpoints.down("xs")]: {
			padding: "16px",
		},
	},
	paper: {
		display: "flex",
		width: "80%",
		height: 600,
		justifyContent: "center",
		alignContent: "center",
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
		flexDirection: "column",
		margin: 10,
		marginTop: 50,
		marginBottom: 50,
	},
	bio: {
		width: "60%",
		marginTop: 50,
		marginBottom: 20,
		[theme.breakpoints.down("xs")]: {
			width: "100%",
		},
		alignSelf: "center",
	},
}));

const VisitProfilePageComponent = (props: Props) => {
	const historyLocation = useLocation<IlistProfiles>();
	const [profile, setProfile] = useState<IlistProfiles>();
	const [location, setLocation] = useState<Iaddress | null>(null);
	const [tags, setTags] = useState<string[] | null>(null);
	const [likeStatus, setLikeStatus] = useState<{
		iLike: boolean;
		heLike: boolean;
	}>();
	const ref = useRef(profile);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
	const [isLikeLoading, setIsLikeLoading] = useState(false);
	const [isBlockLoading, setIsBlockLoading] = useState(false);

	const updateProfile = (profile: IlistProfiles) => {
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
			getProfileByUsernameAPI(
				props.loggedIn,
				historyLocation.state.profile.username
			).then((profile) => {
				updateProfile(profile);
				setLocation(profile.location);
				setTags(historyLocation.state.tag);
			});
			socket.on("online", updateConnectionStatus);
			socket.on("offline", updateConnectionStatus);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [historyLocation]);

	useEffect(() => {
		if (!isBlackListed) {
			visitProfile();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.blackList]);

	const visitProfile = () => {
		visitProfileAPI(
			{ username: historyLocation.state.profile.username },
			props.loggedIn
		).catch((error) => errorHandling(error, props.dispatch));
	};

	const getLikeStatus = () => {
		getLikeStatusAPI(
			{ username: historyLocation.state.profile.username },
			props.loggedIn
		)
			.then((json) => {
				setLikeStatus(json);
			})
			.catch((error) => errorHandling(error, props.dispatch));
	};

	const toggleBlackListProfile = () => {
		setIsBlockLoading(true);
		if (!isBlackListed) {
			blacklistProfileAPI(
				{ username: historyLocation.state.profile.username },
				props.loggedIn
			)
				.then(() => {
					getBlackListAPI(props.loggedIn)
						.then((json) => {
							props.dispatch(actionUser_setBlackList({ blackList: json }));
							setIsBlockLoading(false);
						})
						.catch((error) => {
							setIsBlockLoading(false);
							errorHandling(error, props.dispatch);
						});
				})
				.catch((error) => {
					setIsBlockLoading(false);
					errorHandling(error, props.dispatch);
				});
		} else {
			deleteBlacklistProfileAPI(
				{ username: historyLocation.state.profile.username },
				props.loggedIn
			)
				.then(() => {
					getBlackListAPI(props.loggedIn)
						.then((json) => {
							setIsBlockLoading(false);
							props.dispatch(actionUser_setBlackList({ blackList: json }));
						})
						.catch((error) => {
							setIsBlockLoading(false);
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
					setIsBlockLoading(false);
					errorHandling(error, props.dispatch);
				});
		}
	};

	const toggleLikeProfile = () => {
		setIsLikeLoading(true);
		if (likeStatus !== undefined && likeStatus.iLike === false) {
			likeProfileAPI(
				{ username: historyLocation.state.profile.username },
				props.loggedIn
			)
				.then(() => {
					setLikeStatus({ ...likeStatus, iLike: true });
					setIsLikeLoading(false);
				})
				.catch((error) => {
					setIsLikeLoading(false);
					errorHandling(error, props.dispatch);
				});
		} else if (likeStatus !== undefined && likeStatus.iLike === true) {
			unlikeProfileAPI(
				{ username: historyLocation.state.profile.username },
				props.loggedIn
			)
				.then(() => {
					setIsLikeLoading(false);
					setLikeStatus({ ...likeStatus, iLike: false });
				})
				.catch((error) => {
					setIsLikeLoading(false);
					errorHandling(error, props.dispatch);
				});
		}
	};

	const updateConnectionStatus = (userId: number) => {
		if (ref.current !== undefined) {
			const newStatus = ref.current.profile.online === 1 ? 0 : 1;
			const tmp = { ...ref.current };
			tmp.profile.online = newStatus;
			userId &&
				ref.current &&
				ref.current.profile.userId &&
				ref.current.profile.userId === userId &&
				updateProfile(tmp);
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
			if (profile.profile.online) {
				return "Online";
			} else if (profile.profile.lastConnection) {
				return (
					"Offline - last connection " +
					getTimeElapsed(parseInt(profile.profile.lastConnection))
				);
			} else {
				return "Offline";
			}
		}
	};

	const getOrientationIcon = () => {
		switch (profile?.profile.sexualOrientation) {
			case "lesbian":
				return "fa fa-venus";
			case "gay":
				return "fa fa-mars";
			case "bisexual":
				return "fa fa-venus-mars";
		}
		if (profile?.profile.gender === "male") {
			return "fa fa-venus";
		}
		return "fa fa-mars";
	};

	return (
		<div className={classes.main}>
			<Paper elevation={5} className={classes.paper}>
				{profile && (
					<div className={classes.container}>
						<div style={{margin: 10}}>
							<ProfilePictures
								imgs={[null, null, null, null, null]}
								modifiable={false}
								username={profile.profile.username}
							/>
						</div>
						<div>
							{!isMobile ? (
								<Typography variant="h5" align="center">
									{profile.profile.username +
										" - " +
										profile.profile.firstname +
										" " +
										profile.profile.lastname +
										(location &&
											location.distanceInKm &&
											", " + Math.ceil(location.distanceInKm) + " km")}
								</Typography>
							) : (
								<React.Fragment>
									<Typography variant="h5" align="center">
										{profile.profile.username +
											(location &&
												location.distanceInKm &&
												", " + Math.ceil(location.distanceInKm) + " km")}
									</Typography>
									<Typography variant="h5" align="center">
										-
									</Typography>
									<Typography variant="h5" align="center">
										{profile.profile.firstname + " " + profile.profile.lastname}
									</Typography>
								</React.Fragment>
							)}
							<div
								style={{
									display: "flex",
									margin: 10,
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
									{profile.profile.dob && getAge(profile.profile.dob) + " y/o"}
									<Icon
										className={
											profile.profile.gender === "female"
												? "fa fa-venus"
												: "fa fa-mars"
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
							<Typography align="center">{profile.profile.bio}</Typography>
						</div>
						<div>
							{likeStatus !== undefined && props.hasImages && (
								<Button
									disabled={isLikeLoading || isBlackListed}
									startIcon={isLikeLoading ? <CircularProgress /> : null}
									color="primary"
									variant="contained"
									onClick={toggleLikeProfile}
									style={{ justifySelf: "center", marginTop: "30px" }}
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
									textAlign: "center",
								}}
							>
								Pop. score {" " + profile.profile.popularityScore}
							</Typography>
							<div style={{display: "flex", flexDirection: "row"}}>
							<div style={{margin: 5}}>
							<Button
								disabled={isBlockLoading}
								startIcon={isBlockLoading ? <CircularProgress /> : null}
								style={{ display: "flex", justifySelf: "flex-end" }}
								variant="outlined"
								onClick={toggleBlackListProfile}
							>
								{isBlackListed ? "UNBLOCK" : "BLOCK"}
							</Button>
							</div>
							<div style={{margin: 5}}>
							<ReportProfileDialog username={profile.profile.username} />
							</div>
							</div>
						</div>
					</div>
				)}
			</Paper>
		</div>
	);
};

export const VisitProfilePage = withReduxProps(VisitProfilePageComponent);
