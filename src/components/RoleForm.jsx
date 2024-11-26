import React from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";

const RoleForm = ({ open, onClose, onSubmit, editingRole }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: editingRole || { name: "", permissions: [] },
  });

  React.useEffect(() => {
    if (editingRole) {
      reset(editingRole);
    } else {
      reset({ name: "", permissions: [] });
    }
  }, [editingRole, reset]);

  const handleFormSubmit = (data) => {
    data.permissions = data.permissions.split(",").map((perm) => perm.trim()); // Parse permissions
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editingRole ? "Edit Role" : "Add Role"}</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <TextField
            label="Role Name"
            {...register("name", { required: "Role name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Permissions (comma-separated)"
            {...register("permissions", { required: "Permissions are required" })}
            error={!!errors.permissions}
            helperText={errors.permissions?.message}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RoleForm;
