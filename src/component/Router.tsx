import React, { useState } from 'react';

// Props / Const

interface Props {
	router: string;
	setRouter: React.Dispatch<React.SetStateAction<string>>;
	size: { width: number; height: number };
}

const page = ['Home', 'Page 1', 'Page 2'];

// CSS

const styleRouter: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
};

const styleLogo: React.CSSProperties = {
	fontFamily: 'Arial',
	marginLeft: 25,
	marginRight: 25,
	fontSize: 80,
	fontWeight: 'bold',
	color: '#BFB5A8',
};

const styleButton: React.CSSProperties = {
	width: 150,
	height: 50,
	margin: 10,
	border: 'solid',
	borderWidth: 2,
	borderRadius: 10,
	backgroundColor: '#0D0D0D',
	outline: 'none',
	fontSize: 18,
	fontWeight: 'bold',
	fontFamily: 'Arial',
	transition: '0.2s ease-in-out',
};

const styleBurger: React.CSSProperties = {
	display: 'flex',
	width: 200,
	flexDirection: 'row',
	alignItems: 'center',
};

const styleImgMenuBurger: React.CSSProperties = {
	width: '35%',
};

const styleMenuBurger: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	position: 'absolute',
	top: 0,
	left: 0,
	width: 250,
	height: '100vh',
	backgroundColor: '#0D0D0D',
	transition: '0.6s ease-in-out',
};

// Function

function handleCssButton(router: string, button: string) {
	const cssButton = { ...styleButton };

	cssButton.borderColor = router === button ? '#BFB5A8' : '#F2EDE9';
	cssButton.color = router === button ? '#BFB5A8' : '#F2EDE9';
	return cssButton;
}

function renderButton(item: string, props: Props) {
	const css = handleCssButton(props.router, item);
	return (
		<button
			key={item}
			style={css}
			onClick={() => props.setRouter(item)}
			onMouseEnter={(event) => {
				event.currentTarget.style.borderColor = '#BFB5A8';
				event.currentTarget.style.color = '#BFB5A8';
			}}
			onMouseLeave={(event) => {
				event.currentTarget.style.borderColor = css.borderColor as string;
				event.currentTarget.style.color = css.color as string;
			}}
		>
			{item}
		</button>
	);
}

// Render

export const Router = (props: Props) => {
	const [menuBurger, setMenuBurger] = useState(false);

	return props.size.width >= 1200 ? (
		<div style={styleRouter}>
			<h1 style={styleLogo}>M</h1>
			{page.map((item) => renderButton(item, props))}
		</div>
	) : (
		<div>
			{!menuBurger ? (
				<div style={styleBurger}>
					<h1 style={styleLogo}>M</h1>
					<img
						alt={'Icon menu burger'}
						style={styleImgMenuBurger}
						src={require('../img/menuBurger.png')}
						onClick={() => setMenuBurger(true)}
						onMouseEnter={() => setMenuBurger(true)}
					></img>
				</div>
			) : (
				<div
					style={styleMenuBurger}
					onMouseLeave={() => {
						setTimeout(() => setMenuBurger(false), 100);
					}}
				>
					<h1 style={styleLogo}>M</h1>
					{page.map((item) => renderButton(item, props))}
				</div>
			)}
		</div>
	);
};
