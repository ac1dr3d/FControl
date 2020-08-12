import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Button } from "antd";
import Family from "./Family";
import Users from "./Users";

const Home = () => {
    const handleGetUser = async () => {
        let res = await window.axios.get("api/user");
    };
    const [position, setPosition] = useState("family");
    const handlePosition = pos => {
        if (pos !== position) setPosition(pos);
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 menu-row">
                    <Button
                        onClick={() => handlePosition("family")}
                        type={position === "family" && "primary"}
                    >
                        Family
                    </Button>
                    <Button
                        id="user"
                        onClick={() => handlePosition("users")}
                        type={position === "users" && "primary"}
                    >
                        Users
                    </Button>
                </div>
            </div>
            <div className="row">{position === "family" && <Family />}</div>
            <div className="row">{position === "users" && <Users />}</div>
        </div>
    );
};

export default Home;

if (document.getElementById("home")) {
    ReactDOM.render(<Home />, document.getElementById("home"));
}
