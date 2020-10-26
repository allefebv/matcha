/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   chatListProfile.tsx                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/23 16:41:58 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react';

import { socket } from '../../domain/root/App';
import { IextendedProfile } from '../../types/types';
import { CustomAvatar } from '../CustomAvatar';

interface Props {
	tabMatch: IextendedProfile[];
	userSelect: string | null;
	setUserSelect: React.Dispatch<React.SetStateAction<string | null>>;
}

const ChatListProfileComponent = (props: Props) => {
	return (
		<div
			style={{
				display: "flex",
				maxWidth: "500px",
				minWidth: "200px",
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
							key={item.userId + item.username}
							style={{
								display: "flex",
								alignItems: "center",
								height: 50,
								width: "100%",
								backgroundColor:
									item.username === props.userSelect ? "#3e50b5" : "lightGrey",
							}}
							onClick={() => {
								props.setUserSelect(item.username);
							}}
						>
							<div style={{ marginLeft: 10 }}>
								<CustomAvatar src={"undefined"} id={0} />
							</div>
							<div
								style={{
									marginLeft: 10,
									fontFamily: "Roboto",
									fontSize: 18,
									textAlign: "center",
								}}
							>
								{item.username}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export const ChatListProfile = ChatListProfileComponent;
