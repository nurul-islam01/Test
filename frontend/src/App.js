import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Dashboard from "./components/dashboard";
import Login from "./components/login";
import { LOGIN } from "./actions/constans";
import { authReducer } from "./actions/auth";

import "./App.scss";
import authService from "./services/auth.service";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = authService.getUser();
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
            element={<Dashboard title="This is dashboard" />}
          />
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
