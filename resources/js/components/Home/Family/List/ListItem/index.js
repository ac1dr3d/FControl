import React, { useState } from "react";
import { Formik, Form, useFormik } from "formik";
import {
    CheckOutlined,
    EditOutlined,
    CloseOutlined,
    MinusOutlined
} from "@ant-design/icons";
import { Select } from "antd";
import Input from "@/components/_Common/Input";
const { Option } = Select;

const EditInput = props => {
    const { open, it, name, type, formik } = props;
    Input.defaultProps = {
        onChange: formik?.handleChange,
        values: formik?.values,
        errors: formik?.errors
    };
    return (
        <>
            {!open && it[name]}
            {open && <Input name={name} type={type} />}
        </>
    );
};
const relations = ["დედა", "მამა", "შვილი"];
const SelectInput = props => {
    const { open, formik, val } = props;
    const handleSelect = val => {
        formik?.setFieldValue("relation", val);
    };
    return (
        <>
            {!open && val}
            {open && (
                <Select
                    className={formik?.errors["relation"] && "error"}
                    onChange={handleSelect}
                    value={formik?.values?.relation ?? undefined}
                    style={{ width: "100%" }}
                    name={"relation"}
                    placeholder={"Relation"}
                    options={relations.map(it => ({
                        label: it,
                        value: it
                    }))}
                />
            )}
        </>
    );
};

const Index = props => {
    const { list, handleRefresh, item: it } = props;
    const [editOpen, setEditOpen] = useState(false);
    const handleCloseEdit = () => {
        setEditOpen(false);
    };
    const handleEdit = () => {
        setEditOpen(true);
    };
    const handleDelete = async () => {
        try {
            await axios.delete(
                "/api/users/" +
                    JSON.parse(sessionStorage.getItem("user"))?.id +
                    "/familyMembers/" +
                    it.id
            );
            handleRefresh();
        } catch (e) {}
    };
    const handleSubmit = () => {
        setEditOpen(false);
    };
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: it?.firstname,
            lastname: it?.lastname,
            age: it?.age,
            relation: it?.relation,
            profession: it?.profession
        },
        onSubmit: async (values, { setErrors, resetForm }) => {
            try {
                await axios.patch(
                    "/api/users/" +
                        JSON.parse(sessionStorage.getItem("user"))?.id +
                        "/familyMembers/" +
                        it.id,
                    values
                );
                resetForm();
                setEditOpen(false);
                handleRefresh();
            } catch (e) {
                if (e?.response?.data?.errors)
                    setErrors(e?.response?.data?.errors);
            }
        }
    });
    EditInput.defaultProps = {
        formik: formik,
        open: editOpen,
        it
    };
    SelectInput.defaultProps = {
        formik: formik,
        open: editOpen
    };
    return (
        <ul key={it?.id} className={props?.index % 2 === 0 && "even"}>
            <li>
                <EditInput name={"firstname"} type={"text"} />
            </li>
            <li>
                <EditInput name={"lastname"} type={"text"} />
            </li>
            <li>
                <EditInput name={"age"} type={"number"} />
            </li>
            <li>
                <SelectInput val={it?.relation} />
            </li>
            <li>
                <EditInput name={"profession"} type={"text"} />
            </li>
            <li className="last-li">
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
    );
};

export default Index;
