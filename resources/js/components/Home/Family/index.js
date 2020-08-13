import React, { useState, useEffect } from "react";
import {
    CheckOutlined,
    PlusCircleOutlined,
    CloseOutlined
} from "@ant-design/icons";
import Add from "./Add";
import List from "./List";
import { useFormik } from "formik";

const Index = props => {
    const [addOpen, setAddOpen] = useState(false);
    const [list, setList] = useState([]);
    const Icon = addOpen ? CloseOutlined : PlusCircleOutlined;
    const handleAddOpen = () => {
        setAddOpen(!addOpen);
    };
    const getList = () => {
        axios
            .get(
                "/api/users/" +
                    JSON.parse(sessionStorage.getItem("user"))?.id +
                    "/family"
            )
            .then(res => {
                setList(res?.data);
            });
    };
    const formik = useFormik({
        initialValues: {},
        onSubmit: async (values, { setErrors, resetForm }) => {
            try {
                let res = await window.axios.post(
                    "/api/users/" +
                        JSON.parse(sessionStorage.getItem("user"))?.id +
                        "/family",
                    values
                );
                setAddOpen(false);
                resetForm();
                getList();
            } catch (e) {
                if (e?.response?.data?.errors)
                    setErrors(e?.response?.data?.errors);
            }
        }
    });
    useEffect(() => {
        getList();
    }, []);
    return (
        <div className="col-md-12 menu-row" style={{ marginTop: 10 }}>
            <Icon
                style={{ cursor: "pointer", fontSize: 22 }}
                onClick={handleAddOpen}
            />
            {addOpen && (
                <CheckOutlined
                    style={{ cursor: "pointer", fontSize: 22, marginLeft: 10 }}
                    onClick={formik?.handleSubmit}
                />
            )}
            {addOpen && <Add fmk={formik} />}
            {list?.length > 0 && <List list={list} handleRefresh={getList} />}
        </div>
    );
};

export default Index;
