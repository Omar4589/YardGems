import * as React from "react";
import { useState, useEffect } from "react";
import { Link as MuiLink } from "@mui/material";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import InfoIcon from "@mui/icons-material/Info";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import LoginIcon from "@mui/icons-material/Login";
import styles from "./styles";
import { Link as RouterLink } from "react-router-dom";
import AuthService from "../../utils/auth";
import Switch from "@mui/material/Switch";
import DashboardIcon from "@mui/icons-material/Dashboard";

export default function BottomNavBar({ handleThemeChange, darkMode }) {
  const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
  const [value, setValue] = React.useState(pathname);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    AuthService.logout();
    window.location.replace("/");
  };

  const [showBottomNav, setShowBottomNav] = useState(true);

  // The `useEffect` hook is used to add event listeners and perform side effects.
  useEffect(() => {
    //This function updates the value of showBottomNav based on the window width.
    const handleResize = () => {
      //Here we are setting the value by passing in the value of the expression
      //'is my window's innerWidth less than 768 right now? true or false
      setShowBottomNav(window.innerWidth < 768);
    };

    //Here we create an event listener for the window's resize event, and pass `handleResize` as the event handler.
    window.addEventListener("resize", handleResize);

    //Here we call `handleResize` on the initial mount to set the initial value of `showBottomNav`.
    handleResize();

    //Here we define a 'cleanup' function that removes the resize event listener
    const cleanup = () => {
      window.removeEventListener("resize", handleResize);
    };

    // Clean up the event listener by removing it when the component is unmounted.
    return cleanup;
  }, []);

  // If `showBottomNav` is false, the component returns `null`, indicating that the footer should not be rendered.
  if (!showBottomNav) {
    return null;
  }

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels="true"
      sx={{ ...styles.mainContainer }}
    >
      <BottomNavigationAction
        component={RouterLink}
        to="/MyListings"
        label="My Listings"
        sx={{ ...styles.icons }}
        icon={<DashboardIcon />}
      />

      <BottomNavigationAction
        component={RouterLink}
        to="/SavedListings"
        label="Saved Listings"
        sx={{ ...styles.icons }}
        icon={<FavoriteIcon />}
      />

      <BottomNavigationAction
        component={RouterLink}
        to="/"
        label="Home"
        icon={<MapOutlinedIcon />}
        sx={{ ...styles.icons }}
      />

      <BottomNavigationAction
        label="Menu"
        icon={<MenuIcon />}
        onClick={() => setIsDrawerOpen(true)}
      />

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box p={2} width="250px" textAlign="center" role="presentation">
          <List>
            <MuiLink
              component={RouterLink}
              to="/AboutUs"
              color="inherit"
              sx={{ textDecoration: "none" }}
              onClick={() => setIsDrawerOpen(false)}
            >
              <ListItem button>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="About Us" />
              </ListItem>
            </MuiLink>

            <MuiLink
              component={RouterLink}
              to="/ContactUs"
              color="inherit"
              sx={{ textDecoration: "none" }}
              onClick={() => setIsDrawerOpen(false)}
            >
              <ListItem button>
                <ListItemIcon>
                  <ContactPageIcon />
                </ListItemIcon>
                <ListItemText primary="Contact Us" />
              </ListItem>
            </MuiLink>

            <MuiLink
              component={RouterLink}
              to="/FAQ"
              color="inherit"
              sx={{ textDecoration: "none" }}
              onClick={() => setIsDrawerOpen(false)}
            >
              <ListItem button>
                <ListItemIcon>
                  <ContactSupportIcon />
                </ListItemIcon>
                <ListItemText primary="FAQ" />
              </ListItem>
            </MuiLink>

            <ListItem button>
              <ListItemIcon>
                <Switch checked={darkMode} onChange={handleThemeChange} />
              </ListItemIcon>
              <ListItemText primary="Theme Switcher" />
            </ListItem>

            {AuthService.loggedIn() ? (
              <>
                <MuiLink
                  component={RouterLink}
                  to="/"
                  color="inherit"
                  sx={{ textDecoration: "none" }}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Account" />
                  </ListItem>
                </MuiLink>
                <MuiLink
                  component={RouterLink}
                  to="/"
                  color="inherit"
                  sx={{ textDecoration: "none" }}
                  onClick={handleLogout}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </MuiLink>
              </>
            ) : (
              <>
                <MuiLink
                  component={RouterLink}
                  to="/signup-login"
                  color="inherit"
                  sx={{ textDecoration: "none" }}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItem>
                </MuiLink>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </BottomNavigation>
  );
}
