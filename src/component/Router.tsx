import React from "react";

// Props / Const

interface Props {
    router: string;
    setRouter: React.Dispatch<React.SetStateAction<string>>;
}

const page = ["Home", "Page 1", "Page 2"];

// CSS

const styleRouter: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
};

const styleButton: React.CSSProperties = {
    width: 150,
    height: 50,
    margin: 10,
    border: "solid",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#0D0D0D",
    outline:"none",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Arial",
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
    return (
        <div style={styleRouter}>
            {page.map((item) => {
                return (
                    <button
                        style={handleCssButton(props.router, item)}
                        onClick={() => props.setRouter(item)}
                    >
                        {item}
                    </button>
                );
            })}
        </div>
    );
};
