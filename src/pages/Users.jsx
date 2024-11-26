import React, { useEffect, useState } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "../services/api";
import UserForm from "../components/UserForm";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // Tracks the user being edited

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      await addUser(newUser);
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleUpdateUser = async (id, updatedUser) => {
    try {
      await updateUser(id, updatedUser);
      fetchUsers();
      setEditingUser(null); // Reset the editing user
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => setEditingUser(params.row)}
            style={{ marginRight: "10px" }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDeleteUser(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User Management</h2>
      <div style={{ height: 400, width: "100%", marginBottom: "20px" }}>
        <DataGrid rows={users} columns={columns} pageSize={5} />
      </div>
      <h3>{editingUser ? "Edit User" : "Add New User"}</h3>
      <UserForm
        user={editingUser}
        onSubmit={(userData) => {
          if (editingUser) {
            handleUpdateUser(editingUser.id, userData);
          } else {
            handleAddUser(userData);
          }
        }}
        onCancel={() => setEditingUser(null)} // Reset editing user on cancel
      />
    </div>
  );
};

export default Users;
