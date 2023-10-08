const styles = {
  mainContainer: {
    background: "#e8f5e9",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    "@media (min-width: 768px)": { maxWidth: "100%" },
  },
  editListingContainer: {
    width: "75%",
    background: "white",
    px: 4,
    borderRadius: 2,
    "@media (min-width: 768px)": { width: "30%" },
  },
  heading: { fontWeight: "bold", fontSize: 25, mt: 3, mb: 1, py: 2, px: 2 },
  inputBoxes: {
    py: 1,
    "@media (min-width: 768px)": {
      py: 3,
    },
  },
  labels: {
    fontWeight: "semibold",
    mb: 1,
    display: "block",
    "@media (min-width: 768px)": {
      fontSize: "1.2em",
    },
  },
  button: {
    bgcolor: "#66bb6a",
    color: "white",
    fontWeight: "semibold",
    py: 1,
    mb: 5,
  },
  datePicker: { width: "100%", mt: 1 },
};

export default styles;
