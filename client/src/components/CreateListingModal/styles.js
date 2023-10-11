const styles = {
  main: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    borderRadius: "1%",
    boxShadow: 6,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "80%",
    "@media (min-width: 780px)": {
      width: "50%",
    },
  },
  button: {
    textAlign: "end",
    marginLeft: "auto",
    background: "transparent",
    border: "0px ",
    fontSize: "1.2em",
    textColor: "black",
    cursor: "pointer",
    display: "block",
    padding: "0em 0em",
  },
  heading: {
    textAlign: "center",
    fontSize: "20px",
    "@media (min-width: 768px)": {
      fontSize: "25px",
    },
  },
  form: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    maxHeight: "90vh", // Add a maximum height to prevent excessive scrolling
    overflowY: "auto",
  },
  inputField: {
    width: "100%",
    minHeight: "3.6em",
    marginBottom: "1.5em",
    marginTop: "1em",
    fontSize: "1em",
  },
  inputBoxes: { py: 1 },
  labels: { fontWeight: "semibold", mb: 1, display: "block" },
  datePicker: { width: "100%", mt: 1 },
  uploadButton: {
    display: "flex",
    justifyContent: "center",
    width: "70%",
    marginBottom: "1.5em",
    marginTop: "1em",
    marginLeft: "auto",
    marginRight: "auto",
    bgcolor: "#66bb6a",
  },
  addButton: {
    display: "flex",
    justifyContent: "center",
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    bgcolor: "#66bb6a",
  },
};

export default styles;
