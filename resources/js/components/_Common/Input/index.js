import React from "react";
import { Input } from "antd";

const Index = props => {
    const { placeholder, onChange, type, name, values } = props;
    return (
        <Input
            onChange={onChange}
            name={name}
            value={values[name] ?? ""}
            type={type}
            placeholder={placeholder}
        />
    );
};
export default Index;
