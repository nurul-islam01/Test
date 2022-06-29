import { bool, func, object, string } from "prop-types";
import React, { useState } from "react";
import {
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import VenturasDialog from "../../../atoms/dialog";

const UserDialog = ({
  title = "Add a user",
  onClose,
  open,
  userSubmit,
  user,
}) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState("operator");

  if (user) {
    setName(user.name);
    setEmail(user.email);
    setRole(user?.role?.name);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const user = { name, email, password, role };
    userSubmit(user, user?._id);
  };

  return (
    <VenturasDialog onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <form
        autoComplete="off"
        className="user-create-upadte-dilog"
        onSubmit={onSubmit}
      >
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="role-set">Role</InputLabel>
            <Select
              labelId="role-set"
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem selected value="operator">
                Operator
              </MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
            </Select>
          </FormControl>
          <TextField
            onChange={(e) => setName(e.target.value)}
            label="Name"
            type="text"
            variant="outlined"
            value={name}
            required
          />
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            required
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            variant="outlined"
            value={password}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </VenturasDialog>
  );
};

UserDialog.propTypes = {
  userSubmit: func,
  onClose: func,
  open: bool,
  user: object,
  title: string,
};

export default UserDialog;
