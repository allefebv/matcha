import React from "react";

const styleInput: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50px",
    border: "none",
    outline: "none",
    fontSize: "1.2rem",
}

interface Props {
    placeholder: string;
    type?: "password";
}

export const FormInput = (props:Props) => {
    return (
        <input style={styleInput} placeholder={props.placeholder} type={props.type}></input>
    );
}