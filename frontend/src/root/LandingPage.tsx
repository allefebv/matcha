import { Grid } from "@material-ui/core";
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   LandingPage.tsx                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:19 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/28 21:20:38 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { SignInDialog } from "../component/SignInDialog";
import { SignUpDialog } from "../component/SignUpDialog";

const styleLanding: React.CSSProperties = {
	position: "absolute",
	top: 0,
	left: 0,
	display: "flex",
	flexDirection: "column",
	width: "100vw",
	height: "100vh",
	background:
		"radial-gradient(circle, transparent, rgba(0,0,0,0.6)50%, rgba(0,0,0,1) 100%)",
	zIndex: 1,
};

const styleImg: React.CSSProperties = {
	position: "absolute",
	top: 0,
	left: 0,
	width: "100vw",
	maxHeight: "100vh",
	minHeight: "100vh",
	zIndex: 0,
	objectFit: "cover",
	userSelect: "none",
	WebkitUserSelect: "none",
	MozUserSelect: "none",
	KhtmlUserSelect: "none",
	msUserSelect: "none",
};

interface Props {}

export const LandingPage = (props: Props) => {
	const bg = require("../images/background2.jpg");
	const isMobile = window.innerWidth < 480;

	return (
		<React.Fragment>
			<img src={bg} style={styleImg}></img>
			<Grid
				item
				container
				justify="center"
				alignItems="center"
				style={styleLanding}
			>
				{isMobile && (
					<React.Fragment>
						<SignInDialog />
						<SignUpDialog />
					</React.Fragment>
				)}
			</Grid>
		</React.Fragment>
	);
};
