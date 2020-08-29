import React from "react";
import { Router } from "../component/Router";
import { Login } from "../component/Login";
import { SignUp } from "../component/SignUp";

const styleContainerBlackStrip: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100vw",
    height: 80,
    backgroundColor: "#0D0D0D",
};

interface Props {
    router: string;
    setRouter: React.Dispatch<React.SetStateAction<string>>;
    user: null;
    setUser: React.Dispatch<React.SetStateAction<null>>;
}

export const Header = (props: Props) => {
    return (
        <div>
            <div style={styleContainerBlackStrip}>
                <Router router={props.router} setRouter={props.setRouter} />
                {props.user ? null : <Login user={props.user} setUser={props.setUser} />}
            </div>
            {props.user ? null : <SignUp />}
        </div>
    );
};
