/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   chatListProfile.tsx                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/22 11:24:57 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from 'react';

interface Props {
	tabMatch: any[];
}

const ChatListProfileComponent = (props: Props) => {
	return (
		<div
			style={{
				display: "flex",
				width: "30%",
				boxShadow: "1px 1px 1px 1px lightGrey",
				zIndex: 1,
				marginTop: 64,
			}}
		>
			<div
				style={{
					display: "flex",
					width: "100%",
					flexDirection: "column",
				}}
			>
				{props.tabMatch.map((item) => {
					return (
						<div
							style={{
								display: "flex",
								alignItems: "center",
								height: 50,
								width: "100%",
							}}
						>
							{item}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export const ChatListProfile = ChatListProfileComponent;
