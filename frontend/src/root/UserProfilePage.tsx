/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   UserProfilePage.tsx                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/28 14:53:35 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { Avatar, Grid } from "@material-ui/core";
import { ProfileCardsScroll } from "../component/ProfileCardsScroll";

const styleProfile: React.CSSProperties = {
	backgroundColor: "black",
	width: "100%",
};

const styleMainProfilePic: React.CSSProperties = {
	width: "min(15vh, 15vw)",
	height: "min(15vh, 15vw)",
};

const styleSecondaryProfilePics: React.CSSProperties = {
	width: "min(12vh, 12vw)",
	height: "min(12vh, 12vw)",
};

interface Props {}

export const UserProfilePage = (props: Props) => {
	return (
		<Grid item container direction="row" style={{height: "100%"}}>
			<Grid container item xs={9} style={{height: "100%"}}>
				<Avatar
					style={styleMainProfilePic}
					src={require("../images/example_girl.jpg")}
				></Avatar>
				<Avatar
					style={styleSecondaryProfilePics}
					src={require("../images/example_girl.jpg")}
				></Avatar>
				<Avatar
					style={styleSecondaryProfilePics}
					src={require("../images/example_girl.jpg")}
				></Avatar>
				<Avatar
					style={styleSecondaryProfilePics}
					src={require("../images/example_girl.jpg")}
				></Avatar>
				<Avatar
					style={styleSecondaryProfilePics}
					src={require("../images/example_girl.jpg")}
				></Avatar>
			</Grid>
			<Grid container item xs={3} style={{height: "100%"}} spacing={3}>
				<Grid item xs={12} style={{ height: "50%" }}>
					<ProfileCardsScroll />
				</Grid>
				<Grid item xs={12} style={{ height: "50%" }}>
					<ProfileCardsScroll />
				</Grid>
			</Grid>
		</Grid>
	);
};
