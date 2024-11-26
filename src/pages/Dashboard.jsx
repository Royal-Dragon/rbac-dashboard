import React, { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import { Card, CardContent, Typography, Grid, Avatar } from "@mui/material";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    roles: {},
  });

  const inactiveUsers = (stats?.totalUsers || 0) - (stats?.activeUsers || 0);


  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await getUsers();
        const usersData = response.data;

        // Calculate stats
        const totalUsers = usersData.length;
        const activeUsers = usersData.filter((user) => user.status === "Active").length;
        const roles = usersData.reduce((acc, user) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {});

        setUsers(usersData);
        setStats({ totalUsers, activeUsers, roles });
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{marginBottom:'12px'}}>Dashboard</h2>
      <Grid container spacing={3} style={{ marginBottom: "30px" }}>
        {/* Total Users Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Total Users
              </Typography>
              <Typography variant="h4">{stats.totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Active Users Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Active Users
              </Typography>
              <Typography variant="h4">{stats.activeUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Inactive Users Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Inactive Users
              </Typography>
              <Typography variant="h4">{inactiveUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Users by Role Card */}
        {Object.keys(stats.roles).map((role) => (
          <Grid item xs={12} sm={6} md={4} key={role}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {role} Users
                </Typography>
                <Typography variant="h4">{stats.roles[role]}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <h3 style={{marginBottom:'12px'}}>Users</h3>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={2} key={user.id}>
            <Card style={{ position: "relative", textAlign: "center" }}>
              {/* Status Indicator */}
              {user.status === "Active" && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    width: "10px",
                    height: "10px",
                    backgroundColor: "green",
                    borderRadius: "50%",
                  }}
                ></div>
              )}

              {/* Avatar */}
              <Avatar
                style={{
                  margin: "10px auto",
                  backgroundColor: "#3f51b5",
                  width: "75px",
                  height: "75px",
                  fontSize: "50px",
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>

              <CardContent>
                {/* User Details */}
                <Typography variant="h6">{user.name.charAt(0).toUpperCase()+user.name.slice(1)}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.email}
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  {user.role}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
