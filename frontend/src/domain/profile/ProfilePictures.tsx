/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfilePictures.tsx                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/14 13:31:30 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/15 15:12:18 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { CustomAvatar } from "../../component/CustomAvatar";
import { AvatarGroup } from "@material-ui/lab";
import { connect, ConnectedProps } from "react-redux";
import { actionUser_setImages } from "../../store/user/action";
import { Iimgs } from "../../types/types";

const withReduxProps = connect((state: any) => ({
	imgs: state.user.imgs,
	username: state.user.profile.username,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const ProfilePicturesComponent = (props: Props) => {
	function handleChangeImg(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, files } = e.currentTarget;
		const img = files && URL.createObjectURL(files[0]);
		const tmpImgs: Iimgs = { ...props.imgs, [name]: img };
		props.dispatch(actionUser_setImages({ imgs: tmpImgs }));
	}

	const images = Object.entries(props.imgs).map((entry: any, index) => (
		<CustomAvatar
			key={entry[0]}
			id={index}
			src={
				entry[1] || "http://localhost:3001/" + props.username + "/img" + index
			}
			handleChange={handleChangeImg}
		/>
	));

	return <AvatarGroup>{images}</AvatarGroup>;
};

export const ProfilePictures = withReduxProps(ProfilePicturesComponent);
