/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CategoryFilterSort.tsx                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:42 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/30 17:26:43 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from 'react';

import { ToggleButton } from '@material-ui/lab';

interface Props {
	label: string;
	children?: React.ReactNode;
}

export const CategoryFilterSort = (props: Props) => {
	const [selected, setSelected] = useState(false);

	return (
		<div>
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
