import React from "react";
import ReactDOM from "react-dom";
import { Button } from "antd";

const Home = () => {
    const handleGetUser = async () => {
        let res = await window.axios.get("api/user");
        console.log(res);
    };
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <Button onClick={handleGetUser}>Get User</Button>
                </div>
            </div>
        </div>
    );
};

export default Home;

if (document.getElementById("home")) {
    ReactDOM.render(<Home />, document.getElementById("home"));
}
