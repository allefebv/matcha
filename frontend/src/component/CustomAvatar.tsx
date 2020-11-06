/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CustomAvatar.tsx                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/30 17:38:42 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/06 12:39:57 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

import { Avatar, makeStyles } from "@material-ui/core";

interface Props {
	src: string | undefined;
	id: number;
	handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	modifiable: boolean;
}

const useStyles = makeStyles({
	avatar: (props: Props) => {
		return {
			width: props.id === 0 ? "min(15vh, 6vw)" : "min(12vh, 5vw)",
			height: props.id === 0 ? "min(15vh, 6vw)" : "min(12vh, 5vw)",
			"&:hover": {
				opacity: props.modifiable ? 0.6 : 1,
			},
			borderRadius: "50%",
			zIndex: 10,
		};
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
			{props.modifiable ? (
				<input
					name={props.id.toString()}
					className={classes.input}
					accept="image/*"
					type="file"
					ref={fileUpload}
					onChange={props.handleChange}
				/>
			) : null}
			<Avatar
				className={classes.avatar}
				src={props.src}
				onClick={showFileUpload}
			/>
		</React.Fragment>
	);
};
