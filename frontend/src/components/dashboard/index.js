import React from "react";
import { string } from "prop-types";

import "./dashboard.m.scss";

const Dashboard = ({ title = "Dashboard" }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

Dashboard.propTypes = {
  title: string,
};

export default Dashboard;
