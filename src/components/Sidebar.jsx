import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import SecurityIcon from "@mui/icons-material/Security";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Users", icon: <GroupIcon />, path: "/users" },
    { text: "Roles", icon: <SecurityIcon />, path: "/roles" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#FFFFFF", // Light background color
          color: "#333", // Dark text color
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
        },
      }}
    >
      <Box style={{backgroundColor:'#1976d2'}} sx={{ padding: 4 }} >
        <Typography style={{marginBottom:"6px"}} variant="h5" component="div" sx={{ color: "#ffffff", fontWeight: "bold", textAlign: "center" }}>
          VRV Security
        </Typography>
      </Box>
      <List style={{ margin:" 0px 15px"}}>
        {menuItems.map((item) => {
          return (
            <ListItem
              key={item.text}
              button
              component={Link}
              to={item.path}
              sx={{
                backgroundColor: location.pathname === item.path ? "#D9E2F3" : "transparent", // Active item highlight
                "&:hover": {
                  backgroundColor: "#D9E2F3", // Hover effect
                },
                padding: "10px 20px",
                marginBottom: "5px",
                borderRadius: "8px",
              }}
            >
              <ListItemIcon sx={{ color: "#333" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
