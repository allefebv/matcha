import React from "react";
import { Home } from "../screen/Home";
import { Page1 } from "../screen/Page1";
import { Page2 } from "../screen/Page2";

interface Props {
    router: string;
}

export const Body = (props: Props) => {
    return (
        <div>
            {props.router === "Home" ? <Home /> : null}
            {props.router === "Page 1" ? <Page1 /> : null}
            {props.router === "Page 2" ? <Page2 /> : null}
        </div>
    );
};
