/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MaterialDoubleSlider.tsx                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/21 21:19:49 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/23 12:40:55 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

type Props = {
	min: number;
	max: number;
	value: number[] | number;
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
		/>
	);
};
