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
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import Icon from "../../../atoms/icon";

import OptionIcon from "../../../assets/icons/options-icon.svg";
import userService from "../../../services/user.service";

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
                    <MenuItem onClick={() => handleClose(CONSTANT.EDIT, row)}>
                      Edit
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
      <Fab color="primary" aria-label="add" className="user-add-fab">
        <AddIcon />
      </Fab>
    </div>
  );
};

Users.propTypes = {
  title: string,
};

export default Users;
