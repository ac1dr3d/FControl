import React from "react";
import Input from "@/components/_Common/Input";

const Index = props => {
    const { formik } = props;
    Input.defaultProps = {
        onChange: formik?.handleChange,
        values: formik?.values,
        errors: formik?.errors
    };
    return (
        <div className={"user-row"} style={{ marginTop: 0 }}>
            <ul style={{ margin: "0px 20px" }}>
                <li>
                    <Input name="username" type="text" placeholder="Username" />
                </li>
                <li>
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                </li>
            </ul>
        </div>
    );
};

export default Index;
