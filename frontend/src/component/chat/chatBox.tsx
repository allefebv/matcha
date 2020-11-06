/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   chatBox.tsx                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/06 13:05:10 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import { socket } from "../../domain/root/App";
import { getMessageAPI } from "../../services/apiCalls";
import { actionUi_showSnackbar } from "../../store/ui/action";
import { Iprofile } from "../../types/types";
import { ChatLine } from "./chatLine";

const withReduxProps = connect((state: any) => ({
	profile: state.user.profile,
	token: state.user.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
	userProfile: Iprofile;
	userSelect: string | null;
	message: {
		sender: string;
		message: string;
		timestamp: number;
	} | null;
} & ReduxProps;

const ChatBoxComponent = (props: Props) => {
	const [input, setInput] = useState("");
	const [listMessage, setListMessage] = useState<
		{
			username: string;
			message: string;
			timestamp: number;
		}[]
	>([]);

	useEffect(() => {
		console.log(props.message);
		if (
			props.userSelect &&
			props.message &&
			props.userSelect === props.message.sender
		) {
			const tmpList = [...listMessage];
			tmpList.push({
				username: props.userSelect,
				message: props.message.message,
				timestamp: props.message.timestamp,
			});
			setListMessage(tmpList);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.message]);

	useEffect(() => {
		setListMessage([]);
		const details = {
			username1: props.profile.username,
			username2: props.userSelect,
		};
		getMessageAPI(details, props.token)
			.then((result) => {
				const listResult = result.map((item) => {
					return {
						username: item.sender,
						timestamp: parseInt(item.timestamp),
						message: item.message,
					};
				});
				setListMessage(listResult);
			})
			.catch((error) => {
				props.dispatch(
					actionUi_showSnackbar({
						message: error.message,
						type: "error",
					})
				);
				console.log(error.message);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.userSelect]);

	useEffect(() => {
		const chatScroll = document.getElementById("chatScroll");
		chatScroll && chatScroll.scrollIntoView(false);
	});

	function handleInput(event: React.FormEvent<HTMLInputElement>) {
		setInput(event.currentTarget.value);
	}

	function handleSendButton() {
		if (input && input.length) {
			listMessage.push({
				username: props.userProfile.username,
				message: input,
				timestamp: Date.now(),
			});
			setInput("");
			socket.emit("chatMessage", {
				receiver: props.userSelect,
				sender: props.userProfile.username,
				timestamp: Date.now(),
				message: input,
			});
		}
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "flex-end",
				width: "100%",
				backgroundColor: "white",
				marginTop: 64,
			}}
		>
			<div
				style={{
					overflowY: "scroll",
				}}
			>
				<div id={"chatScroll"}>
					{listMessage.map((item) => {
						return (
							<ChatLine
								key={item.timestamp + item.username}
								lineItem={item}
								userProfile={props.userProfile}
							/>
						);
					})}
				</div>
			</div>
			<div
				style={{
					display: "flex",
					width: "100%",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<input
					type="text"
					style={{
						width: "100%",
						height: 50,
						borderRadius: 16,
						borderColor: "lightGrey",
						borderWidth: "1px",
						margin: 10,
						outline: "none",
						paddingLeft: 10,
					}}
					onChange={handleInput}
					placeholder={"Your message"}
					value={input}
					onKeyPress={(event) => {
						if (event.key === "Enter") handleSendButton();
					}}
				></input>
				<button
					style={{
						width: 100,
						height: 50,
						color: "black",
						marginTop: 10,
						marginBottom: 10,
						marginRight: 10,
						borderRadius: 16,
						outline: "none",
					}}
					onClick={handleSendButton}
				>
					Send
				</button>
			</div>
		</div>
	);
};

export const ChatBox = withReduxProps(ChatBoxComponent);
