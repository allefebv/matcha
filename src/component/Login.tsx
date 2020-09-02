import React, { useState } from 'react';

// Props / Const

interface Props {
	user: null;
	setUser: React.Dispatch<React.SetStateAction<null>>;
	size: { width: number; height: number };
}

// CSS

const styleInput: React.CSSProperties = {
	width: 200,
	height: 40,
	margin: 5,
	border: 'solid',
	borderWidth: 2,
	borderRadius: 10,
	borderColor: '#F2EDE9',
	backgroundColor: '#F2EDE9',
	outline: 'none',
	fontSize: 18,
	fontWeight: 'bold',
	textIndent: 5,
	fontFamily: 'Arial',
};

const styleButton: React.CSSProperties = {
	width: 100,
	height: 50,
	margin: 5,
	border: 'solid',
	borderWidth: 2,
	borderRadius: 10,
	borderColor: '#F2EDE9',
	backgroundColor: '#f2ede9',
	outline: 'none',
	fontSize: 18,
	fontWeight: 'bold',
	fontFamily: 'Arial',
	transition: '0.2s ease-in-out',
};

const styleFormLogin: React.CSSProperties = {
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100vw',
	height: '100vh',
	backgroundColor: 'rgb(0, 0, 0, 85%)',
};

const styleContainerForm: React.CSSProperties = {
	display: 'flex',
	marginTop: '20vh',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
};

// Function

function handleLogin(
	loginPopUp: boolean,
	setLoginPopUp: React.Dispatch<React.SetStateAction<boolean>>
) {
	setLoginPopUp(true);
}

function renderButton(
	loginPopUp: boolean,
	setLoginPopUp: React.Dispatch<React.SetStateAction<boolean>>,
	props: Props
) {
	return (
		<button
			style={styleButton}
			onMouseEnter={(event) => {
				event.currentTarget.style.backgroundColor = 'lightgrey';
				event.currentTarget.style.borderColor = 'lightgrey';
			}}
			onMouseLeave={(event) => {
				event.currentTarget.style.backgroundColor = '#f2ede9';
				event.currentTarget.style.borderColor = '#f2ede9';
			}}
			onClick={() =>
				props.size.width >= 750 || loginPopUp === true
					? console.log('Login')
					: handleLogin(loginPopUp, setLoginPopUp)
			}
		>
			Login in
		</button>
	);
}

// Render

export const Login = (props: Props) => {
	const [loginPopUp, setLoginPopUp] = useState(false);
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	return props.size.width >= 750 ? (
		<div>
			{loginPopUp ? setLoginPopUp(false) : null}
			<input
				style={styleInput}
				type="text"
				value={login}
				onChange={(e) => setLogin(e.target.value)}
				placeholder={'Login'}
			/>
			<input
				style={styleInput}
				type="text"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder={'Password'}
			/>
			{renderButton(loginPopUp, setLoginPopUp, props)}
		</div>
	) : (
		<div>
			<div>{renderButton(loginPopUp, setLoginPopUp, props)}</div>
			{loginPopUp ? (
				<div style={styleFormLogin}>
					<div style={styleContainerForm}>
						<input
							style={styleInput}
							type="text"
							value={login}
							onChange={(e) => setLogin(e.target.value)}
							placeholder={'Login'}
						/>
						<input
							style={styleInput}
							type="text"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder={'Password'}
						/>
						<div>
							{renderButton(loginPopUp, setLoginPopUp, props)}
							<button
								style={styleButton}
								onMouseEnter={(event) => {
									event.currentTarget.style.backgroundColor =
										'lightgrey';
									event.currentTarget.style.borderColor =
										'lightgrey';
								}}
								onMouseLeave={(event) => {
									event.currentTarget.style.backgroundColor =
										'#f2ede9';
									event.currentTarget.style.borderColor =
										'#f2ede9';
								}}
								onClick={() => setLoginPopUp(false)}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};
