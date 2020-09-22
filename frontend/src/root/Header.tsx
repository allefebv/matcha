import React from 'react';
import { Button } from "../component/Button";
import { AccountMenu } from "../component/AccountMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const styleHeader: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
	width: '100vw',
	height: '8vh',
	backgroundColor: 'transparent',
	zIndex: 2,
};

const styleNavStart: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'flex-end',
	margin: '2vh',
};

const styleNavEnd: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'flex-end',
};

type Props = {
	accountHandler?: (type: React.MouseEvent) => void;
}

export class Header extends React.Component<Props> {
	render() {
		const isDesktop = window.innerWidth > 480;
		return (
			<div style={styleHeader}>
				<div style={styleNavStart}>
					<Link to={"/"}>
						<Button theme="logo"></Button>
					</Link>
					<Link to={"/search"}>
						<Button theme="logo"></Button>
					</Link>
				</div>
				{isDesktop && (
					<div style={styleNavEnd}>
						{true && (
							<React.Fragment>
								<Button theme="primary" onClick={this.props.accountHandler}>Sign in</Button>
								<Button theme="primary" onClick={this.props.accountHandler}>Sign up</Button>
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
								<AccountMenu></AccountMenu>
							</React.Fragment>
						)}
					</div>
				)}
			</div>
		);
	}
}