//---------------------------IMPORTS--------------------------------//
import React from "react";
import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardHeader,
  Modal,
  Box,
} from "@mui/material";
import { styles } from "./styles";

//This is the modal that appears when a user clicks on a listing from the AllListingsComponent in the Home page

//----------------------START OF COMPONENT----------------------------//
export default function ListingModalComponent({
  listingModal,
  closeModal,
  image,
}) {
  return (
    <Modal
      open={Boolean(listingModal)}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.modalPopUp}>
        <Card component="div" sx={{ maxWidth: "100%" }}>
          <CardHeader
            title={listingModal.title}
            subheader={`Post By: ${listingModal.author}`}
          />
          <CardMedia sx={{ height: 140, paddingTop: "56.2%" }} image={image} />
          <CardContent component="div">
            <Typography component="span" gutterBottom variant="h5">
              Date Of Event: {listingModal.dateOfSale}
            </Typography>
            <Typography component="div" variant="body2" color="text.secondary">
              {listingModal.description}
              <Typography
                component="div"
                variant="body2"
                color="text.secondary"
              >
                <br></br>
                {listingModal.address}
              </Typography>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
}
