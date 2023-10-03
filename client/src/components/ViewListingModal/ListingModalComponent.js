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
import styles from "./styles";
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
      id="listing-modal-container"
      open={Boolean(listingModal)}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box id="listing-modal" sx={{ ...styles.modalPopUp }}>
        <button
          onClick={closeModal}
          style={{
            position: "absolute",
            top: "3%",
            left: "90%",
            background: "transparent",
            border: "0px ",
            fontSize: "1.2em",
            textColor:"black",
            cursor:"pointer"
          }}
        >
          X
        </button>
        <Card
          component="div"
          sx={{
            maxWidth: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <CardHeader
            title={listingModal.title}
            subheader={`Post By: ${listingModal.author}`}
          />
          <Slider {...settings} style={{ width: "100%", height:"100%" }}>
            {/* First we check if the array 'images' is empty, if it is, we use the default hardcoded image */}
            {listingModal.images.length > 0 ? (
              listingModal.images.map((url, index) => (
                <div
                  key={index}
                  style={{
                    width: "100%"
                  }}
                >
                  <img
                    src={url}
                    alt={`slide-${index}`}
                    style={{
                      maxHeight: "484px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      maxWidth: "100%",
                    }}
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
            <Typography component="span" gutterBottom variant="body2">
              Date Of Sale: {listingModal.dateOfSale}
            </Typography>
            <Typography component="div" variant="h5" >
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
