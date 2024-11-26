import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const UserForm = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });

  const roles = ["Admin", "Editor", "Viewer"]; // Predefined roles
  const statuses = ["Active", "Inactive"]; // Predefined statuses

  // Populate form with user data when editing
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
        status: user.status || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        role: "",
        status: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <FormControl required>
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          name="role"
          id="role"
          label="role"
          value={formData.role}
          onChange={handleChange}
        >
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth required>
  <InputLabel id="status-label">Status</InputLabel>
  <Select
    labelId="status-label"
    id="status"
    name="status"
    value={formData.status}
    label="status"
    onChange={handleChange}
  >
    {statuses.map((status) => (
      <MenuItem key={status} value={status}>
        {status}
      </MenuItem>
    ))}
  </Select>
</FormControl>
      <Button type="submit" variant="contained" color="primary" style={{ width: "140px" }}>
        {user ? "Update User" : "Add User"}
      </Button>
      {user && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={onCancel}
          style={{ width: "140px" }}
        >
          Cancel
        </Button>
      )}
    </form>
  );
};

export default UserForm;
