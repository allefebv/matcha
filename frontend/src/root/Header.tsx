import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { actionUser_userLogin } from '../store/user/action';
import { Button } from "../component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter, Switch, Route, Link, Router } from "react-router-dom";

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

const withReduxProps = connect((state: any) => ({
	//TODO: REDUX
	login: state.user.userLogin,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

class HeaderComponent extends React.Component<Props> {
	handleButtonTestRedux = () => {
		//TODO: Function test
		{
			this.props.dispatch(
				actionUser_userLogin({
					id: 1,
					email: 'test@test.fr',
					password: '1234',
					registrationDate: Date.now(),
					activated: false,
					activationKey: 'test',
				})
			);
		}
	};

	render() {
		const isDesktop = window.innerWidth > 480;
		return (
			<div style={styleHeader}>
				<div style={styleNavStart}>
					<Link to={"/"}>
						<Button theme="logo"></Button>
					</Link>
					<Link to={"/landing"}>
						<Button theme="logo"></Button>
					</Link>
					<text style={{ color: 'red' }}></text>
					<button onClick={this.handleButtonTestRedux}>button test Redux</button> {/* TODO: Button test */}
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

export const Header = withReduxProps(HeaderComponent);
