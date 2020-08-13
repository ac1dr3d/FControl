import React from "react";
import ListItem from "./ListItem";

const Index = props => {
    const { list, handleRefresh } = props;
    return (
        <div className={"user-row"}>
            {list.map(it => (
                <ListItem
                    item={it}
                    handleRefresh={handleRefresh}
                    key={it?.id}
                />
            ))}
        </div>
    );
};

export default Index;
