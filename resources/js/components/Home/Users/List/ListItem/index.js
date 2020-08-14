import React, { useState, useEffect } from "react";
import { Switch } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import {
    CheckOutlined,
    EditOutlined,
    CloseOutlined,
    MinusOutlined
} from "@ant-design/icons";
import Input from "@/components/_Common/Input";

const Index = props => {
    const { it, idx, handleRefresh } = props;
    const [editOpen, setEditOpen] = useState(false);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: it?.username,
            password: it?.password
        },
        onSubmit: async (values, { setErrors, resetForm }) => {
            try {
                await axios.patch("/api/users/members/" + it?.id, values);
                handleRefresh();
                resetForm();
                setEditOpen(false);
            } catch (e) {}
        }
    });
    const handleToggle = async () => {
        await axios.patch("/api/users/members/" + it?.id, {
            is_admin: !it.is_admin
        });
        handleRefresh();
    };
    const handleEdit = () => {
        setEditOpen(true);
    };
    const handleCloseEdit = () => {
        setEditOpen(false);
    };
    const handleDelete = async () => {
        try {
            await axios.delete("/api/users/members/" + it?.id);
            handleRefresh();
        } catch (e) {}
    };
    Input.defaultProps = {
        onChange: formik?.handleChange,
        values: formik?.values,
        errors: formik?.errors
    };
    return (
        <>
            <ul key={it.id} className={idx % 2 === 0 ? "even" : ""}>
                <li>
                    {!editOpen && it.username}
                    {editOpen && (
                        <Input
                            name="username"
                            type="text"
                            placeholder="Username"
                        />
                    )}
                </li>
                <li>
                    {!editOpen &&
                        moment(new Date(it.created_at)).format(
                            "YYYY/MM/DD HH:mm:ss"
                        )}
                    {editOpen && (
                        <Input
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </li>
                <li
                    className={"last-li"}
                    style={{
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >
                    {!editOpen && (
                        <Switch
                            checked={it.is_admin}
                            onChange={handleToggle}
                            size="small"
                            style={{
                                margin: "0 10px 0px 0px"
                            }}
                        />
                    )}
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
