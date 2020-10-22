/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   chatBox.tsx                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/22 17:07:57 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useRef, useState } from 'react';
import { isTemplateExpression } from 'typescript';

import {
	datePickerDefaultProps
} from '@material-ui/pickers/constants/prop-types';

import { socket } from '../../domain/root/App';
import { UserProfilePage } from '../../domain/root/UserProfilePage';
import { IextendedProfile } from '../../types/types';
import { ChatLine } from './chatLine';

interface Props {
	userProfile: IextendedProfile;
	userSelect: string | null;
}

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
		setListMessage([
			{ username: "test", message: "Nouveau chat", timestamp: Date.now() },
		]);
	}, [props.userSelect]);

	useEffect(() => {
		socket.on(
			props.userProfile.username,
			(item: { username: string; message: string; timestamp: number }) => {
				const tmpTab = [...listMessage];
				tmpTab.push({
					username: item.username,
					message: item.message,
					timestamp: item.timestamp,
				});
				setListMessage(tmpTab);
				console.log(listMessage);
			}
		);
	}, [listMessage]);

	useEffect(() => {
		const chatScroll = document.getElementById("chatScroll");
		chatScroll && chatScroll.scrollIntoView(false);
	});

	function handleInput(event: React.FormEvent<HTMLInputElement>) {
		setInput(event.currentTarget.value);
	}

	function handleSendButton() {
		if (input.length) {
			const tmpTab = listMessage;
			tmpTab.push({
				username: props.userProfile.username,
				message: input,
				timestamp: Date.now(),
			});
			setListMessage(tmpTab);
			setInput("");
			socket.emit("chatMessage", {
				for: props.userSelect,
				username: props.userProfile.username,
				message: input,
				timestamp: Date.now(),
			});
		}
	}

	if (!props.userSelect) {
		return <text>Select chat</text>;
	} else {
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
						{listMessage.map((item) => (
							<ChatLine lineItem={item} userProfile={props.userProfile} />
						))}
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
	}
};

export const ChatBox = ChatBoxComponent;
