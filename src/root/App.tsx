import React, { useState } from "react";
import { Header } from "./Header";
import { Body } from "./Body";
import { Footer } from "./Footer";

function App() {
    const [router, setRouter] = useState("Home");
    const [user, setUser] = useState(null);

    return (
        <div>
            <Header
                router={router}
                setRouter={setRouter}
                user={user}
                setUser={setUser}
            />
            <Body router={router}/>
            <Footer />
        </div>
    );
}

export default App;
