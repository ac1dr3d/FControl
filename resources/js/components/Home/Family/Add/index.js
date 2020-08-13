import React from "react";
import { Formik, Form } from "formik";
import { Select } from "antd";
import Input from "@/components/_Common/Input";
const { Option } = Select;

const Index = props => {
    const {
        fmk: {
            initialValues,
            onSubmit,
            values,
            errors,
            handleChange,
            handleSubmit,
            setFieldValue
        }
    } = props;
    const relations = ["დედა", "მამა", "შვილი"];
    const handleSelect = val => {
        setFieldValue("relation", val);
    };
    Input.defaultProps = {
        onChange: handleChange,
        values,
        errors
    };
    return (
        <div className={"user-row"}>
            <ul>
                <li>
                    <Input
                        name="firstname"
                        type="text"
                        placeholder="First Name"
                    />
                </li>
                <li>
                    <Input
                        name="lastname"
                        type="text"
                        placeholder="Last Name"
                    />
                </li>
                <li>
                    <Input name="age" type="number" placeholder="Age" />
                </li>
                <li>
                    <Select
                        className={errors["relation"] && "error"}
                        style={{ width: "100%" }}
                        name={"relation"}
                        placeholder={"Relation"}
                        value={values?.relation ?? undefined}
                        onChange={handleSelect}
                        options={relations.map(it => ({
                            label: it,
                            value: it
                        }))}
                    />
                </li>
                <li>
                    <Input
                        name="profession"
                        type="text"
                        placeholder="Profession"
                    />
                </li>
            </ul>
        </div>
    );
};

export default Index;
