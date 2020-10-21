/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileCard.tsx                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/30 17:59:49 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/26 15:50:57 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { getAge } from "../services/profileUtils";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Button } from "@material-ui/core";
import * as constants from "../services/constants";
import { Redirect, useHistory } from "react-router-dom";
import { copyFileSync } from "fs";

const useStyles = makeStyles({
	root: {
		margin: 20,
	},
	media: {
		height: 0,
		paddingTop: "56%",
	},
});

type Props = {
	profile: any;
};

export function ProfileCard(props: Props) {
	const classes = useStyles();
	const { profile } = props.profile.profile;
	const path = "http://localhost:3001/images/" + profile.username + "/img0";
	const history = useHistory();

	const handleRedirectProfile = () => {
		console.log(props.profile);
		history.push({
			pathname: constants.VISIT_PROFILE,
			state: props.profile,
		});
	};

	const formatTags = (tags: string[]) => {
		return tags.map((tag) => (
			<Typography display="inline" key={tag}>
				#{tag}{" "}
			</Typography>
		));
	};

	return (
		<Card className={classes.root}>
			<CardMedia className={classes.media} image={path} />
			<CardContent>
				<Typography variant="body1">
					{profile.username}, {getAge(profile.dob)}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{profile.bio}
				</Typography>
				{formatTags(props.profile.profile.tag)}
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<Button
					startIcon={<AccountCircleIcon />}
					onClick={handleRedirectProfile}
				>
					<Typography variant="button">View Profile</Typography>
				</Button>
			</CardActions>
		</Card>
	);
}
