/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CustomAvatar.tsx                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/30 17:38:42 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/19 15:45:04 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

import { Avatar, makeStyles } from "@material-ui/core";

interface Props {
	src: string | undefined;
	id: number;
	handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles({
	avatar: {
		width: (props: Props) =>
			props.id === 0 ? "min(15vh, 6vw)" : "min(12vh, 5vw)",
		height: (props: Props) =>
			props.id === 0 ? "min(15vh, 6vw)" : "min(12vh, 5vw)",
		"&:hover": {
			opacity: 0.6,
		},
		borderRadius: "50%",
		zIndex: 10,
	},
	input: {
		display: "none",
	},
});

export const CustomAvatar = (props: Props) => {
	const classes = useStyles(props);
	let fileUpload: React.RefObject<HTMLInputElement> = React.createRef();

	const showFileUpload = () => {
		if (fileUpload && fileUpload.current !== null) {
			fileUpload.current.click();
		}
	};

	return (
		<React.Fragment>
			<input
				name={props.id.toString()}
				className={classes.input}
				accept="image/*"
				type="file"
				ref={fileUpload}
				onChange={props.handleChange}
			/>
			<Avatar
				className={classes.avatar}
				src={props.src}
				onClick={showFileUpload}
			/>
		</React.Fragment>
	);
};
