/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ChatPage.tsx                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/28 17:37:36 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import { ChatBox } from "../../component/chat/chatBox";
import { ChatListProfile } from "../../component/chat/chatListProfile";
import { socket } from "../../domain/root/App";
import { getMatchesAPI } from "../../services/apiCalls";
import { errorHandling } from "../../services/profileUtils";
import { IlistProfiles } from "../../types/types";

const withReduxProps = connect((state: any) => ({
	profile: state.user.profile,
	token: state.user.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const useStyles = makeStyles({
	main: {
		display: "flex",
		flexDirection: "row",
		position: "absolute",
		top: 0,
		left: 0,
		width: "100vw",
		height: "100vh",
		overflow: "hidden",
	},
});

const ChatPageComponent = (props: Props) => {
	const classes = useStyles();
	const [profiles, setProfiles] = useState<IlistProfiles[]>([]);
	const [userSelect, setUserSelect] = useState<IlistProfiles | null>(null);
	const [message, setMessage] = useState<{
		sender: string;
		message: string;
		timestamp: number;
	} | null>(null);

	useEffect(() => {
		let isMounted = true;
		getMatchesAPI(props.token)
			.then((profiles) => {
				if (profiles && profiles.length && isMounted) {
					setProfiles(profiles);
					setUserSelect(profiles[0]);
				}
			})
			.catch((error) => errorHandling(error, props.dispatch));
		return () => {
			isMounted = false;
		};
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
		let isMounted = true;
		isMounted && setMessage(null);
		return () => {
			isMounted = false;
		};
	}, [userSelect]);

	return (
		<div className={classes.main}>
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
