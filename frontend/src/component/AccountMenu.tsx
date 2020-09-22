import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { actionUser_login } from "../store/user/action";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { Menu, MenuItem } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.login.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const AccountMenuComponent = (props: Props) => {
	const [anchorEl, setAnchorEl] = useState<Element | null>(null);

	function handleClick(event: React.MouseEvent) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	function handleLogout() {
		handleClose();
		props.dispatch(actionUser_login(false));
	}

	return (
		<div>
			<Button
				theme="circle"
				aria-controls="simple-menu"
				aria-haspopup="true"
				onClick={handleClick}
			>
				<FontAwesomeIcon icon={faChevronDown} />
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<Link
					to={"/account-settings"}
					style={{ color: "inherit", textDecoration: "inherit" }}
				>
					<MenuItem onClick={handleClose}>Account Settings</MenuItem>
				</Link>

				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>
		</div>
	);
};

export const AccountMenu = withReduxProps(AccountMenuComponent);
