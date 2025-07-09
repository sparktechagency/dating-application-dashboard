import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Button, Spin } from "antd";
import { useVerifyEmailMutation } from "../../redux/api/AuthApi";
import { toast } from "sonner";

const Otp = () => {
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const handleResendCode = () => {};
  const handleVerifyOtp = () => {
    if (!otp) {
      return toast.error("Please enter your otp!");
    }
    const data = {
      email: localStorage.getItem("email"),
      recoveryOTP: otp,
    };
    verifyEmail(data)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message)
        navigate("/auth/update-password")
      })
      .catch((error) =>{
         toast.error(error?.data?.message)
      });
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
      <div
        style={{
          width: "630px",
          background: "white",
          padding: "90px 57px",
          borderRadius: "12px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            color: "#6A6D7C",
            marginBottom: "13px",
            textAlign: "center",
          }}
        >
          Check your email
        </h1>
        <p
          style={{ width: "380px", color: "#B8B8B8", margin: "0 auto 0 auto" }}
        >
          We sent a reset link to{" "}
          <span style={{ color: "#545454" }}> contact@dscode...com </span>
          enter 6 digit code that mentioned in the email
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "30px",
          }}
          className="py-7"
        >
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputStyle={{
              height: "44px",
              width: "44px",
              borderRadius: "8px",
              marginRight: "16px",
              fontSize: "20px",
              border: "1px solid #A9A9A9",
              color: "#2B2A2A",
              outline: "none",
            }}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        <Button
          disabled={isLoading}
          onClick={handleVerifyOtp}
          block
          htmlType="submit"
          style={{
            height: "52px",
            fontWeight: "400px",
            fontSize: "18px",
            color: "white",
            background: "#FFA175",
            marginTop: "30px",
            border: "none",
            outline: "none",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >
          {isLoading ? <Spin /> : "Continue"}
        </Button>
        {/* <p className="flex  justify-center gap-2">
          Didn’t receive code?
          <p
            onClick={handleResendCode}
            style={{
              color: "#FFA175",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Resend{" "}
          </p>
        </p> */}
      </div>
    </div>
  );
};

export default Otp;
