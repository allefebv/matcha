/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ChatPage.tsx                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/22 11:48:21 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { ChatBox } from '../../component/chat/chatBox';
import { ChatListProfile } from '../../component/chat/chatListProfile';
import { socket } from './App';

const withReduxProps = connect((state: any) => ({
	profile: state.user.profile,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

export const ChatPageComponent = (props: Props) => {
	const [tabMatch, setTabMatch] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

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
			<ChatListProfile tabMatch={tabMatch} />
			<ChatBox userProfile={props.profile} />
		</div>
	);
};

export const ChatPage = withReduxProps(ChatPageComponent);
