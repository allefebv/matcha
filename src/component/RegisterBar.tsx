import React, { useState } from 'react';
import { FormSignUp } from './RegisterForm';

// Props / Const

// CSS

const styleSignUp: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100vw',
	height: 30,
	backgroundColor: '#BFB5A8',
};

const styleText: React.CSSProperties = {
	color: '#0D0D0D',
	fontFamily: 'Arial',
	fontWeight: 'bold',
	fontSize: 18,
};

const styleButton: React.CSSProperties = {
	width: 100,
	height: 22,
	margin: 10,
	border: 'none',
	borderRadius: 6,
	backgroundColor: '#0D0D0D',
	outline: 'none',
	color: '#f2ede9',
	fontSize: 18,
	fontWeight: 'bold',
	transition: '0.2s ease-in-out',
};

// Function

// Render

export const RegisterBar = () => {
	const [formRegister, setFormRegister] = useState(false);

	return !formRegister ? (
		<div style={styleSignUp}>
			<div style={styleText}>You are not register?</div>
			<button
				style={styleButton}
				onClick={() => setFormRegister(true)}
				onMouseEnter={(event) => {
					event.currentTarget.style.color = 'lightgrey';
				}}
				onMouseLeave={(event) => {
					event.currentTarget.style.color = '#f2ede9';
				}}
			>
				Click here
			</button>
		</div>
	) : (
		<FormSignUp />
	);
};
