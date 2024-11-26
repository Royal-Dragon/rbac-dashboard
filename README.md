# Role-Based Access Control (RBAC) Dashboard

A responsive and feature-rich admin dashboard for managing users, roles, and permissions using React, Material-UI, and JSON Server.

## Features

- **User Management**:
  - View, add, edit, and delete users.
  - Assign roles and set user statuses (Active/Inactive).
  - Auto-populate the form fields while editing a user.
  - Dropdown selection for roles and statuses.

- **Role Management**:
  - Create, edit, and delete roles.
  - Assign specific permissions to roles.

- **Dashboard**:
  - Summary cards displaying active and inactive users.
  - Individual user cards with profile initials, details, and activity status.

- **Data Integration**:
  - Simulated backend using JSON Server for user and role data management.
  - Real-time updates with API calls for CRUD operations.

- **UI Enhancements**:
  - Fully responsive design using Material-UI.
  - Integration of DataGrid for seamless user and role listing with pagination.

---

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/rbac-dashboard.git
   cd rbac-dashboard
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start JSON Server**:
   - Run JSON Server:
     ```bash
     npx json-server --watch db.json --port 3001
     ```

4. **Start the React App**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

---

## Project Structure

```
src/
├── components/
│   ├── DashboardCard.jsx       # Displays summary cards on the dashboard
│   ├── UserCard.jsx            # Individual user cards
│   ├── UserForm.jsx            # Form to add/edit users
│   └── RoleForm.jsx            # Form to add/edit roles
├── pages/
│   ├── Dashboard.jsx           # Dashboard page
│   ├── Users.jsx               # Users management page
│   ├── Roles.jsx               # Roles management page
├── services/
│   ├── api.js                  # API functions for CRUD operations
├── App.jsx                     # App entry point
└── main.jsx                    # Main React file
```

---

## Technologies Used

- **Frontend**: React, Vite
- **UI Framework**: Material-UI
- **Backend**: JSON Server (Mock API)
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Styling**: Material-UI's `sx` and CSS-in-JS

---

## Usage

### Managing Users
1. Navigate to the **Users** page.
2. View all users in a table with a DataGrid.
3. Add or edit users using the form:
   - Roles and statuses are selected via dropdown menus.
   - Form auto-populates for editing users.
4. Delete users using the delete button in the table.

### Managing Roles
1. Navigate to the **Roles** page.
2. View, add, edit, and delete roles.
3. Assign permissions to roles during creation or editing.

### Dashboard Overview
- View active and inactive user counts in summary cards.
- View each user in individual cards with their details and status indicator.

---

## Screenshots

### Dashboard
![Dashboard Screenshot](path/to/dashboard-screenshot.png)

### User Management
![Users Screenshot](path/to/users-screenshot.png)

---
