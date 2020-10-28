/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   InListProfileCard.tsx                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:19:05 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/27 18:28:54 by allefebv         ###   ########.fr       */
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
	entry: IlistProfiles;
};

export function InListProfileCard(props: Props) {
	const { username } = props.entry.profile;
	return (
		<Card style={styleCard}>
			<Avatar
				src={"http://localhost:3001/images/" + username + "img0"}
			></Avatar>
			<Typography>{username}</Typography>
		</Card>
	);
}
