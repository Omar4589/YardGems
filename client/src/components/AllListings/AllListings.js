import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";
import {
	Container,
	Card,
	CardMedia,
	Typography,
	CardContent,
	CardHeader,
	Grid,
	CardActionArea,
	Modal,
	Box,
	IconButton,
	Icon,
} from "@mui/material";
// import {FormModal} from '../DashboardModal/DashboardModal'
import image from "../../assets/yardsale.jpg"; // hard coding for now
// import Auth from '../utils/auth'
// import { Link } from 'react-router-dom';
import styles from "./styles";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AllListings = () => {
	const { data } = useQuery(QUERY_POSTS);
	const AllListingsData = data?.allPost || [];

	const [open, setOpen] = React.useState(false);
	// const handleOpen = () => setOpen(true);
	// const handleClose = () => setOpen(false);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};
	const handleCloseModal = () => {
		setIsModalOpen(false);
		window.location.reload(); // refresh the page after a new listing is made
	};

	return (
		<>
			<Container sx={{ maxHeight: "100vh", overflow: "auto" }}>
				<Grid container spacing={2}>
					{AllListingsData.map((post) => {
						return (
							<Grid key={post._id} item xs={12} sm={10} md={6}>
								<Card component="div" sx={{ maxWidth: 345 }}>
									<CardActionArea onClick={handleOpenModal}>
										<CardHeader title={post.postName} />
										<CardMedia
											sx={{ height: 140, paddingTop: "56.2%" }}
											image={image}
											title="green iguana"
										/>
										<CardContent component="div">
											<Typography component="span" gutterBottom variant="h5">
												Date Of Event: {post.dateOfSale}
											</Typography>
											<Typography
												component="div"
												variant="body2"
												color="text.secondary">
												{post.description}
												<Typography
													component="div"
													variant="body2"
													color="text.secondary">
													<br></br>
													{post.address}
												</Typography>
											</Typography>
										</CardContent>
										{/* <Button onClick={handleOpen}>View Listing</Button> */}
										<Modal
											open={isModalOpen}
											onClose={handleCloseModal}
											componentsProps={{
												backdrop: { style: { backgroundColor: "transparent"} },
											}}
											aria-labelledby="modal-modal-title"
											aria-describedby="modal-modal-description">
											<Box sx={{ ...styles.modalPopUp }}>
												<CardHeader
													title={post.postName}
													subheader={post.createdAt}
												/>
												<CardMedia
													sx={{ height: 140, paddingTop: "56.2%" }}
													image={image}
													title="green iguana"
												/>
												<CardContent component="div">
													<Typography
														component="span"
														gutterBottom
														variant="h5">
														Date Of Event: {post.dateOfSale}
													</Typography>
													<Typography
														component="div"
														variant="body2"
														color="text.secondary">
														{post.postDescription}
														<Typography
															component="div"
															variant="body2"
															color="text.secondary">
														 {post.address}
														</Typography>
													</Typography>
												</CardContent>
											</Box>
										</Modal>
									</CardActionArea>
								</Card>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</>
	);
};

export default AllListings;
