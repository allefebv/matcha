/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   chatListProfile.tsx                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/08 17:22:26 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

import { IlistProfiles } from "../../types/types";
import { CustomAvatar } from "../CustomAvatar";

interface Props {
	profiles: IlistProfiles[];
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
				{props.profiles.map((profile) => {
					return (
						<div
							key={profile.profile.userId + profile.profile.username}
							style={{
								display: "flex",
								alignItems: "center",
								height: 50,
								width: "100%",
								backgroundColor:
									profile.profile.username === props.userSelect
										? "#3e50b5"
										: "lightGrey",
							}}
							onClick={() => {
								props.setUserSelect(profile.profile.username);
							}}
						>
							<div style={{ marginLeft: 10 }}>
								<CustomAvatar modifiable={false} src={"undefined"} id={0} />
							</div>
							<div
								style={{
									marginLeft: 10,
									fontFamily: "Roboto",
									fontSize: 18,
									textAlign: "center",
								}}
							>
								{profile.profile.username}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export const ChatListProfile = ChatListProfileComponent;
