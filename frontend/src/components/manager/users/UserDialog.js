import { bool, func, object } from "prop-types";
import React from "react";
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
  ref,
  onClose,
  open,
  userSubmit,
  onName,
  onEmail,
  onPassword,
  onRole,
  user = {},
}) => {
  return (
    <VenturasDialog onClose={onClose} open={open}>
      <div ref={ref}>
        <DialogTitle>Add a user</DialogTitle>
        <form
          autoComplete="off"
          className="user-create-upadte-dilog"
          onSubmit={userSubmit}
        >
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel id="role-set">Role</InputLabel>
              <Select
                labelId="role-set"
                label="Role"
                value={user?.role?.name}
                onChange={(e) => onRole(e.target.value)}
              >
                <MenuItem selected value="operator">
                  Operator
                </MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
              </Select>
            </FormControl>
            <TextField
              onChange={(e) => onName(e.target.value)}
              label="Name"
              type="text"
              variant="outlined"
              value={user?.name}
              required
            />
            <TextField
              onChange={(e) => onEmail(e.target.value)}
              label="Email"
              type="email"
              variant="outlined"
              value={user?.email}
              required
            />
            <TextField
              onChange={(e) => onPassword(e.target.value)}
              label="Password"
              type="password"
              variant="outlined"
              required
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
      </div>
    </VenturasDialog>
  );
};

UserDialog.propTypes = {
  ref: object,
  userSubmit: func,
  onClose: func,
  open: bool,
  onName: func,
  onEmail: func,
  onPassword: func,
  onRole: func,
  user: object,
};

export default UserDialog;
