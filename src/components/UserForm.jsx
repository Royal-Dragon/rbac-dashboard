import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { getRoles } from "../services/api";


const UserForm = ({ user, onSubmit, onCancel, roles }) => {


  const [newroles, setNewRoles] = useState([]);
const fetchRoles = async () => {
  try {
    const response = await getRoles();
    setNewRoles(response.data);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
useEffect(() => {
  fetchRoles();
}, []);
newroles.map((role)=>(
  console.log(role.name)
))



  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });

  const statuses = ["Active", "Inactive"]; // Predefined statuses

  // Populate form with user data when editing
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
        status: user.status || "Active",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        role: "",
        status: "Active",
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
          label="Role"
          value={formData.role}
          onChange={handleChange}
        >
          {newroles && newroles.length > 0 ? (
            newroles.map((role) => (
              <MenuItem key={role} value={role}>
                {role.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No Roles Available</MenuItem>
          )}
        </Select>
      </FormControl>
      <FormControl fullWidth required>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          id="status"
          name="status"
          value={formData.status}
          label="Status"
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
