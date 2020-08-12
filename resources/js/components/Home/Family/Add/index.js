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
            handleChange,
            handleSubmit,
            setFieldValue
        }
    } = props;
    const relations = ["დედა", "მამა", "შვილი"];
    const handleSelect = val => {
        setFieldValue("relation", val);
    };
    return (
        <div className={"user-row"}>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {() => {
                    Input.defaultProps = {
                        onChange: handleChange,
                        values
                    };
                    Select.defaultProps = {
                        onChange: handleSelect,
                        value: values?.relation ?? undefined
                    };
                    return (
                        <Form onSubmit={handleSubmit}>
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
                                    <Input
                                        name="age"
                                        type="number"
                                        placeholder="Age"
                                    />
                                </li>
                                <li>
                                    <Select
                                        style={{ width: "100%" }}
                                        name={"relation"}
                                        placeholder={"Relation"}
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
                            <pre>{JSON.stringify(values, null, 2)}</pre>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default Index;
