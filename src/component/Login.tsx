import React from "react";

// Props / Const

interface Props {
    user: null;
    setUser: React.Dispatch<React.SetStateAction<null>>;
}

// CSS

const styleInput: React.CSSProperties = {
    width: 200,
    height: 40,
    margin: 5,
    border: "solid",
    borderWidth: 2,
    borderRadius: 10,
    borderColor:"#F2EDE9",
    backgroundColor: "#F2EDE9",
    outline:"none",
    fontSize: 18,
    fontWeight: "bold",
    textIndent: 5,
    fontFamily: "Arial",
};

const styleButton: React.CSSProperties = {
    width: 100,
    height: 50,
    margin: 5,
    border: "solid",
    borderWidth: 2,
    borderRadius: 10,
    borderColor:"#F2EDE9",
    outline:"none",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Arial",
};

// Function

// Render

export const Login = (props: Props) => {
    return (
        <div>
            <input style={styleInput} type="text" placeholder={"Login"} />
            <input style={styleInput} type="text" placeholder={"Password"} />
            <button style={styleButton}>Sign in</button>
        </div>
    );
};
