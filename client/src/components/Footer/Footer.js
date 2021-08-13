import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        height: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem"
      }}
    >
      <p>
        {" "}
        Created by <a href="https://waris-portfolio.herokuapp.com">
          Waris
        </a>{" "}
      </p>
    </div>
  );
};

export default Footer;
