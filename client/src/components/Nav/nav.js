//-----------------IMPORTS-----------------------//
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_LISTINGS, ME_QUERY } from "../../utils/queries";
import { Link as MuiLink } from "@mui/material";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import { Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Snackbar,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import LoginIcon from "@mui/icons-material/Login";
import DownloadIcon from "@mui/icons-material/Download";
import styles from "./styles";
import { Link as RouterLink } from "react-router-dom";
import AuthService from "../../utils/auth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";

//-----------------------START OF COMPONENT-----------------------//
export default function BottomNavBar({ handleThemeChange, darkMode }) {
  //useNavigate hook allows us to navigate between routes
  const navigate = useNavigate();
  const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
  //-----------------STATE---------------//
  //the 'windowPath' state tracks the path/route/url
  const [windowPath, setWindowPath] = useState(pathname);
  //this state tracks whether or not the menu drawer is open/visible in the DOM
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  //This state tracks whether the bottom nav component is visible or hidden
  const [showBottomNav, setShowBottomNav] = useState(true);
  //tracks the visibility of the install button in the drawer
  const [showInstallButton, setShowInstallButton] = useState(false);
  //state to hold the deferred prompt
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  //state that tracks if user is using an iOS device
  const [isIOS, setIsIOS] = useState(null);
  //tracks if the user's browser is a chrome broswer
  const [isChrome, setIsChrome] = useState(null);
  //tracks snackbar
  const [chromePopOver, setchromePopOver] = useState(false);

  //-----------------HOOKS---------------//
  //this useEffect hook tracks and responds to the width of the window
  useEffect(() => {
    //This function handles showing or hiding the bottom nav
    const handleResize = () => {
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
    //set up a listener for the install prompt
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      // Store the `beforeinstallprompt` event so it can be triggered later
      setDeferredPrompt(e);
    });

    //update state to show install button
    setShowInstallButton(true);

    //here we check if the app's already installed by checking the display-mode.
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShowInstallButton(false);
    } else {
      //write your logic here
    }

    //clean up function
    return () => {
      window.removeEventListener("beforeinstallprompt", () => {});
    };
  }, []);

  //this hook check if the device is an iOS device and if it's a chrome browser.
  useEffect(() => {
    //use navigator.userAgent to get browser details & window.MSStream to check if it's a windows phone
    const iOSCheck =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    //check if the broswer is a chrome broswer
    const chromeCheck = /Chrome/.test(navigator.userAgent);
    //update states accordingly
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

  //Closes snackbar
  const closeSnackbar = () => setchromePopOver(false);

  //handles install button click
  const handleInstallClick = () => {
    if (isIOS) {
      // Redirect to a page with instructions for iOS users
      navigate("/iOS-installation-instructions");
      return;
    }

    //if it's not a chrome browser, alert user using snackbar
    if (isChrome === false) {
      setchromePopOver(true);
      return;
    }
    //run the install
    if (deferredPrompt) {
      deferredPrompt.prompt();
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
        to="/"
        onClick={handleRefetch}
        label="Home"
        icon={<HomeIcon />}
        sx={{ ...styles.icons }}
      />

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
        <Snackbar
          open={chromePopOver}
          autoHideDuration={6000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={closeSnackbar} severity="error">
            Please use Chrome to install this app.
          </Alert>
        </Snackbar>
      </Drawer>
    </BottomNavigation>
  );
}
