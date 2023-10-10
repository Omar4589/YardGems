//-----------------IMPORTS-----------------------//
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_LISTINGS, ME_QUERY } from "../../utils/queries";
import { Link as MuiLink } from "@mui/material";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import InfoIcon from "@mui/icons-material/Info";
import { Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { List, ListItem, ListItemIcon, ListItemText, Popover, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import InstallMobileIcon from "@mui/icons-material/InstallMobile";
import LoginIcon from "@mui/icons-material/Login";
import DownloadIcon from "@mui/icons-material/Download";
import styles from "./styles";
import { Link as RouterLink } from "react-router-dom";
import AuthService from "../../utils/auth";
import Switch from "@mui/material/Switch";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";
import { isIntrospectionType } from "graphql";

//-----------------------START OF COMPONENT-----------------------//
export default function BottomNavBar({ handleThemeChange, darkMode }) {
  const navigate = useNavigate();
  const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
  //-----------------STATE---------------//
  //the 'windowPath' state tracks the path/route/url
  const [windowPath, setWindowPath] = useState(pathname);
  //this state tracks whether or not the menu drawer is open/visible in the DOM
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  //This state tracks whether the bottom nav component is visible or hidden
  const [showBottomNav, setShowBottomNav] = useState(true);

  const [showInstallButton, setShowInstallButton] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(null);
  const [isChrome, setIsChrome] = useState(null);
  const [loginPopOver, setLoginPopOver] = useState(false);

  //-----------------HOOKS---------------//
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

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      // Store the `beforeinstallprompt` event so it can be triggered later
      setDeferredPrompt(e);
    });

    // Update UI notify the user they can install the PWA
    setShowInstallButton(true);

    // Your existing display-mode check code
    if (window.matchMedia("(display-mode: standalone)").matches) {
      console.log("This is running as standalone.");
      setShowInstallButton(false);
    } else {
      console.log("This is running in a browser tab.");
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", () => {});
    };
  }, []);

  useEffect(() => {
    const iOSCheck =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    const chromeCheck =
      /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    setIsIOS(iOSCheck);
    setIsChrome(chromeCheck);
  }, []);

  //----------HANDLERS ---------\\
  //this function handles updating state of windowPath
  const handlePathChange = (event, newValue) => {
    setWindowPath(newValue);
  };

  //this function handles logging out the user
  const handleLogout = () => {
    AuthService.logout();
    window.location.replace("/");
  };

    //Closes pop over message - 'Please log in'
    const closePopOver = () => setLoginPopOver(false);


  const handleInstallClick = () => {
    if (isIOS) {
      // Redirect to a page with instructions for iOS users
      navigate("/iOS-installation-instructions");
      return;
    }

    if (isChrome) {
      setLoginPopOver(true);
      return;
    }

    // Your existing logic for invoking the deferred prompt and installing the app
    if (deferredPrompt) {
      // assuming deferredPrompt is defined
      deferredPrompt.prompt();
      // ... (rest of your installation code)
    }
    return;
  };
  

  //-----------------QUERIES--------------//
  //Here we extract the refetch method from the useQuery hook
  //refetch will execute the QUERY_LISTINGS query
  const { refetch } = useQuery(QUERY_LISTINGS); // Import and provide your actual query here
  const { refetch: refetchMe } = useQuery(ME_QUERY);

  // Function to manually refetch data
  const handleRefetch = () => {
    refetch();
  };

  const handleRefetchMe = () => {
    refetchMe();
  };

  // If `showBottomNav` is false, the component returns `null`, indicating that the footer should not be rendered.
  if (!showBottomNav) {
    return null;
  }

  return (
    <BottomNavigation
      id="bottom-navigation"
      value={windowPath}
      onChange={handlePathChange}
      showLabels={true}
      sx={{ ...styles.mainContainer }}
    >
      <BottomNavigationAction
        component={RouterLink}
        to="/MyListings"
        label="My Listings"
        onClick={handleRefetchMe}
        sx={{ ...styles.icons }}
        icon={<DashboardIcon />}
      />

      <BottomNavigationAction
        component={RouterLink}
        to="/SavedListings"
        label="Saved Listings"
        onClick={handleRefetchMe}
        sx={{ ...styles.icons }}
        icon={<FavoriteIcon />}
      />

      <BottomNavigationAction
        component={RouterLink}
        to="/"
        onClick={handleRefetch}
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

            {/* <ListItem button>
              <ListItemIcon>
                <Switch checked={darkMode} onChange={handleThemeChange} />
              </ListItemIcon>
              <ListItemText primary="Theme Switcher" />
            </ListItem> */}

            {AuthService.loggedIn() ? (
              <>
                <MuiLink
                  component={RouterLink}
                  to="/MyAccount"
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

            <MuiLink
              id="install-button"
              component="button"
              color="inherit"
              sx={{
                textDecoration: "none",
                display: showInstallButton ? "block" : "none",
              }}
              onClick={() => {
                handleInstallClick();
                setIsDrawerOpen(false);
              }}
            >
              <ListItem button>
                <ListItemIcon>
                  <DownloadIcon />
                </ListItemIcon>
                <ListItemText primary="Install YardGems app" />
              </ListItem>
            </MuiLink>
          </List>
        </Box>
        <Popover
          open={loginPopOver}
          onClose={closePopOver}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography sx={{ p: 2 }}>
            Please use Chrome to install this app
          </Typography>
        </Popover>
      </Drawer>
    </BottomNavigation>
  );
}
