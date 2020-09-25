/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CategoryFilterSort.tsx                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:42 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/24 14:18:42 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";
import { ToggleButton } from "@material-ui/lab";

interface Props {
	label: string;
	children?: React.ReactNode;
}

const stylePlaceHolderComboFilterSort: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	backgroundColor: "ivory",
	justifyContent: "center",
	alignItems: "center",
    border: "1vw",
    width: "10vw"
};

export const CategoryFilterSort = (props: Props) => {
	const [selected, setSelected] = useState(false);

	return (
		<div style={stylePlaceHolderComboFilterSort}>
			<label>{props.label}</label>
			{props.children}
			<ToggleButton
				value="check"
				selected={selected}
				onChange={() => {
					setSelected(!selected);
				}}
			>
				{props.label}
            </ToggleButton>
		</div>
	);
};
