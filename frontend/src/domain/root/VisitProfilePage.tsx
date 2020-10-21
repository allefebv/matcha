/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   VisitProfilePage.tsx                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/26 15:50:26 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Paper, makeStyles, Typography } from "@material-ui/core";
import { getAge } from "../../services/profileUtils";
import { ProfilePictures } from "../profile/ProfilePictures";

interface IlocationState {
	state: {
		profile: {
			profile: any;
			location: any;
			tag: any;
		};
	};
}

type Props = {};

const useStyles = makeStyles((theme) => ({
	main: {
		display: "flex",
		justifyContent: "center",
		height: "90vh",
		backgroundColor: "cyan",
	},
	paper: {
		display: "flex",
		width: "80%",
		[theme.breakpoints.down("sm")]: {
			width: "100%",
		},
	},
	element: {
		display: "flex",
		backgroundColor: "pink",
	},
}));

export const VisitProfilePage = (props: Props) => {
	const historyLocation = useLocation<any>();
	const classes = useStyles();
	const [profile, setProfile] = useState<any>(null);
	const [location, setLocation] = useState<any>(null);
	const [tags, setTags] = useState<any>(null);

	useEffect(() => {
		setProfile(historyLocation.state.profile.profile);
		setLocation(historyLocation.state.profile.location);
		setTags(historyLocation.state.profile.tag);
	}, [historyLocation]);

	const formatTags = (tags: string[]) => {
		return tags.map((tag) => (
			<Typography display="inline" key={tag}>
				#{tag}{" "}
			</Typography>
		));
	};

	return (
		<div className={classes.main}>
			<Paper elevation={5} className={classes.paper}>
				<ProfilePictures
					imgs={[null, null, null, null, null]}
					modifiable={false}
					username={profile && profile.username}
				/>
				<Paper variant="outlined" className={classes.element}>
					<Typography display="block">
						Username {profile && profile.username}
					</Typography>
					<Typography>Firstname {profile && profile.firstname}</Typography>
					<Typography>Lastname {profile && profile.lastname}</Typography>
				</Paper>
				<Paper>{tags && formatTags(tags)}</Paper>
				<Paper>
					<Typography variant="body1">
						{profile && getAge(profile.dob)}
					</Typography>
				</Paper>
				<Paper>
					<Typography variant="body1">
						{profile && profile.popularityScore}
						{profile && profile.sexualOrientation}
						{profile && profile.gender}
						{profile && profile.bio}
					</Typography>
				</Paper>
			</Paper>
		</div>
	);
};
