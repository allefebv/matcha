import React from "react";
import { Button } from "../component/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'


const styleHeader: React.CSSProperties = {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",
	width: "100vw",
	height: "8vh",
	backgroundColor: "transparent",
	zIndex: 2
};

const styleNavStart: React.CSSProperties = {
	display: "flex",
	justifyContent: "flex-end",
	margin: "2vh",
};

const styleNavEnd: React.CSSProperties = {
	display: "flex",
	justifyContent: "flex-end",
};

interface Props {}

export class Header extends React.Component<Props> {
	render() {
		const isDesktop = window.innerWidth > 480;
		return (
			<div style={styleHeader}>
				<div style={styleNavStart}>
					<Button theme="logo"></Button>
				</div>
				{isDesktop && (
					<div style={styleNavEnd}>
						{false && (
							<React.Fragment>
								<Button theme="primary">Sign in</Button>
								<Button theme="primary">Sign up</Button>
							</React.Fragment>
						)}
						{true && (
							<React.Fragment>
								<Button theme="circle">
									<FontAwesomeIcon icon={faBell} />
								</Button>
								<Button theme="circle">
									<FontAwesomeIcon icon={faUser} />
								</Button>
								<Button theme="circle">
									<FontAwesomeIcon icon={faChevronDown} />
								</Button>
							</React.Fragment>
						)}
					</div>
				)}
			</div>
		);
	}
}
