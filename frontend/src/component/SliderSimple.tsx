import React from "react";

interface Props {
	min: number;
	max: number;
	step: number;
}

export const SliderSimple = (props: Props) => {
	return (
		<input type="range" min={props.min} max={props.max} step={props.step} value={props.max/2} />
	);
};
