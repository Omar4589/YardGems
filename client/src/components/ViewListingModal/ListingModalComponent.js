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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// settings for react-slick's Slider component
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

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
         <Slider {...settings}>
                        {/* First we check if the array 'images' is empty, if it is, we use the default hardcoded image */}
                        {listingModal.images.length > 0 ? (
                          listingModal.images.map((url, index) => (
                            <div key={index}>
                              <img
                                src={url}
                                alt={`slide-${index}`}
                                style={{ width: "100%" }}
                              />
                            </div>
                          ))
                        ) : (
                          <div>
                            <img
                              src={image}
                              alt="Default slide"
                              style={{ width: "100%" }}
                            />
                          </div>
                        )}
                      </Slider>
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
