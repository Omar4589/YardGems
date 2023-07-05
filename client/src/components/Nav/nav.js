// import * as React from "react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import Box from "@mui/material/Box";
// import BottomNavigation from "@mui/material/BottomNavigation";
// import BottomNavigationAction from "@mui/material/BottomNavigationAction";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
// import { Drawer, Typography, IconButton } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";

// export default function BottomNavBar() {
// 	const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
// 	const [value, setValue] = React.useState(pathname);
// 	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
// 	const handleChange = (event, newValue) => {
// 		setValue(newValue);
// 	};

// 	return (
// 		<>
// 			<Box sx={{ width: 750 }}>
// 				<BottomNavigation
// 					value={value}
// 					onChange={handleChange}
// 					showLabels={true}>
// 					<BottomNavigationAction
// 						label="Recents"
// 						icon={<FavoriteIcon />}
// 						to="/signup-login"
// 					/>
// 					<BottomNavigationAction
// 						label="Favorites"
// 						icon={<MapOutlinedIcon />}
// 					/>
// 					<IconButton
// 						size="large"
// 						edge="start"
// 						color="inherit"
// 						aria-label="logo"
// 						onClick={() => setIsDrawerOpen(true)}>
// 						<MenuIcon />
// 					</IconButton>
// 					<Drawer
// 						anchor="right"
// 						open={isDrawerOpen}
// 						onClose={() => setIsDrawerOpen(false)}>
// 						<Box p={2} width="250px" textAlign="center" role="presentation">
// 							<Typography variant="h6" component="div">
// 								Side Panel
// 							</Typography>
// 						</Box>
// 					</Drawer>
// 				</BottomNavigation>
// 			</Box>
// 		</>
// 	);
// }

//  Above is semi working code ^^^^^

import * as React from "react";
import { useState } from "react";
import Link from "@mui/material/Link";
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
import LoginIcon from '@mui/icons-material/Login';
import styles from './styles';

export default function BottomNavBar() {
	const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
	const [value, setValue] = React.useState(pathname);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<>
			<Box sx={{ width: "inherit", ...styles.icons}}>
				<BottomNavigation
					value={value}
					onChange={handleChange}
					showLabels={true}
          >
					<BottomNavigationAction
						label="Saved Listings"
            sx={{...styles.icons}}
						icon={<FavoriteIcon />}
						to="/signup-login"
					/>
					<BottomNavigationAction label="Home" icon={<MapOutlinedIcon />} 
           sx={{...styles.icons}}/>
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
              <Link 
                href="/signup-login" 
                color='inherit'
                sx= {{textDecoration: 'none'}}
                >
									<ListItem button>
										<ListItemIcon>
											<LoginIcon />
										</ListItemIcon>
										<ListItemText primary="Login" />
									</ListItem>
								</Link>

								<Link 
                href="/userdash" 
                color='inherit'
                sx= {{textDecoration: 'none'}}
                >
									<ListItem button>
										<ListItemIcon>
											<DashboardIcon />
										</ListItemIcon>
										<ListItemText primary="My Listings" />
									</ListItem>
								</Link>

                <Link 
                href="/" 
                // Need to fix this link to take you to all listings I think 
                color='inherit'
                sx= {{textDecoration: 'none'}}
                >
								<ListItem button>
									<ListItemIcon>
										<PostAddIcon />
									</ListItemIcon>
									<ListItemText primary="All Listings" />
								</ListItem>
                </Link>

                <Link 
                href="/" 
                color='inherit'
                sx= {{textDecoration: 'none'}}
                >
								<ListItem button>
									<ListItemIcon>
										<MapOutlinedIcon />
									</ListItemIcon>
									<ListItemText primary="Map" />
								</ListItem>
                </Link>

                <Link 
                href="/" 
                // Need to fix this to take you to account settings 
                color='inherit'
                sx= {{textDecoration: 'none'}}
                >
								<ListItem button>
									<ListItemIcon>
										<SettingsIcon />
									</ListItemIcon>
									<ListItemText primary="Account Settings" />
								</ListItem>
                </Link>
							</List>
						</Box>
					</Drawer>
				</BottomNavigation>
			</Box>
		</>
	);
}
