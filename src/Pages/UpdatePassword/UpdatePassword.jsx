import { Button, Form, Input, Spin } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useResetPasswordMutation } from "../../redux/api/AuthApi";

const UpdatePassword = () => {
  const [setNewPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();
  const [newPassError, setNewPassError] = useState("");
  const [conPassError, setConPassError] = useState("");

  const onFinish = (values) => {
    if (values?.password !== values?.confirmPassword) {
      return toast.error(
        "Your new password and confirm password does not match!"
      );
    }
    const data = {
      email: localStorage.getItem("email"),
      password: values?.password,
      confirmPassword: values?.confirmPassword,
    };
    setNewPassword(data)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message);
        navigate("/")
      })
      .catch((error) => toast.error(error?.data?.message));

  };

  return (
    <div
      style={{
        width: "100%",
        background: "#FFE2D4",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        style={{
          width: "630px",
          background: "white",
          borderRadius: "12px",
          padding: "90px 57px",
        }}
        onFinish={onFinish}
      >
        <h1
          style={{
            fontSize: "32px",
            color: "#38393E",
            marginBottom: "13px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Set a new password
        </h1>
        <p
          style={{
            width: "275px",
            color: "#7D7E8A",
            fontSize: "14px",
            fontWeight: 400,
            textAlign: "center",
            margin: "0 auto 0 auto",
          }}
        >
          Create a new password. Ensure it differs from previous ones for
          security
        </p>

        <div style={{ margin: "45px 0 20px 0" }}>
          <label
            style={{ display: "block", color: "#38393E", marginBottom: "5px" }}
            htmlFor=""
          >
            New Password
          </label>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your new Password!",
              },
            ]}
            style={{ marginBottom: 0 }}
          >
            <Input.Password
              type="password"
              placeholder="Enter New password"
              style={{
                border: "1px solid #E0E4EC",
                height: "52px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          </Form.Item>
          {newPassError && (
            <label style={{ display: "block", color: "red" }} htmlFor="error">
              {newPassError}
            </label>
          )}
        </div>

        <div style={{ marginBottom: "40px" }}>
          <label
            style={{ display: "block", color: "#38393E", marginBottom: "5px" }}
            htmlFor="email"
          >
            Confirm Password
          </label>
          <Form.Item
            style={{ marginBottom: 0 }}
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your Confirm Password!",
              },
            ]}
          >
            <Input.Password
              type="password"
              placeholder="Enter Confirm password"
              style={{
                border: "1px solid #E0E4EC",
                height: "52px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          </Form.Item>
          {conPassError && (
            <label style={{ display: "block", color: "red" }} htmlFor="error">
              {conPassError}
            </label>
          )}
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              border: "none",
              height: "51px",
              background: "#FFA175",
              color: "white",
              borderRadius: "10px",
              outline: "none",
              marginTop: "",
            }}
          >
            {isLoading ? <Spin /> : "Reset Password"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdatePassword;
