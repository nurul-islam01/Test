import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Dashboard from "./components/dashboard";
import ManagerDashboard from "./components/manager/dashboard";
import Login from "./components/login";
import Users from "./components/manager/users";

import { LOGIN } from "./actions/constans";
import { authReducer } from "./actions/auth";

import authService from "./services/auth.service";
import { get } from "lodash";
import Manager from "./components/manager";

import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const user = authService.getUser();
  const role = get(user, ["role", "name"]);

  console.log("App");

  useEffect(() => {
    if (!user) {
      // navigate("/login");
      return;
    } else {
      dispatch(authReducer({ type: LOGIN, paylod: user }));
    }
  }, []);

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              user ? (
                role === "manager" ? (
                  <Manager title="This is Manager" />
                ) : (
                  <Dashboard title="This is operator dashboard" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route
              path="/"
              element={<ManagerDashboard title="This is manager dashboard" />}
            />
            <Route
              path="/users"
              element={<Users title="This is user controller panel" />}
            />
          </Route>
          <Route
            exact
            path="/login"
            element={<Login title="This is Login page" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
