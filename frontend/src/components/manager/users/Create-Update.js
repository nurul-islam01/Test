import { bool, func, object, string } from "prop-types";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Container,
  Box,
} from "@mui/material";
import isEmail from "validator/lib/isEmail";
import { toast } from "react-toastify";
import userService from "../../../services/user.service";

const CreateUpdate = ({ title = "Add a user" }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("operator");
  const query = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(new URLSearchParams(query.search).get("user"));

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user?.role?.name);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!isEmail(email)) {
      toast.warn("Email is not valid");
      return;
    }

    if (!(name && email && role)) {
      const msg = `${!name ? "Name, " : ""}${!email ? "Email, " : ""}${
        !role ? "Role, " : ""
      } field is requuired.`;
      toast.warn(msg);
      return;
    }

    const id = user?._id;

    if (id) {
      toast
        .promise(userService.updateUser(id, { name, email, role, password }), {
          error: "Update failed",
          pending: "Updating...",
          success: "Updated",
        })
        .then((res) => {
          navigate("/users");
        })
        .catch(console.log);

      return;
    }

    if (!password) {
      const msg = `${!password ? "Password, " : ""} field is requuired.`;
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
        navigate("/users");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Box>
        <h1>{user ? "Update user" : "Create a user"}</h1>
        <form
          autoComplete="off"
          className="user-create-upadte-dilog"
          onSubmit={onSubmit}
        >
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
          <DialogActions>
            <Button variant="outlined" type="button">
              <Link to="/users">Cancel</Link>
            </Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Box>
    </Container>
  );
};

CreateUpdate.propTypes = {
  title: string,
};

export default CreateUpdate;
