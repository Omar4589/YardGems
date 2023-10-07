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
            ...styles.button,
          }}
        >
          X
        </button>
        <Card
          component="div"
          sx={{
            ...styles.card,
          }}
        >
          <CardHeader
            title={listingModal.title}
            subheader={`Listed By: ${listingModal.author}`}
          />
          <Slider {...settings}>
            {/* First we check if the array 'images' is empty, if it is, we use the default hardcoded image */}
            {listingModal.images.length > 0 ? (
              listingModal.images.map((url, index) => (
                <div key={index} style={{}}>
                  <img
                    src={url}
                    alt={`slide-${index}`}
                    style={{
                      ...styles.img,
                    }}
                  />
                </div>
              ))
            ) : (
              <div>
                <img
                  src={image}
                  alt="Default slide"
                  style={{ ...styles.img }}
                />
              </div>
            )}
          </Slider>
          <CardContent component="div">
            <Typography sx={{ ...styles.date }}>
              Date Of Sale: {listingModal.dateOfSale}
            </Typography>
            <Typography variant="h5" style={{ ...styles.description }}>
              {listingModal.description}dafa dfsa fdasf adsfasdfadsfa dfda
              dsaafdssdfasdf sad fasds adfasd fasdf dssdfasdf sad fasds adfasd
              fasdf asdfasdfdsfadf a dfsdf sdasfd fsdfsadfdsf saf sdf asd
              sdfasdfasdf adsfasdfasd fasd fasdf dssdfasdf sad fasds adfasd
              fasdf dssdfasdf sad fasds adfasd fasdf
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {listingModal.address}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
}
