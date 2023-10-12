<div className="places-container">
  {/* will render out a placed based on the selection */}
  {/* <PlacesAutocomplete setSelected={setSelected} setCenter={setCenter} /> */}
</div>;
{
  allListings.map(
    (
      {
        _id,
        author,
        lat,
        lng,
        title,
        description,
        images,
        address,
        dateOfSale,
      },
      index
    ) => {
      const listing = {
        _id,
        author,
        lat,
        lng,
        title,
        description,
        images,
        address,
        dateOfSale,
      };

      return (
        <MarkerF
          key={_id}
          position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
          onClick={() => handleActiveMarker(_id)}
          icon={{
            url: gem,
          }}
        >
          {activeMarker === _id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <Box>
                <Button
                  onClick={() => openModal(listing)}
                  sx={{ ...styles.viewListing }}
                >
                  View Listing
                </Button>
                <Typography variant="h5" sx={{ ...styles.text }}>
                  {title}
                </Typography>
                <Typography variant="body2" sx={{ ...styles.text }}>
                  {description}
                </Typography>
                <Typography variant="body4" sx={{ ...styles.text }}>
                  {address}
                </Typography>
                <Typography variant="body4" sx={{ ...styles.text }}>
                  Date of event: {dateOfSale}
                </Typography>
                <Box sx={{ ...styles.imageContainer }}>
                  {images.map((imageURL, imgIndex) => (
                    <CardMedia
                      component="img"
                      image={imageURL}
                      key={imgIndex}
                      alt={`${title}-${imgIndex}`}
                      sx={{ height: "6em", width: "6em" }}
                    />
                  ))}
                </Box>
              </Box>
            </InfoWindow>
          ) : null}
        </MarkerF>
      );
    }
  );
}
{
  selected && <MarkerF position={selected} />;
}

{
  listingModal && (
    <ListingModalComponent
      listingModal={listingModal}
      closeModal={closeModal}
      image={image}
    />
  );
}

//Fetch user's current location if available
// useEffect(() => {
//   let isMounted = true;

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           if (isMounted) {
//             // Check if the component is still mounted
//             const { latitude, longitude } = position.coords;
//             setCenter({ lat: latitude, lng: longitude });
//           }
//         },
//         (error) => {
//           if (isMounted) {
//             // Check if the component is still mounted
//             console.error("Error getting current location:", error);
//           }
//         }
//       );
//     } else {
//       if (isMounted) {
//         // Check if the component is still mounted
//         console.error("Geolocation is not supported by this browser.");
//       }
//     }
//   };
//   getCurrentLocation();

//   return () => {
//     isMounted = false; // Cleanup: set flag to false when component unmounts
//   };
// }, []);

// Fetch listing data using Apollo useQuery

// State to manage active marker for InfoWindow display

const openModal = (listing) => setListingModal(listing);
const closeModal = () => setListingModal(false);
const handleActiveMarker = (markerId) => {
  if (markerId === activeMarker) {
    return;
  }
  setActiveMarker(markerId);
};
