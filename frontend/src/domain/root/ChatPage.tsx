/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ChatPage.tsx                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/08 17:21:53 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import { ChatBox } from "../../component/chat/chatBox";
import { ChatListProfile } from "../../component/chat/chatListProfile";
import { socket } from "../../domain/root/App";
import { getMatchesAPI } from "../../services/apiCalls";
import { IlistProfiles, Iprofile } from "../../types/types";

const withReduxProps = connect((state: any) => ({
	profile: state.user.profile,
	token: state.user.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const ChatPageComponent = (props: Props) => {
	const [profiles, setProfiles] = useState<IlistProfiles[]>([]);
	const [userSelect, setUserSelect] = useState<string | null>(null);
	const [message, setMessage] = useState<{
		sender: string;
		message: string;
		timestamp: number;
	} | null>(null);

	useEffect(() => {
		getMatchesAPI(props.token)
			.then((profiles) => {
				if (profiles && profiles.length) {
					setProfiles(profiles);
					setUserSelect(profiles[0].profile.username);
				}
			})
			.catch((error) => console.log(error));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function callBack(item: {
		sender: string;
		message: string;
		timestamp: number;
	}) {
		setMessage({
			sender: item.sender,
			message: item.message,
			timestamp: item.timestamp,
		});
	}

	useEffect(() => {
		socket.on("message" + props.profile.username, callBack);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setMessage(null);
	}, [userSelect]);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				position: "absolute",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
			}}
		>
			<ChatListProfile
				profiles={profiles}
				userSelect={userSelect}
				setUserSelect={setUserSelect}
			/>
			<ChatBox
				userProfile={props.profile}
				userSelect={userSelect}
				message={message}
			/>
		</div>
	);
};

export const ChatPage = withReduxProps(ChatPageComponent);
