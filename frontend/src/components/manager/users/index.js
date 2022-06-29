import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import isEmail from "validator/lib/isEmail";
import Tooltip from "@mui/material/Tooltip";

import Icon from "../../../atoms/icon";

import DeleteIcon from "../../../assets/icons/trash-solid.svg";
import EditIcon from "../../../assets/icons/user-pen-solid.svg";
import userService from "../../../services/user.service";

import "./users.m.scss";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Users = () => {
  const [users, setUsers] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const deleteUser = (user) => {
    const yes = window.confirm("Are you sure");
    if (!yes) {
      return;
    }
    toast
      .promise(userService.deleteUser(user._id), {
        pending: "Deleteing...",
        error: "Delete failed",
        success: "Deleted.",
      })
      .then((res) => {
        const index = users.indexOf(user);
        const newUsers = users.splice(index, 1);
        setUsers(newUsers);
      });
  };

  useEffect(() => {
    toast
      .promise(userService.getUsers(), {
        pending: "Users loading....",
        error: "Users loading failed",
        success: "Completed.",
      })
      .then((res) => {
        const data = res.data;
        setUsers(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const userSubmit = (user, id) => {
    const { name, email, password, role } = user;

    if (!isEmail(email)) {
      toast.warn("Email is not valid");
      return;
    }

    if (id) {
      toast
        .promise(userService.updateUser(id, user), {
          error: "Update failed",
          pending: "Updating...",
          success: "Updated",
        })
        .then((res) => {
          const newArray = users.map((item) =>
            item._id === id ? res.data.data : item
          );
          setUsers(newArray);
        })
        .catch(console.log);

      return;
    }

    if (!(name && email && password && role)) {
      const msg = `${!name ? "Name, " : ""}${!email ? "Email, " : ""}${
        !password ? "Password, " : ""
      }${!role ? "Role, " : ""} field is requuired.`;
      toast.warn(msg);
      return;
    }
    toast
      .promise(userService.createUser(user), {
        error: "User create failed",
        pending: "Creating...",
        success: "Created",
      })
      .then((res) => {
        const updated = res.data.data;
        setUsers([...users, updated]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpenDialog(false);
      });
  };

  return (
    <div className="user-container">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Index</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Role</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell scope="row">
                  {row.name || "null"}
                </StyledTableCell>
                <StyledTableCell align="right">{row.role.name}</StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">
                  <Link
                    to={{
                      pathname: "/user/update",
                      search: `user=${JSON.stringify(row)}`,
                    }}
                    style={{ marginRight: "12px" }}
                  >
                    <Icon
                      src={EditIcon}
                      alt="option icon"
                      width={"24"}
                      height={"24"}
                    />
                  </Link>
                  <Icon
                    src={DeleteIcon}
                    alt="option icon"
                    width={"24"}
                    height={"24"}
                    onClick={() => {
                      deleteUser(row);
                    }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Link to="/user/create">
          <Tooltip title="Create user">
            <Fab color="primary" aria-label="add" className="user-add-fab">
              <AddIcon />
            </Fab>
          </Tooltip>
        </Link>
      </div>
    </div>
  );
};

export default Users;
