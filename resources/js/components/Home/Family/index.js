import React, { useState } from "react";
import {
    CheckOutlined,
    PlusCircleOutlined,
    CloseOutlined
} from "@ant-design/icons";
import Add from "./Add";
import { useFormik } from "formik";

const Index = props => {
    const [addOpen, setAddOpen] = useState(false);
    const Icon = addOpen ? CloseOutlined : PlusCircleOutlined;
    const handleAddOpen = () => {
        setAddOpen(!addOpen);
    };
    const formik = useFormik({
        initialValues: {},
        onSubmit: async (values, { setErrors, resetForm }) => {
            try {
                let res = await window.axios.post("/api/family/add", values);
                if (res?.data === "OK") {
                    setAddOpen(false);
                    resetForm();
                }
            } catch (e) {
                if (e?.response?.data?.errors)
                    setErrors(e?.response?.data?.errors);
            }
        }
    });
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
        </div>
    );
};

export default Index;
