import React from "react";
import { Box, Typography, Button, Link } from "@mui/material";
import styles from "./styles";
import ABB from "../../assets/ABB.avif";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import greenGem from "../../assets/images/greenGem.png";

import { Link as RouterLink } from "react-router-dom";

const CustomIcon = () => (
  <img src={greenGem} alt="gem" style={{ height: 30, width: 30 }}></img>
);

const AboutUs = () => {
  return (
    <Box sx={{ ...styles.mainContainer }}>
      <Box sx={{ ...styles.imageBox }}>
        <img src={ABB} alt="background" style={styles.bgimage}></img>
        <Box
          sx={{
            ...styles.blackScreen,
          }}
        ></Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            bottom: "200.5%",
            zIndex: 4,
          }}
        >
          <Typography sx={{ ...styles.heading }}>
            Helping people find yard gems since 2023
          </Typography>

          <Box sx={{ ...styles.box2 }}>
            <Typography sx={{ ...styles.statement1 }}>
              Welcome to Yardgems – your ultimate companion in the treasure hunt
              of garage and yard sales! In a world where thrifting has
              transformed from a budget-friendly choice to a lifestyle
              celebrated by millions, Yardgems stands as a beacon for those who
              seek to discover, reclaim, and give new life to unique finds.
              <br></br>
              <br></br>
              With an estimated tens of thousands of garage sales happening
              across the country every weekend, we firmly believe that a
              well-planned sale excursion can lead to incredible discoveries,
              significant savings, and a healthier, more sustainable lifestyle.{" "}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ my: 10 }} id="ourMission">
        <Typography sx={{ ...styles.heading2 }}>OUR MISSION</Typography>
        <Typography sx={{ ...styles.statement }}>
          Yard and garage sales offer more than just an opportunity to buy and
          sell goods. They foster a sense of community, spark conversations, and
          allow people to connect over shared interests. YardGems aims to
          capture and enhance this sense of community by providing a centralized
          hub where enthusiasts can come together, exchange stories, and embark
          on exciting sale adventures. We believe that the thrill of finding
          unique treasures shouldn't be limited to chance encounters but should
          be easily accessible to all.{" "}
        </Typography>
      </Box>

      <Box id="whyYardGems" sx={{ my: 10 }}>
        <Typography sx={{ ...styles.heading3 }}>
          Here's why our community loves Yardgems:
        </Typography>
        <List
          sx={{
            "@media (min-width: 768px)": { width: "70%", mx: "auto", my: 3 },
          }}
        >
          <ListItem>
            <ListItemIcon>
              <CustomIcon />
            </ListItemIcon>
            <ListItemText
              primary="Discover New Sales Daily"
              primaryTypographyProps={{
                sx: {
                  textDecoration: "underline",
                  "@media (min-width: 768px)": { fontSize: 20, mb: 1 },
                },
              }}
              secondary="With the thrifting trend on the rise, new garage and yard sales pop up regularly, offering fresh opportunities to score unique items at unbeatable prices."
              secondaryTypographyProps={{
                color: "black",
                sx: { "@media (min-width: 768px)": { fontSize: 16 } },
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CustomIcon />
            </ListItemIcon>
            <ListItemText
              primary="Eco-Friendly Shopping"
              primaryTypographyProps={{
                sx: {
                  textDecoration: "underline",
                  "@media (min-width: 768px)": { fontSize: 20, mb: 1 },
                },
              }}
              secondary="By participating in garage and yard sales, you're not just finding incredible deals; you're also contributing to a more sustainable future by giving items a second life."
              secondaryTypographyProps={{
                color: "black",
                sx: { "@media (min-width: 768px)": { fontSize: 16 } },
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CustomIcon />
            </ListItemIcon>
            <ListItemText
              primary="Community and Connection"
              primaryTypographyProps={{
                sx: {
                  textDecoration: "underline",
                  "@media (min-width: 768px)": { fontSize: 20, mb: 1 },
                },
              }}
              secondary="Yardgems fosters a sense of community, connecting like-minded individuals who share a passion for discovery and sustainable living."
              secondaryTypographyProps={{
                color: "black",
                sx: { "@media (min-width: 768px)": { fontSize: 16 } },
              }}
            />
          </ListItem>
        </List>
      </Box>

      <Box id="JoinUs" sx={{ mb: 18 }}>
        <Typography sx={{ ...styles.heading4 }}>JOIN US</Typography>
        <Typography sx={{ ...styles.lastStatment1 }}>
          {" "}
          Whether you're a seasoned bargain hunter or new to the world of garage
          and yard sales, Yardgems is your gateway to countless treasures
          waiting to be discovered. Because every item has a story, and with
          Yardgems, you're always one step closer to finding your next cherished
          gem.
        </Typography>
        <Typography sx={{ ...styles.lastStatment2 }}>
          {" "}
          Happy hunting!
        </Typography>

        <Button
          variant="contained"
          sx={{
            mx: "auto",
            display: "block",
            mb: 14,
            backgroundColor: "#66bb6a",
            ":hover": {
              bgcolor: "#15803d", // theme.palette.primary.main
              color: "white",
            },
          }}
        >
          <Link
            component={RouterLink}
            to="/signup-login"
            color="inherit"
            sx={{ textDecoration: "none" }}
          >
            click here to sign up and get started
          </Link>
        </Button>
      </Box>
    </Box>
  );
};

export default AboutUs;
