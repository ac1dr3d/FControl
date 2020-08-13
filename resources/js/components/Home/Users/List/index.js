import React, { useState, useEffect } from "react";
import moment from "moment";
import { Switch } from "antd";

const Index = props => {
    const { list } = props;
    const handleToggle = () => {};
    return (
        <>
            <div className="user-row">
                {list.map(it => (
                    <ul key={it.id}>
                        <li>{it.username}</li>
                        <li>
                            {moment(new Date(it.created_at)).format(
                                "YYYY/MM/DD HH:mm:ss"
                            )}
                        </li>
                        <li className={"last-li"}>
                            <Switch
                                defaultChecked={it.is_admin}
                                onChange={handleToggle}
                                size="small"
                            />
                        </li>
                    </ul>
                ))}
            </div>
        </>
    );
};

export default Index;
