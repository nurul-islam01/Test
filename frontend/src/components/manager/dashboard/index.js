import { string } from "prop-types";
import React from "react";

const ManagerDashboard = ({ title }) => {
  console.log("loaded");
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

ManagerDashboard.propTypes = {
  title: string,
};

export default ManagerDashboard;
