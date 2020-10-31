/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   UserProfilePage.tsx                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/31 16:10:04 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { ProfileCardsScroll } from "../../component/ProfileCardsScroll";
import {
	getProfileLikesAPI,
	getProfileVisitsAPI,
	handleGeoLocationAPI,
} from "../../services/apiCalls";
import { connect, ConnectedProps } from "react-redux";
import {
	actionUser_geolocation,
	actionUser_setProfile,
} from "../../store/user/action";
import { actionUi_showSnackbar } from "../../store/ui/action";
import { BaseProfileFormContent } from "../profile/BaseProfileFormContent";
import { ProfileOptional1 } from "../profile/ProfileOptional1";
import { ProfileOptional2 } from "../profile/ProfileOptional2";
import { ProfileOptional3 } from "../profile/ProfileOptional3";
import { Iprofile, IlistProfiles, Iaddress } from "../../types/types";
import {
	getProfileHydrateRedux,
	submitPictures,
	submitTags,
	submitUsageLocation,
	updateProfile,
} from "../../services/profileUtils";
import { useGeolocation } from "../../services/useGeolocation";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	profile: state.user.profile as Iprofile,
	tagList: state.user.tagList,
	usageLocation: state.user.usagelocation,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const UserProfilePageComponent = (props: Props) => {
	const [profile, setProfile] = useState<Iprofile>({ ...props.profile });
	const [tagList, setTagList] = useState<string[]>([...props.tagList]);
	const [disabled, setDisabled] = useState(false);
	const [profileVisits, setProfileVisits] = useState<IlistProfiles[]>();
	const [profileLikes, setProfileLikes] = useState<IlistProfiles[]>();
	const [usageLocation, setUsageLocation] = useState<Iaddress | null>({
		...props.usageLocation,
	});
	const [imgs, setImgs] = useState<(string | null)[]>([
		null,
		null,
		null,
		null,
		null,
	]);

	const geolocation = useGeolocation();

	useEffect(() => {
		if (geolocation) {
			props.dispatch(
				actionUser_geolocation({
					geolocation: geolocation,
				})
			);
			handleGeoLocationAPI(geolocation, props.loggedIn).catch((error) => {
				props.dispatch(
					actionUi_showSnackbar({
						message: error.message,
						type: "error",
					})
				);
				console.log(error.message);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [geolocation]);

	useEffect(() => {
		getProfileHydrateRedux(props.dispatch, props.loggedIn);
		getProfileVisitsList();
		getProfileLikesList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProfile({ ...profile, [name]: value });
	};

	const handleSubmit = async () => {
		await Promise.all([
			updateProfile(profile, props.loggedIn, props.dispatch),
			submitTags(tagList, props.loggedIn, props.dispatch),
			submitPictures(imgs, props.loggedIn, props.dispatch),
			usageLocation &&
				submitUsageLocation(usageLocation, props.loggedIn, props.dispatch),
		]);
	};

	const getProfileVisitsList = () => {
		getProfileVisitsAPI(props.loggedIn)
			.then((json) => {
				setProfileVisits(json);
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

	const getProfileLikesList = () => {
		getProfileLikesAPI(props.loggedIn)
			.then((json) => {
				setProfileLikes(json);
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

	return (
		<Grid item container direction="row" style={{ height: "100%" }}>
			<Grid
				container
				item
				xs={12}
				sm={9}
				style={{ height: "100%" }}
				alignContent="flex-start"
				justify="center"
			>
				<Grid item container justify="center" xs={6}>
					<Grid item xs={12} lg={8}>
						<ProfileOptional2
							handleChange={handleChangeProfile}
							imgs={imgs}
							setImgs={setImgs}
							profile={profile}
							tagList={tagList}
							setTagList={setTagList}
						/>
					</Grid>
					<Grid item xs={12} lg={8}>
						<BaseProfileFormContent
							profile={profile}
							setProfile={setProfile}
							setDisabled={setDisabled}
						/>
					</Grid>
					<Grid item xs={12} lg={8}>
						<ProfileOptional1 setProfile={setProfile} profile={profile} />
					</Grid>
					<Grid item xs={12} lg={8}>
						<ProfileOptional3
							usageLocation={usageLocation}
							setUsageLocation={setUsageLocation}
							handleChange={handleChangeProfile}
							profile={profile}
							setProfile={setProfile}
						/>
					</Grid>
					<Grid item xs={12} lg={8}>
						<Button
							variant="contained"
							color="primary"
							onClick={handleSubmit}
							fullWidth
							disabled={disabled}
						>
							Update Profile
						</Button>
					</Grid>
				</Grid>
			</Grid>

			<Grid
				container
				item
				xs={12}
				sm={3}
				style={{ height: "100%" }}
				spacing={3}
			>
				<Grid item xs={12} style={{ height: "50%" }}>
					<ProfileCardsScroll list={profileLikes} />
				</Grid>
				<Grid item xs={12} style={{ height: "50%" }}>
					<ProfileCardsScroll list={profileVisits} />
				</Grid>
			</Grid>
		</Grid>
	);
};

export const UserProfilePage = withReduxProps(UserProfilePageComponent);
