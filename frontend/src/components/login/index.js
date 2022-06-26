import { string } from "prop-types";
import React from "react";

import "./login.m.scss";

const Login = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

Login.propTypes = {
  title: string,
};
