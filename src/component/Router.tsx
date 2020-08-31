import React, { useState } from "react";

// Props / Const

interface Props {
    router: string;
    setRouter: React.Dispatch<React.SetStateAction<string>>;
    size: { width: number; height: number };
}

const page = ["Home", "Page 1", "Page 2"];

// CSS

const styleRouter: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
};

const styleLogo: React.CSSProperties = {
    fontFamily: "Arial",
    marginLeft: 25,
    marginRight: 25,
    fontSize: 80,
    fontWeight: "bold",
    color: "#BFB5A8",
};

const styleButton: React.CSSProperties = {
    width: 150,
    height: 50,
    margin: 10,
    border: "solid",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#0D0D0D",
    outline: "none",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Arial",
};

const styleBurger: React.CSSProperties = {
    display: "flex",
    width: 200,
    flexDirection: "row",
    alignItems: "center",
};

const styleImgMenuBurger: React.CSSProperties = {
    width: "35%",
};

const styleMenuBurger: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: 250,
    height: "100vh",
    backgroundColor: "#0D0D0D",
};

// Function

function handleCssButton(router: string, button: string) {
    const cssButton = { ...styleButton };

    cssButton.borderColor = router === button ? "#BFB5A8" : "#F2EDE9";
    cssButton.color = router === button ? "#BFB5A8" : "#F2EDE9";
    return cssButton;
}

// Render

export const Router = (props: Props) => {
    const [menuBurger, setMenuBurger] = useState(false);

    return props.size.width >= 1200 ? (
        <div style={styleRouter}>
            <h1 style={styleLogo}>M</h1>
            {page.map((item) => {
                return (
                    <button
                        key={item}
                        style={handleCssButton(props.router, item)}
                        onClick={() => props.setRouter(item)}
                    >
                        {item}
                    </button>
                );
            })}
        </div>
    ) : (
        <div>
            {!menuBurger ? (
                <div style={styleBurger}>
                    <h1 style={styleLogo}>M</h1>
                    <img
                        style={styleImgMenuBurger}
                        src={require("../img/menuBurger.png")}
                        onClick={() => setMenuBurger(true)}
                    ></img>
                </div>
            ) : (
                <div
                    style={styleMenuBurger}
                    onMouseLeave={() => setMenuBurger(false)}
                >
                    <h1 style={styleLogo}>M</h1>
                    {page.map((item) => {
                        return (
                            <button
                                key={item}
                                style={handleCssButton(props.router, item)}
                                onClick={() => {
                                    props.setRouter(item);
                                    setMenuBurger(false);
                                }}
                            >
                                {item}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
