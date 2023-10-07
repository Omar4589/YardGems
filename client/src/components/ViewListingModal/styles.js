const styles = {
  modalPopUp: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    borderRadius: "1%",
    boxShadow: 6,
    padding: 0,
    overflowY: "auto",
    maxHeight: "100vh",
    "@media (min-width: 768px)": {
      width: "900px",
    },
  },
  card: {},
  button: {
    position: "absolute",
    top: "3%",
    left: "90%",
    background: "transparent",
    border: "0px ",
    fontSize: "1.2em",
    textColor: "black",
    cursor: "pointer",
  },
  img: {
    maxHeight: "484px",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "100%",
  },
  date: {
    marginTop: "15px",
  },
  description: {
    padding: "10px 0px",
  },
};

export default styles;
