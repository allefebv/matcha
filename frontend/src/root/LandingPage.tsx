import React, { useState } from "react";
import { Button } from "../component/Button";
import { ModalToggler } from "../component/ModalToggler";
import { Form } from "../component/Form";
import { SigninForm } from "../component/SigninForm";
import { SignupForm } from "../component/SignupForm";
import { ForgotPasswordForm } from "../component/ForgotPasswordForm";
import { Header } from "./Header";
import { Footer } from "./Footer";

const styleLanding: React.CSSProperties = {
	display: "flex",
	flexDirection: "row",
	alignItems: "flex-end",
	justifyContent: "center",
	width: "100vw",
	height: "90vh",
};

const styleImg: React.CSSProperties = {
	position: "absolute",
	top: 0,
	left: 0,
	width: "100vw",
	height: "100vh",
	zIndex: -1,
	objectFit: "none",
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

	const [formName, setFormName] = useState("");
	const [toggleModal, setToggleModal] = useState(false);

	function handleButtonClick(e: React.MouseEvent) {
		setFormName("Sign In");
		setToggleModal(true);
		console.log(toggleModal);
	}

	function modalClose() {
		setToggleModal(false);
	}

	return (
		<React.Fragment>
			<Header accountHandler={handleButtonClick}/>
			<div style={styleLanding}>
				<img src={bg} style={styleImg}></img>
				{isMobile && (
					<div style={stylePlaceHolder}>
						<Button theme="big" onClick={handleButtonClick}>
							Sign in
						</Button>
						<Button theme="big" onClick={handleButtonClick}>
							Sign up
						</Button>
					</div>
				)}
				<ModalToggler isModalActive={toggleModal} modalClose={modalClose}>
					<Form title="Sign In" submitValue="Sign In">
						<SigninForm />
					</Form>
				</ModalToggler>
			</div>
			<Footer />
		</React.Fragment>
	);
};
