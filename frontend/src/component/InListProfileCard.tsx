/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   InListProfileCard.tsx                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:19:05 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/30 17:26:52 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react';

import { Avatar, Card } from '@material-ui/core';

const styleCard: React.CSSProperties = {
	display: "flex",
	height: "8vh",
	width: "100%"
}

export function InListProfileCard() {
	return (
		<Card style={styleCard}>
			<Avatar
				src={require("../images/example_girl.jpg")}
			></Avatar>
		</Card>
	);
}
