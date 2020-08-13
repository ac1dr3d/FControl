import React, { useState, useEffect } from "react";
import List from "./List";

const Index = props => {
    const [list, setList] = useState([]);
    const handleUsersFetch = async () => {
        let res = await axios.get("/api/users/members");
        setList(res?.data || []);
    };
    useEffect(() => {
        handleUsersFetch();
    }, []);
    return (
        <div className="col-md-8 menu-row" style={{ marginTop: 10 }}>
            <List list={list} />
        </div>
    );
};

export default Index;
