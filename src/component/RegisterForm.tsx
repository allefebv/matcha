import React, { useState } from "react";

const styleFormSignUp: React.CSSProperties = {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgb(0, 0, 0, 85%)",
};

const styleContainerForm: React.CSSProperties = {
    width: "60vw",
    height: "80vh",
    borderRadius: 10,
    backgroundColor: "#f2ede9",
};

export const FormSignUp = () => {
    return (
        <div style={styleFormSignUp}>
            <div style={styleContainerForm}></div>
        </div>
    );
};
