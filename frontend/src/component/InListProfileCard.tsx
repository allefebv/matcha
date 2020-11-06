/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   InListProfileCard.tsx                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:19:05 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/04 18:32:05 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

import { Avatar, Card, Typography } from "@material-ui/core";
import { IlistProfiles } from "../types/types";

const styleCard: React.CSSProperties = {
	display: "flex",
	height: "8vh",
	width: "100%",
};

type Props = {
	entry: any;
};

export function InListProfileCard(props: Props) {
	return (
		<Card style={styleCard}>
			<Avatar
				src={"http://localhost:3001/images/" + props.entry.username + "img0"}
			></Avatar>
			<Typography>{props.entry.username}</Typography>
		</Card>
	);
}
