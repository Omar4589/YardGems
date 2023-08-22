//-----------------IMPORTS-----------------------//
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ME_QUERY, QUERY_LISTINGS } from "../../utils/queries";
import { Box, IconButton, Link, InputBase } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import SearchIcon from "@mui/icons-material/Search";
import appName from "../../assets/images/appName.jpg";
import styles from "./styles";
import AuthService from "../../utils/auth";
import { Link as RouterLink } from "react-router-dom";

//-----------------------START OF COMPONENT-----------------------//
const Header = () => {
  //-----------------STATE---------------//
  //We create state: 'isSearchVisible' and set the intial state to 'false' to hide the search field
  //'true' displays the search field
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  //----------HEADER LINKS HANDLERS ---------\\
  //'toggleSearch' function handles updating the state of 'isSearchVisible' by calling the setter
  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  //this function handles submitting a search
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add search logic here
    setIsSearchVisible(false);
  };

  //this handles logging out the user
  const handleLogout = () => {
    AuthService.logout();
    window.location.replace("/");
  };

  //-----------------QUERIES--------------//
  //Here we extract the refetch method from the useQuery hook
  //refetch will execute the QUERY_LISTINGS query
  const { refetch } = useQuery(QUERY_LISTINGS);

  const { refetch: refetchMe } = useQuery(ME_QUERY);

  // Function to manually refetch data
  const handleRefetch = () => {
    refetch();
  };

  const handleRefetchMe = () => {
    refetchMe();
  };

  return (
    <Box sx={{ ...styles.mainContainer }}>
      <Box sx={{ ...styles.box }}>
        <Link
          component={RouterLink}
          onClick={handleRefetch}
          to="/MyListings"
          sx={{ ...styles.myListingsLink }}
        >
          My Listings
        </Link>
        <Link
          component={RouterLink}
          onClick={handleRefetchMe}
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
            onClick={handleRefetch}
            to="/"
            sx={{ ...styles.logoLink }}
            color={"inherit"}
          >
            <img src={appName} width="80%" height="100%" alt="green_gem" />
          </Link>
        </Box>
      </Box>

      {isSearchVisible ? (
        <form onSubmit={handleSubmit}>
          <InputBase
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
            sx={{ ...styles.searchField }}
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
        <Link
          component={RouterLink}
          to="/"
          sx={{ ...styles.homeLink }}
          onClick={handleRefetch}
        >
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
