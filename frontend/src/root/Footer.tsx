/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Footer.tsx                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:23 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/25 12:00:31 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

const styleFooter: React.CSSProperties = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "100vw",
	height: "6vh",
	justifySelf: "flex-end",
	color: "white",
	zIndex: 10,
};

interface Props {}

export class Footer extends React.Component<Props> {
	render() {
		return <div style={styleFooter}>made by jfleury and allefebv</div>;
	}
}
