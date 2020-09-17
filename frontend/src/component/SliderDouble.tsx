import React, { useState } from "react";
import "./SliderDouble.css";

interface Props {
	min: number;
	max: number;
	step: number;
}

const styleInputLeft: React.CSSProperties = {
	position: "absolute",
	width: "100%",
	height: "0.5vh",
	zIndex: 2,
	WebkitAppearance: "none",
	pointerEvents: "none",
	// opacity: 0,
};

const styleInputRight: React.CSSProperties = {
	position: "absolute",
	width: "100%",
	height: "0.5vh",
	zIndex: 2,
	WebkitAppearance: "none",
	pointerEvents: "none",
	// opacity: 0,
};

const styleSlider: React.CSSProperties = {
	position: "relative",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: "4vh",
	width: "80%",
};
const styleTrack: React.CSSProperties = {
	position: "absolute",
	backgroundColor: "#ff77a9",
	zIndex: 1,
	width: "100%",
	height: "0.5vh",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	borderRadius: "10%",
};

export const SliderDouble = (props: Props) => {
	const [valueLeft, setValueLeft] = useState(props.min);
	const [valueRight, setValueRight] = useState(props.max);

	function computeLeft() {
		console.log("left : ", valueLeft)
		return ((valueLeft - props.min) / (props.max - props.min)) * 100;
	}

	function computeRight() {
		console.log("right : ", valueRight)
		return 100 - ((valueRight - props.min) / (props.max - props.min)) * 100;
	}

	function handleChangeLeft(event: React.ChangeEvent<HTMLInputElement>) {
		valueLeft + 9 < valueRight && setValueLeft(parseInt(event.currentTarget.value));
	}

	function handleChangeRight(event: React.ChangeEvent<HTMLInputElement>) {
		valueRight - 10 > valueLeft && setValueRight(parseInt(event.currentTarget.value));
	}

	function handleMouseEnter(event: React.MouseEvent) {
		event.currentTarget.classList.add("hover");
	}

	function handleMouseLeave(event: React.MouseEvent) {
		event.currentTarget.classList.remove("hover");
	}

	const styleThumbLeft: React.CSSProperties = {
		position: "absolute",
		top: "50%",
		zIndex: 2,
		width: "max(1vw, 1vh)",
		height: "max(1vw, 1vh)",
		backgroundColor: "#b4004e",
		borderRadius: "50%",
		transform: "translate(-20%, -50%)",
		left: `${computeLeft()}%`,
	};

	const styleThumbRight: React.CSSProperties = {
		position: "absolute",
		top: "50%",
		zIndex: 2,
		width: "max(1vw, 1vh)",
		height: "max(1vw, 1vh)",
		backgroundColor: "#b4004e",
		borderRadius: "50%",
		transform: "translate(30%, -50%)",
		right: `${computeRight()}%`,
	};

	const styleRange: React.CSSProperties = {
		position: "absolute",
		backgroundColor: "#b4004e",
		height: "0.6vh",
		zIndex: 2,
		top: "50%",
		left: `${computeLeft()}%`,
		right: `${computeRight()}%`,
		borderRadius: "10%",
		pointerEvents: "none",
		transform: "translate(0, -50%)",
	};

	return (
		<div style={styleSlider}>
			<div style={styleTrack}></div>
			<div style={styleRange}></div>
			<div
				style={styleThumbLeft}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			></div>
			<div
				style={styleThumbRight}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			></div>

			<input
				style={styleInputLeft}
				type="range"
				min={props.min}
				max={props.max}
				step={props.step}
				value={valueLeft}
				onChange={handleChangeLeft}
			/>
			<input
				style={styleInputRight}
				type="range"
				min={props.min}
				max={props.max}
				step={props.step}
				value={valueRight}
				onChange={handleChangeRight}
			/>
		</div>
	);
};
