import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
    CheckOutlined,
    PlusCircleOutlined,
    CloseOutlined
} from "@ant-design/icons";
import List from "./List";
import Add from "./Add";

const Index = props => {
    const [list, setList] = useState([]);
    const [addOpen, setAddOpen] = useState(false);
    const Icon = addOpen ? CloseOutlined : PlusCircleOutlined;
    const handleUsersFetch = async () => {
        let res = await axios.get("/api/users/members");
        setList(res?.data || []);
    };
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {},
        onSubmit: async (values, { setErrors, resetForm }) => {
            try {
                setAddOpen(false);
                resetForm();
                // getList();
            } catch (e) {
                if (e?.response?.data?.errors)
                    setErrors(e?.response?.data?.errors);
            }
        }
    });
    const handleAddOpen = () => {
        setAddOpen(!addOpen);
        formik?.resetForm();
    };
    useEffect(() => {
        handleUsersFetch();
    }, []);
    return (
        <>
            <div
                className="col-md-8"
                style={{
                    height: 40,
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center"
                }}
            >
                {addOpen && <Add fmk={formik} />}
                <Icon
                    style={{ cursor: "pointer", fontSize: 22 }}
                    onClick={handleAddOpen}
                />
                {addOpen && (
                    <CheckOutlined
                        style={{
                            cursor: "pointer",
                            fontSize: 22,
                            marginLeft: 10
                        }}
                        onClick={formik?.handleSubmit}
                    />
                )}
            </div>
            <div className="col-md-8">
                <List list={list} />
            </div>
        </>
    );
};

export default Index;
