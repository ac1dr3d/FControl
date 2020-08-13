import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";

const Index = props => {
    const { list } = props;
    return (
        <>
            <div className="user-row">
                <ul style={{ color: "coral" }}>
                    <li>Username</li>
                    <li>Time created</li>
                    <li className="last-li">Admin toggle</li>
                </ul>
            </div>
            <div className="user-row">
                {list.map((it, idx) => (
                    <ListItem it={it} idx={idx} key={it?.id} />
                ))}
            </div>
        </>
    );
};

export default Index;
