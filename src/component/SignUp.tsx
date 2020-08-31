import React, { useState } from "react";
import { FormSignUp } from "./formSignUp";

// Props / Const

// CSS

const styleSignUp: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: 30,
    backgroundColor: "#BFB5A8",
};

const styleText: React.CSSProperties = {
    color: "#0D0D0D",
    fontFamily: "Arial",
    fontWeight: "bold",
    fontSize: 18,
};

const styleButton: React.CSSProperties = {
    width: 100,
    height: 22,
    margin: 10,
    border: "none",
    borderRadius: 10,
    backgroundColor: "#0D0D0D",
    outline: "none",
    color: "#f2ede9",
    fontSize: 18,
    fontWeight: "bold",
};

// Function

// Render

export const SignUp = () => {
    const [formSignUp, setFormSignUp] = useState(false);

    return !formSignUp ? (
        <div style={styleSignUp}>
            <div style={styleText}>You are not sign up?</div>
            <button style={styleButton} onClick={() => setFormSignUp(true)}>
                Click here
            </button>
        </div>
    ) : <FormSignUp/>;
};
