import React, { useState } from "react";
import { Box, IconButton, Link, InputBase } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import SearchIcon from "@mui/icons-material/Search";
import appName from "../../assets/images/appName.jpg";
import styles from "./styles";
import AuthService from "../../utils/auth";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add search logic here
    setIsSearchVisible(false);
  };

  const handleLogout = () => {
    AuthService.logout();
    window.location.replace("/");
  };

  return (
    <Box sx={{ ...styles.mainContainer }}>
      <Box sx={{ ...styles.box }}>
        <Link
          component={RouterLink}
          to="/MyListings"
          sx={{ ...styles.myListingsLink }}
        >
          My Listings
        </Link>
        <Link
          component={RouterLink}
          to="/SavedListings"
          sx={{ ...styles.savedListingLink }}
        >
          Saved Listings
        </Link>
      </Box>

      <Box sx={{ ...styles.appLogobox }}>
        <Box sx={{ ...styles.appLogo }}>
          <Link
            component={RouterLink}
            to="/"
            sx={{ ...styles.logoLink }}
            color={"inherit"}
          >
            <img src={appName} width="100%" height="100%" alt="green_gem" />
          </Link>
        </Box>
      </Box>

      {isSearchVisible ? (
        <form onSubmit={handleSubmit}>
          <InputBase
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
          />
        </form>
      ) : (
        <>
          <IconButton
            sx={{ color: "inherit" }}
            aria-label="search"
            onClick={toggleSearch}
          >
            <SearchIcon sx={{ ...styles.searchIcon }} />
          </IconButton>
          <IconButton
            sx={{ color: "inherit", size: "small" }}
            aria-label="message"
            onClick={() => {
              alert("You clicked the message button");
            }}
          >
            <InboxIcon sx={{ ...styles.messagesIcon }} />
          </IconButton>
        </>
      )}

      <Box sx={{ ...styles.box }}>
        <Link component={RouterLink} to="/" sx={{ ...styles.homeLink }}>
          Home
        </Link>

        {AuthService.loggedIn() ? (
          <>
            <Link
              component={RouterLink}
              to="/MyAccount"
              sx={{ ...styles.myAccountLink }}
            >
              My Account
            </Link>
            <Link
              component={RouterLink}
              to="/"
              onClick={handleLogout}
              sx={{ ...styles.logoutLink }}
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              component={RouterLink}
              to="/signup-login"
              sx={{ ...styles.signUpLoginLink }}
            >
              SignUp/Login
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Header;
