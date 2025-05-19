import React from "react";
import "./CustomBtn.css";
const CustomBtn = (prop) => {
  return <button className="btn"> {prop.text}</button>;
};

export default CustomBtn;
