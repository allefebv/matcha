import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
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
		maxWidth: 345,
	},
	media: {
        height: 0,
        paddingTop: '56%'
	},
});

export function ProfileCard() {
    const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardMedia
            className={classes.media}
            image= {require ("../images/example_girl.jpg")} />
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
