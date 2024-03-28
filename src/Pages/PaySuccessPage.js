import React from "react";
import logo from "../assets/successpay.png";

function PaySuccessPage() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ width: "100%", height: "90vh", flexDirection: "column" }}
    >
      <img
        src={logo}
        alt="Suceess"
        style={{
          width: "150px",
          height: "150px",
          objectFit: "contain",
          marginBottom: 25,
        }}
      />
      <h1 style={{ textAlign: "center" }}>Payment Successfull</h1>
    </div>
  );
}

export default PaySuccessPage;
