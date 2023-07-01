import React from "react";
import { Box, Typography, IconButton, Link } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import SearchIcon from "@mui/icons-material/Search";
import greenGem from "../../assets/greenGem.png";
import styles from "./styles";

const Header = () => {
  return (
    <Box sx={{ ...styles.header }}>
      <Box sx={{ ...styles.bizName }}>
        <Link sx={{ ...styles.link }} color={"inherit"}>
          <Typography sx={{ ...styles.appName }}>YardGems </Typography>
          <img
            src={greenGem}
            width="30px"
            height="30px"
            alt="green_gem"
            style={styles.greenGem}
          />
        </Link>
      </Box>

      <Box>
        <IconButton
          sx={{ color: "inherit" }}
          aria-label="search"
          onClick={() => {
            alert("You clicked the search button");
          }}
        >
          <SearchIcon sx={{ ...styles.icons }} />
        </IconButton>
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
