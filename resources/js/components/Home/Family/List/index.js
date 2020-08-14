import React from "react";
import ListItem from "./ListItem";

const Index = props => {
    const { list, handleRefresh } = props;
    return (
        <>
            <div className={"user-row"}>
                <ul style={{ color: "coral" }}>
                    <li>Firstname</li>
                    <li>Lastname</li>
                    <li>Age</li>
                    <li>Relation</li>
                    <li>Profession</li>
                    {JSON.parse(sessionStorage.getItem("user"))?.is_admin && (
                        <>
                            <li>Editor</li>
                            <li>Owner</li>
                        </>
                    )}
                    <li className="last-li"></li>
                </ul>
            </div>
            <div className={"user-row"}>
                {list.map((it, idx) => (
                    <ListItem
                        item={it}
                        handleRefresh={handleRefresh}
                        key={it?.id}
                        index={idx}
                    />
                ))}
            </div>
        </>
    );
};

export default Index;
