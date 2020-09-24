/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   LandingPage.tsx                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:19 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/24 14:18:19 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SignInDialog } from "../component/SignInDialog";

const styleLanding: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	height: "100vh",
	width: "100vw",
	background:
		"radial-gradient(circle, transparent, rgba(0,0,0,0.6)50%, rgba(0,0,0,1) 100%)",
	zIndex: 0,
};

const styleContent: React.CSSProperties = {
	display: "flex",
	flexDirection: "row",
	alignItems: "flex-end",
	justifyContent: "center",
	flex: 1
};

const styleImg: React.CSSProperties = {
	position: "absolute",
	top: 0,
	left: 0,
	width: "100vw",
	height: "100vh",
	zIndex: -1,
	objectFit: "none",
	userSelect: "none",
	WebkitUserSelect: "none",
	MozUserSelect: "none",
	KhtmlUserSelect: "none",
	msUserSelect: "none",
};

const stylePlaceHolder: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	width: "50vw",
	height: "30vh",
};

interface Props {}

export const LandingPage = (props: Props) => {
	const bg = require("../images/background2.jpg");
	const isMobile = window.innerWidth < 480;

	const [formName, setFormName] = useState<{ formName: null | string }>({
		formName: null,
	});
	const [toggleModal, setToggleModal] = useState(false);

	function handleButtonClick(e: React.MouseEvent) {
		setFormName({ formName: e.currentTarget.textContent });
		setToggleModal(true);
	}

	function modalClose() {
		setToggleModal(false);
	}

	return (
		<React.Fragment>
			<div style={styleLanding}>
				<Header accountHandler={handleButtonClick} />
				<div style={styleContent}>
					<img src={bg} style={styleImg}></img>
					{isMobile && (
						<div style={stylePlaceHolder}>
							<SignInDialog />
						</div>
					)}
				</div>
				<Footer />
			</div>
		</React.Fragment>
	);
};
