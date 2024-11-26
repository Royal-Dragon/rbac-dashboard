import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { getRoles, addRole, updateRole, deleteRole } from "../services/api";
import RoleForm from "../components/RoleForm";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  // Fetch roles from the server
  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // Handle Dialog Open/Close
  const handleOpen = (role = null) => {
    setEditingRole(role);
    setOpen(true);
  };
  const handleClose = () => {
    setEditingRole(null);
    setOpen(false);
  };

  // Handle Role Submission
  const handleSubmit = async (data) => {
    try {
      if (editingRole) {
        await updateRole(editingRole.id, data);
      } else {
        await addRole(data);
      }
      fetchRoles();
      handleClose();
    } catch (error) {
      console.error("Error saving role:", error);
    }
  };

  // Handle Role Deletion
  const handleDelete = async (id) => {
    try {
      await deleteRole(id);
      fetchRoles();
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  // DataGrid Columns
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Role Name", width: 200 },
    { field: "permissions", headerName: "Permissions", width: 300, renderCell: (params) => params.value.join(", ") },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Button variant="contained" color="primary" onClick={() => handleOpen(params.row)}>
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "12px" }}>Role Management</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} style={{ marginBottom: "20px" }}>
        Add Role
      </Button>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={roles} columns={columns} pageSize={5} />
      </div>
      <RoleForm open={open} onClose={handleClose} onSubmit={handleSubmit} editingRole={editingRole} />
    </div>
  );
};

export default Roles;
