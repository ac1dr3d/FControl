import React, { useState, useEffect } from "react";

const Index = props => {
    const [list, setList] = useState([]);
    const handleUsersFetch = () => {};
    useEffect(() => {
        handleUsersFetch();
    }, []);
    return (
        <div>
            {list.map(it => {
                return <div>{it.firstname}</div>;
            })}
        </div>
    );
};

export default Index;
