/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileCardsScroll.tsx                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:19:05 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/28 14:49:40 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { InListProfileCard } from "./InListProfileCard";

const styleList: React.CSSProperties = {
	width: "100%",
	overflow: "scroll",
	maxHeight: "100%"
};

export function ProfileCardsScroll() {
	return (
		<List style={styleList}>
			<ListItem>
				<InListProfileCard></InListProfileCard>
			</ListItem>
			<ListItem>
				<InListProfileCard></InListProfileCard>
			</ListItem>
			<ListItem>
				<InListProfileCard></InListProfileCard>
			</ListItem>
			<ListItem>
				<InListProfileCard></InListProfileCard>
			</ListItem>
			<ListItem>
				<InListProfileCard></InListProfileCard>
			</ListItem>
			<ListItem>
				<InListProfileCard></InListProfileCard>
			</ListItem>
		</List>
	);
}
