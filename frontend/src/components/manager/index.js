import { string } from "prop-types";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Container from "@mui/material/Container";

import "./manager.scss";

const Manager = ({ title }) => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div>
      <div className={`sidebar ${sidebar ? "close" : ""}`}>
        <div className="logo-details">
          <i className="bx bxl-bitcoin"></i>
          <span className="logo_name">Menu</span>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">
              <i className="bx bx-home"></i>
              <span className="link_name">Dashboard</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/">
                  Dashboard
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/users">
              <i className="bx bxs-credit-card"></i>
              <span className="link_name">Users</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Users
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-bar-chart"></i>
              <span className="link_name">Chart</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Chart
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-compass"></i>
              <span className="link_name">Explore</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Explore
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-cog"></i>
              <span className="link_name">Setting</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Setting
                </a>
              </li>
            </ul>
          </li>
          <li>
            <div className="profile-details">
              <div className="profile-content">
                <img
                  src="https://github.com/Sacsam005/dropdown-menu/blob/master/image/profile.png?raw=true"
                  alt="profileImg"
                />
              </div>
              <div className="name-job">
                <div className="profile_name">John Doe</div>
                <div className="job">Crypto Expert</div>
              </div>
              <i className="bx bx-log-out"></i>
            </div>
          </li>
        </ul>
      </div>
      <section className="home-section">
        <div className="home-content">
          <i className="bx bx-menu" onClick={() => setSidebar(!sidebar)}></i>
          <span className="text">VENTURAS | Education IT</span>
        </div>
        <div className="manager-container">
          <Container>
            <Outlet />
          </Container>
        </div>
      </section>
    </div>
  );
};

Manager.propTypes = {
  title: string,
};

export default Manager;
