/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MaterialDoubleSlider.tsx                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/21 21:19:49 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/21 22:22:07 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
	root: {
		width: 300,
	},
});

function valuetext(value: number) {
	return `${value}°C`;
}

type Props = {
	min: number;
	max: number;
	value: number[];
	handleChange: (
		event: React.ChangeEvent<{}>,
		value: number | number[]
	) => void;
};

export const MaterialDoubleSlider = (props: Props) => {
	return (
		<Slider
			min={props.min}
			max={props.max}
			value={props.value}
			onChange={props.handleChange}
			valueLabelDisplay="auto"
			aria-labelledby="range-slider"
			getAriaValueText={valuetext}
		/>
	);
};
