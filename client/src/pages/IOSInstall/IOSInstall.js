import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CardMedia,
  Box,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./styles";
import step1 from "../../assets/images/iOSInstall1.jpg";
import step2 from "../../assets/images/iOSInstall2.jpg";
import step3 from "../../assets/images/iOSInstall3.jpg";
import step4 from "../../assets/images/iOSInstall4.jpg";

const IOSInstall = () => {
  return (
    <Card sx={{ ...styles.main }}>
      <CardContent sx={{ ...styles.main }}>
        <Typography variant="h5" component="div" sx={{ ...styles.heading }}>
          How to Install on iOS
        </Typography>
        <List>
          <Box sx={{ ...styles.steps }}>
            <ListItem>
              <ListItemIcon>
                <ArrowForwardIcon />
              </ListItemIcon>
              <ListItemText
                primary="Step 1: Safari"
                secondary="Make sure you're using Safari as your browser."
              />
            </ListItem>
            <CardMedia
              component="img"
              sx={{
                ...styles.images,
              }}
              image={step1}
              alt="Step 1 image"
            />
          </Box>

          <Box sx={{ ...styles.steps }}>
            <ListItem>
              <ListItemIcon>
                <ArrowForwardIcon />
              </ListItemIcon>
              <ListItemText
                primary="Step 2: Tap the Share Button"
                secondary="At the bottom of the screen, tap the share icon. It looks like a square with an arrow pointing out of it."
              />
            </ListItem>
            <CardMedia
              component="img"
              sx={{ ...styles.images }}
              image={step2}
              alt="Step 2 image"
            />
          </Box>

          <Box sx={{ ...styles.steps }}>
            <ListItem>
              <ListItemIcon>
                <ArrowForwardIcon />
              </ListItemIcon>
              <ListItemText
                primary="Step 3: Add to Home Screen"
                secondary="Scroll down until you find 'Add to Home Screen' and tap on it."
              />
            </ListItem>
            <CardMedia
              component="img"
              sx={{ ...styles.images }}
              image={step3}
              alt="Step 3 image"
            />
          </Box>

          <Box sx={{ ...styles.steps }}>
            <ListItem>
              <ListItemIcon>
                <ArrowForwardIcon />
              </ListItemIcon>
              <ListItemText
                primary="Step 4: Confirm"
                secondary="Confirm your choice and the app icon will appear on your home screen."
              />
            </ListItem>
            <CardMedia
              component="img"
              sx={{ ...styles.images }}
              image={step4}
              alt="Step 4 image"
            />
          </Box>
        </List>
        <Typography variant="h6" component="div" sx={{ ...styles.thankYou }}>
          Thank You!
        </Typography>
        <Typography variant="body1">
          You're all set to enjoy the app. If you have any questions or need
          further assistance, feel free to reach out to us. Have a great time
          using the app!
        </Typography>
      </CardContent>
    </Card>
  );
};

export default IOSInstall;
