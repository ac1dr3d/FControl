import React, { useState, useEffect } from "react";
import {
    CheckOutlined,
    PlusCircleOutlined,
    CloseOutlined
} from "@ant-design/icons";
import Add from "./Add";
import List from "./List";
import { useFormik, Formik, Form } from "formik";
import { Input, Select } from "antd";
import { MenuBar } from "./styles";
const { Search } = Input;

const Index = props => {
    const [addOpen, setAddOpen] = useState(false);
    const [params, setParams] = useState({});
    const [list, setList] = useState([]);
    const Icon = addOpen ? CloseOutlined : PlusCircleOutlined;
    const getList = () => {
        axios
            .get(
                "/api/users/" +
                    JSON.parse(sessionStorage.getItem("user"))?.id +
                    "/familyMembers"
            )
            .then(res => {
                setList(res?.data);
            });
    };
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {},
        onSubmit: async (values, { setErrors, resetForm }) => {
            try {
                let res = await window.axios.post(
                    "/api/users/" +
                        JSON.parse(sessionStorage.getItem("user"))?.id +
                        "/familyMembers",
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
    const searchFormik = useFormik({
        enableReinitialize: true,
        initialValues: {},
        onSubmit: async (values, { setErrors, resetForm }) => {
            try {
                let res = await window.axios.post("/api/search", values);
                if (res?.data) setList(res?.data);
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
    const handleSearchOption = val => {
        searchFormik.setFieldValue("search_option", val);
    };
    useEffect(() => {
        getList();
    }, []);
    const handleRefresh = () => {
        return searchFormik?.values["search_option"]?.length > 0 &&
            searchFormik?.values["search_value"]?.length > 0
            ? searchFormik?.handleSubmit()
            : getList();
    };
    const opts = [
        { value: "firstname", label: "Firstname" },
        { value: "lastname", label: "Lastname" },
        { value: "first_last_name", label: "Firstname & Lastname" },
        { value: "relation", label: "Relation" }
    ];
    const handleSearchReset = () => {
        searchFormik?.resetForm();
        getList();
    };
    return (
        <div className="col-md-12 menu-row" style={{ marginTop: 10 }}>
            <MenuBar>
                <div>
                    <Select
                        dropdownMatchSelectWidth={false}
                        options={opts}
                        size={"small"}
                        style={{ width: 250 }}
                        name={"search_option"}
                        value={searchFormik?.values?.search_option ?? undefined}
                        placeholder="Search term"
                        onChange={handleSearchOption}
                        className={
                            searchFormik.errors["search_option"] && "error"
                        }
                    />
                    <Search
                        className={
                            "srch " +
                            (searchFormik.errors["search_value"] ? "error" : "")
                        }
                        placeholder="Search value"
                        name={"search_value"}
                        enterButton="Search"
                        value={searchFormik?.values?.search_value ?? undefined}
                        onChange={searchFormik.handleChange}
                        size="small"
                        onSearch={searchFormik.handleSubmit}
                    />
                    {(searchFormik?.values["search_option"]?.length > 0 ||
                        searchFormik?.values["search_value"]?.length > 0) && (
                        <CloseOutlined
                            style={{ cursor: "pointer", marginLeft: 10 }}
                            onClick={handleSearchReset}
                        />
                    )}
                </div>
                <div>
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
            </MenuBar>
            {addOpen && <Add fmk={formik} />}
            {list?.length > 0 && (
                <List list={list} handleRefresh={handleRefresh} />
            )}
        </div>
    );
};

export default Index;
