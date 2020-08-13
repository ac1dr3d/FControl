import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button } from "antd";
import Family from "./Family";
import Users from "./Users";

const Home = () => {
    const handleGetUser = async () => {
        let res = await window.axios.get("api/user");
    };
    const [position, setPosition] = useState("users");
    const [user, setUser] = useState({});
    const handlePosition = pos => {
        if (pos !== position) setPosition(pos);
    };
    useEffect(() => {
        axios.get("/api/user").then(res => {
            if (res?.data) {
                setUser(res?.data);
                sessionStorage.setItem("user", JSON.stringify(res?.data));
            }
        });
    }, []);
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
                    {user?.is_admin && (
                        <Button
                            onClick={() => handlePosition("users")}
                            type={position === "users" && "primary"}
                        >
                            Users
                        </Button>
                    )}
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
