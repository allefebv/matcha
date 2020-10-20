/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfilePictures.tsx                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/14 13:31:30 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/20 10:34:19 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";
import { CustomAvatar } from "../../component/CustomAvatar";
import { AvatarGroup } from "@material-ui/lab";
import { connect, ConnectedProps } from "react-redux";

const withReduxProps = connect((state: any) => ({
	username: state.user.profile.username,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
	imgs: (string | null)[];
	setImgs: React.Dispatch<React.SetStateAction<(string | null)[]>>;
} & ReduxProps;

const ProfilePicturesComponent = (props: Props) => {
	function handleChangeImg(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, files } = e.currentTarget;
		const img = files && URL.createObjectURL(files[0]);
		const tmpImgs = [...props.imgs];
		tmpImgs[parseInt(name)] = img;
		props.setImgs(tmpImgs);
	}

	const images = props.imgs.map((img, index) => {
		const path =
			"http://localhost:3001/images/" + props.username + "/img" + index;
		return (
			<CustomAvatar
				key={"img" + index}
				id={index}
				src={img || path}
				handleChange={handleChangeImg}
			/>
		);
	});

	return <AvatarGroup>{images}</AvatarGroup>;
};

export const ProfilePictures = withReduxProps(ProfilePicturesComponent);
