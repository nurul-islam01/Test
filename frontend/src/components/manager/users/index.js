import { string } from "prop-types";
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

import Icon from "../../../atoms/icon";

import OptionIcon from "../../../assets/icons/options-icon.svg";
import userService from "../../../services/user.service";
import { useOuterClick } from "../../../hooks";
import UserDialog from "./UserDialog";

import "./users.m.scss";

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

const CONSTANT = {
  EDIT: "EDIT",
  DELETE: "DELETE",
};

const Users = ({ title }) => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState("operator");
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const innerRef = useOuterClick((ev) => {
    if (
      !ev.target.classList.contains("user-add-fab") ||
      !ev.target.classList.contains("edit-menu-item")
    ) {
      setOpenDialog(false);
    }
  });
  const innerUpRef = useOuterClick((ev) => {
    if (!ev.target.classList.contains("edit-menu-item")) {
      setOpenDialog(false);
    }
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (val, user) => {
    setAnchorEl(null);

    if (val === CONSTANT.DELETE) {
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
    } else if (val === CONSTANT.EDIT) {
      setOpenUpdateDialog(true);
    }
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

  const onClose = () => {
    setOpenDialog(false);
  };

  const userSubmit = (event) => {
    event.preventDefault();

    if (!isEmail(email)) {
      toast.warn("Email is not valid");
      return;
    }

    if (!(name && email && password && role)) {
      const msg = `${!name ? "Name, " : ""}${!email ? "Email, " : ""}${
        !password ? "Password, " : ""
      }${!role ? "Role, " : ""} field is requuired.`;
      toast.warn(msg);
      return;
    }

    const usr = { name, email, password, role };
    toast
      .promise(userService.createUser(usr), {
        error: "User create failed",
        pending: "Creating...",
        success: "Created",
      })
      .then((res) => {
        const user = res.data.data;
        setUsers([user, ...users]);
      })
      .catch((err) => {
        console.log(err);
      });

    setOpenDialog(false);
  };

  const onName = (name) => {
    setName(name);
  };

  const onEmail = (email) => {
    setEmail(email);
  };

  const onPassword = (password) => {
    setPassword(password);
  };

  const onRole = (role) => {
    setRole(role);
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
                  <Button
                    aria-controls={open ? "options-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    id="options-menu"
                  >
                    <Icon
                      src={OptionIcon}
                      alt="option icon"
                      width={"24"}
                      height={"24"}
                    />
                  </Button>
                  <Menu
                    id="options-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      className="edit-menu-item"
                      onClick={() => handleClose(CONSTANT.EDIT, row)}
                    >
                      Edit
                      <UserDialog
                        ref={innerUpRef}
                        userSubmit={userSubmit}
                        open={openUpdateDialog}
                        onClose={onClose}
                        onName={onName}
                        onEmail={onEmail}
                        onPassword={onPassword}
                        onRole={onRole}
                        user={row}
                        update={true}
                      />
                    </MenuItem>
                    <MenuItem onClick={() => handleClose(CONSTANT.DELETE, row)}>
                      Delete
                    </MenuItem>
                  </Menu>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Fab
          color="primary"
          onClick={() => setOpenDialog(true)}
          aria-label="add"
          className="user-add-fab"
        >
          <AddIcon style={{ pointerEvents: "none" }} />
        </Fab>

        <UserDialog
          ref={innerRef}
          userSubmit={userSubmit}
          open={openDialog}
          onClose={onClose}
          onName={onName}
          onEmail={onEmail}
          onPassword={onPassword}
          onRole={onRole}
        />
      </div>
    </div>
  );
};

Users.propTypes = {
  title: string,
};

export default Users;
