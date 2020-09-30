import React from "react";
import { CustomAvatar } from "./CustomAvatar";
import { AvatarGroup } from "@material-ui/lab";
import { Iimgs, Iprofile } from "../types/types";

interface Props {
	setProfile: React.Dispatch<React.SetStateAction<Iprofile>>;
	profile: Iprofile;
}

export const ProfilePictures = (props: Props) => {
	function handleChangeImg(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, files } = e.currentTarget;
		const img = files && URL.createObjectURL(files[0]);
		props.setProfile({
			...props.profile,
			imgs: { ...props.profile.imgs, [name]: img },
		});
		console.log(imgs);
	}

	const { imgs } = props.profile;

	return (
		<AvatarGroup>
			<CustomAvatar
				id={0}
				src={imgs.img0 ? imgs.img0 : null}
				handleChange={handleChangeImg}
			/>
			<CustomAvatar
				id={1}
				src={imgs.img1 ? imgs.img1 : null}
				handleChange={handleChangeImg}
			/>
			<CustomAvatar
				id={2}
				src={imgs.img2 ? imgs.img2 : null}
				handleChange={handleChangeImg}
			/>
			<CustomAvatar
				id={3}
				src={imgs.img3 ? imgs.img3 : null}
				handleChange={handleChangeImg}
			/>
			<CustomAvatar
				id={4}
				src={imgs.img4 ? imgs.img4 : null}
				handleChange={handleChangeImg}
			/>
		</AvatarGroup>
	);
};
