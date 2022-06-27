import React, { useState } from "react";
import { string } from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import FormInputBorder from "../../atoms/form-input-border";

import authService from "../../services/auth.service";

import "./login.m.scss";
import isEmail from "validator/lib/isEmail";

const Login = ({ title }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    if (!isEmail(email)) {
      toast.error("Email not valid");
      return;
    }
    toast
      .promise(authService.login(email, password), {
        pending: "Loading....",
        error: "Login failed",
        success: "Login successfull",
      })
      .then((user) => {
        if (user) {
          navigate("/");
          window.location.reload();
        }
      })
      .catch((err) => {});
  };

  return (
    <div className="form-container">
      <form autoComplete="true" className="form" onSubmit={(e) => login(e)}>
        <div className="control">
          <h1>Sign In</h1>
        </div>
        <div className="control block-cube block-input">
          <input
            name="email"
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormInputBorder />
        </div>
        <div className="control block-cube block-input">
          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FormInputBorder />
        </div>
        <button className="btn block-cube block-cube-hover" type="submit">
          <FormInputBorder />
          <div className="text">Log In</div>
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  title: string,
};

export default Login;
