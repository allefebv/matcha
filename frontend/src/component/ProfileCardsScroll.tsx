/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileCardsScroll.tsx                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:19:05 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/27 18:30:54 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { InListProfileCard } from "./InListProfileCard";
import { IlistProfiles } from "../types/types";

const styleList: React.CSSProperties = {
	width: "100%",
	overflow: "scroll",
	maxHeight: "100%",
};

type Props = {
	list: IlistProfiles[] | undefined;
};

export function ProfileCardsScroll(props: Props) {
	const cards = props.list
		? props.list.map((entry) => (
				<ListItem>
					<InListProfileCard entry={entry}></InListProfileCard>
				</ListItem>
		  ))
		: null;
	return <List style={styleList}>{cards}</List>;
}
