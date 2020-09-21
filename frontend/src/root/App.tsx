import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { LandingPage } from './LandingPage';
import { MainPage } from './MainPage';
import { FormInput } from '../component/FormInput';
import { SliderDouble } from '../component/SliderDouble';
import { createStore } from 'redux';
import { rootReducer } from '../store/rootReducer';

const styleApp: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	height: '100vh',
	width: '100vw',
	background: 'radial-gradient(circle, transparent, rgba(0,0,0,0.6)50%, rgba(0,0,0,1) 100%)',
	zIndex: 0,
};

export class App extends React.Component {
	render() {
		return (
			<div style={styleApp}>
				<Header />
				{/* <LandingPage /> */}
				<MainPage />
				<Footer />
			</div>
		);
	}
}
