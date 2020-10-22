/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   chatLine.tsx                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/22 11:02:15 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/22 15:57:47 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from 'react';

import { IextendedProfile } from '../../types/types';

interface Props {
	lineItem: { username: string; message: string; timestamp: number };
	userProfile: IextendedProfile;
}

const ChatLineComponent = (props: Props) => {
	if (props.lineItem.username == props.userProfile.username) {
		return (
			<div
				style={{
					display: "flex",
					alignItems: "flex-end",
					marginRight: 5,
					margin: 5,
					fontFamily: "Roboto",
					color: "white",
					flexDirection: "column",
					overflowAnchor: "auto",
				}}
			>
				<text
					style={{
						display: "flex",
						backgroundColor: "#3e50b5",
						borderRadius: 16,
						paddingTop: 5,
						paddingBottom: 5,
						paddingLeft: 10,
						paddingRight: 10,
						fontSize: 15,
					}}
				>
					{props.lineItem.message}
				</text>
				<text
					style={{
						marginRight: 10,
						marginTop: 2,
						color: "black",
						fontSize: 8,
						textAlign: "end",
					}}
				>
					{new Date(props.lineItem.timestamp).getHours() +
						":" +
						new Date(props.lineItem.timestamp).getMinutes()}
				</text>
			</div>
		);
	} else {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "flex-start",
					marginLeft: 5,
					margin: 5,
				}}
			>
				<text
					style={{
						color: "black",
						backgroundColor: "lightGrey",
						borderRadius: 16,
						paddingTop: 5,
						paddingBottom: 5,
						paddingLeft: 10,
						paddingRight: 10,
						fontFamily: "Roboto",
					}}
				>
					{props.lineItem.message}
					{props.lineItem.timestamp}
				</text>
			</div>
		);
	}
};

export const ChatLine = ChatLineComponent;
