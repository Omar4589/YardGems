const styles = {
  mainContainer: {
    width: "100%",
    height: "100%",
    "@media (min-width: 768px)": {
      display: "flex",
      justifyContent: "center",
    },
  },
  map: {
    height: "100%",
    width: "100%",
    "@media (min-width: 768px)": { width: "50%" },
  },
  listings: {
    width: "100%",
    "@media (min-width: 768px)": {
      marginBottom: "0em",
      width: "50%",
    },
  },
  button: {
    position: "absolute",
    zIndex: "100",
    right: "2em",
    top: "6em",
    bgcolor: "#ffffff",
    color:"#666666",
    "&:hover": {
      bgcolor: "#ffffff",
    }
  },
};

export default styles;
