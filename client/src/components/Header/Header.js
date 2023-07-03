import React, { useState } from "react";
import { Box, IconButton, Link, InputBase } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import SearchIcon from "@mui/icons-material/Search";
import appName from "../../assets/images/appName.jpg";
import styles from "./styles";

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

  return (
    <Box sx={{ ...styles.header }}>
      <Box sx={{ ...styles.bizName }}>
        <Link href="/" sx={{ ...styles.link }} color={"inherit"}>
          <img
            src={appName}
            width="150px"
            height="27px"
            alt="green_gem"
            style={styles.greenGem}
          />
        </Link>
      </Box>

      <Box>
        {isSearchVisible ? (
          <form onSubmit={handleSubmit} style={{ display: "inline" }}>
            <InputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
              sx={{ ...styles.searchInput }}
            />
          </form>
        ) : (
          <IconButton
            sx={{ color: "inherit" }}
            aria-label="search"
            onClick={toggleSearch}
          >
            <SearchIcon sx={{ ...styles.icons }} />
          </IconButton>
        )}

        <IconButton
          sx={{ color: "inherit", size: "small" }}
          aria-label="message"
          onClick={() => {
            alert("You clicked the message button");
          }}
        >
          <InboxIcon sx={{ ...styles.icons }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
