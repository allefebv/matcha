/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileCard.tsx                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/30 17:59:49 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/21 12:22:25 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

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
	profile: { profile: any; score: number };
};

export function ProfileCard(props: Props) {
	const classes = useStyles();
	const { profile } = props.profile;
	const path = "http://localhost:3001/images/" + profile.username + "/img0";

	return (
		<Card className={classes.root}>
			<CardMedia className={classes.media} image={path} />
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					My name is ruth and I like poneys
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
}
