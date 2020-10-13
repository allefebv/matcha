import React from "react";
import { CustomAvatar } from "../../component/CustomAvatar";
import { AvatarGroup } from "@material-ui/lab";
import { Iprofile } from "../../types/types";

interface Props {
	setImgUrls: React.Dispatch<React.SetStateAction<string[]>>;
	imgUrls: string[];
}

export const ProfilePictures = (props: Props) => {
	function handleChangeImg(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, files } = e.currentTarget;
		const img = files && URL.createObjectURL(files[0]);
		const tmpImgs = [...props.imgUrls];
		if (img) {
			tmpImgs.push(img);
		}
		props.setImgUrls(tmpImgs);
	}

	const iterator = props.imgUrls.values();

	return (
		<AvatarGroup>
			<CustomAvatar
				id={0}
				src={iterator.next().value || null}
				handleChange={handleChangeImg}
			/>
			<CustomAvatar
				id={1}
				src={iterator.next().value || null}
				handleChange={handleChangeImg}
			/>
			<CustomAvatar
				id={2}
				src={iterator.next().value || null}
				handleChange={handleChangeImg}
			/>
			<CustomAvatar
				id={3}
				src={iterator.next().value || null}
				handleChange={handleChangeImg}
			/>
			<CustomAvatar
				id={4}
				src={iterator.next().value || null}
				handleChange={handleChangeImg}
			/>
		</AvatarGroup>
	);
};
