import * as React from "react";
import { useState } from "react";
import {Link as MuiLink} from "@mui/material";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { List, ListItem, ListItemIcon, ListItemText, } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LoginIcon from "@mui/icons-material/Login";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import styles from "./styles";


export default function BottomNavBar() {
	const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
	const [value, setValue] = React.useState(pathname);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<>
			<Box className='navMobile' sx={{ width: "inherit", ...styles.icons }}>
				<BottomNavigation
					value={value}
					onChange={handleChange}
					showLabels={true}>
            <MuiLink href='/'>
					<BottomNavigationAction
            // Need to change this to saved listings 
						label="Saved Listings"
						sx={{ ...styles.icons }}
						icon={<FavoriteIcon />}
					/>
          </MuiLink>
          <MuiLink href='/'>
					<BottomNavigationAction
						label="Home"
						icon={<MapOutlinedIcon />}
						sx={{ ...styles.icons }}
					/>
          </MuiLink>
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
									href="/userdash"
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

								<MuiLink href="/" color="inherit" sx={{ textDecoration: "none" }}>
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

                <MuiLink href="/" color="inherit" sx={{ textDecoration: "none" }}>
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
