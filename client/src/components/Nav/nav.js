import * as React from "react";
import { useState, useEffect } from "react";
import { Link as MuiLink } from "@mui/material";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LoginIcon from "@mui/icons-material/Login";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import styles from "./styles";

export default function BottomNavBar() {
	const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
	const [value, setValue] = React.useState(pathname);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const handleChange = (event, newValue) => {
		setValue(newValue);
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
		<>
			<Box className="navMobile" sx={{ width: "inherit", ...styles.icons }}>
				<BottomNavigation
					value={value}
					onChange={handleChange}
				>
					<BottomNavigationAction
						component="a"
						href="/signup-login"
						// Need to change this to saved listings
						label="Saved Listings"
						sx={{ ...styles.icons }}
						icon={<FavoriteIcon />}
					/>
					<BottomNavigationAction
						component="a"
						href="/"
						label="Home"
						icon={<MapOutlinedIcon />}
						sx={{ ...styles.icons }}
					/>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="logo"
						onClick={() => setIsDrawerOpen(true)}>
						<MenuIcon />
					</IconButton>
					<Drawer
						anchor="right"
						open={isDrawerOpen}
						onClose={() => setIsDrawerOpen(false)}>
						<Box p={2} width="250px" textAlign="center" role="presentation">
							<List>
								<MuiLink
									href="/signup-login"
									color="inherit"
									sx={{ textDecoration: "none" }}>
									<ListItem button>
										<ListItemIcon>
											<LoginIcon />
										</ListItemIcon>
										<ListItemText primary="Login" />
									</ListItem>
								</MuiLink>
								<MuiLink
									href="/MyListings"
									color="inherit"
									sx={{ textDecoration: "none" }}>
									<ListItem button>
										<ListItemIcon>
											<DashboardIcon />
										</ListItemIcon>
										<ListItemText primary="My Listings" />
									</ListItem>
								</MuiLink>
								<MuiLink
									href="/"
									// Need to fix this link to take you to all listings I think
									color="inherit"
									sx={{ textDecoration: "none" }}>
									<ListItem button>
										<ListItemIcon>
											<PostAddIcon />
										</ListItemIcon>
										<ListItemText primary="All Listings" />
									</ListItem>
								</MuiLink>
								<MuiLink
									href="/"
									color="inherit"
									sx={{ textDecoration: "none" }}>
									<ListItem button>
										<ListItemIcon>
											<MapOutlinedIcon />
										</ListItemIcon>
										<ListItemText primary="Map" />
									</ListItem>
								</MuiLink>
								<MuiLink
									href="/"
									// Need to fix this to take you to account settings
									color="inherit"
									sx={{ textDecoration: "none" }}>
									<ListItem button>
										<ListItemIcon>
											<SettingsIcon />
										</ListItemIcon>
										<ListItemText primary="Account Settings" />
									</ListItem>
								</MuiLink>
								<MuiLink
									href="/"
									color="inherit"
									sx={{ textDecoration: "none" }}>
									<ListItem button>
										<ListItemIcon>
											<DarkModeIcon />
										</ListItemIcon>
										<ListItemText primary="Theme Switcher" />
									</ListItem>
								</MuiLink>
							</List>
						</Box>
					</Drawer>
				</BottomNavigation>
			</Box>
		</>
	);
}
