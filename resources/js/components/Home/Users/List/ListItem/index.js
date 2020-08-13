import React, { useState, useEffect } from "react";
import { Switch } from "antd";
import moment from "moment";
import {
    CheckOutlined,
    EditOutlined,
    CloseOutlined,
    MinusOutlined
} from "@ant-design/icons";

const Index = props => {
    const { it, idx, formik } = props;
    const [editOpen, setEditOpen] = useState(false);
    const handleToggle = async () => {
        // const res = await
    };
    const handleEdit = () => {
        setEditOpen(true);
    };
    const handleCloseEdit = () => {
        setEditOpen(false);
    };
    const handleDelete = async () => {
        try {
            await axios.delete(
                "/api/users/members/"
                // JSON.parse(sessionStorage.getItem("user"))?.id +
                // "/familyMembers/" +
                // it.id
            );
            handleRefresh();
        } catch (e) {}
    };
    return (
        <>
            <ul key={it.id} className={idx % 2 === 0 ? "even" : ""}>
                <li>{it.username}</li>
                <li>
                    {moment(new Date(it.created_at)).format(
                        "YYYY/MM/DD HH:mm:ss"
                    )}
                </li>
                <li className={"last-li"}>
                    <Switch
                        checked={it.is_admin}
                        onChange={handleToggle}
                        size="small"
                        style={{
                            margin: "0 10px 0px 0px"
                        }}
                    />
                    {editOpen && (
                        <>
                            <CheckOutlined
                                onClick={formik?.handleSubmit}
                                style={{ marginRight: 15 }}
                            />
                            <MinusOutlined onClick={handleCloseEdit} />
                        </>
                    )}
                    {!editOpen && (
                        <>
                            <EditOutlined
                                style={{ marginRight: 15 }}
                                onClick={handleEdit}
                            />
                            <CloseOutlined onClick={handleDelete} />
                        </>
                    )}
                </li>
            </ul>
        </>
    );
};

export default Index;
