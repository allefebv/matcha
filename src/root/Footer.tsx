import React from "react";

const styleContainer: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: 80,
    backgroundColor: "#0D0D0D",
    color: "#F2EDE9",
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "Arial",
};

export const Footer = () => {
    return <div style={styleContainer}>Allefebv | Jfleury | Copyright ©2020</div>;
};
