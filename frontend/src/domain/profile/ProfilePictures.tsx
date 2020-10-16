/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfilePictures.tsx                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/14 13:31:30 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/16 19:04:12 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";
import { CustomAvatar } from "../../component/CustomAvatar";
import { AvatarGroup } from "@material-ui/lab";
import { connect, ConnectedProps } from "react-redux";
import { actionUser_setImages } from "../../store/user/action";
import { Iimgs } from "../../types/types";

const withReduxProps = connect((state: any) => ({
	imgs: state.user.imgs as (string | null)[],
	username: state.user.profile.username,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const ProfilePicturesComponent = (props: Props) => {
	const [imgs, setImgs] = useState([...props.imgs]);

	function handleChangeImg(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, files } = e.currentTarget;
		const img = files && URL.createObjectURL(files[0]);
		const tmpImgs = [...props.imgs];
		tmpImgs[parseInt(name)] = img;
		props.dispatch(actionUser_setImages({ imgs: tmpImgs }));
	}

	// const getArray = () => {
	// 	const srcs = imgs.map(async (img, index) => {
	// 		await fetch(path, { mode: "no-cors" })
	// 			.then((response: Response) => {
	// 				const keys = response.headers.keys();
	// 				for (let key of keys) {
	// 					console.log(key);
	// 				}
	// 			})
	// 			.catch((error) => console.log(error));
	// 	});
	// };

	const images = props.imgs.map((img, index) => {
		return (
			<CustomAvatar
				key={"img" + index}
				id={index}
				src={img}
				handleChange={handleChangeImg}
			/>
		);
	});

	return <AvatarGroup>{images}</AvatarGroup>;
};

export const ProfilePictures = withReduxProps(ProfilePicturesComponent);
