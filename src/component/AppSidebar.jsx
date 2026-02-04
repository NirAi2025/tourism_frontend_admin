import React from 'react'
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { NavLink } from "react-router-dom";

const AppSidebar = () => {
  return (
    <div className='sidebar'>
       <Drawer
      variant="permanent"
      sx={{
        width: 220,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 220,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ p: 2, fontWeight: 600 }}>Admin</Box>

      <List>
        <ListItemButton
  component={NavLink}
  to="/dashboard"
  sx={{
    "&.active": {
      backgroundColor: "#eef2ff",
      fontWeight: 600,
    },
  }}
>
  <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
</ListItemButton>
 <ListItemButton
  component={NavLink}
  to="/guiders"
  sx={{
    "&.active": {
      backgroundColor: "#eef2ff",
      fontWeight: 600,
    },
  }}
>
  <ListItemIcon>
            <AssignmentIndIcon />
          </ListItemIcon>
          <ListItemText primary="Guiders" />
</ListItemButton>
      </List>
    </Drawer>
    </div>
  )
}

export default AppSidebar