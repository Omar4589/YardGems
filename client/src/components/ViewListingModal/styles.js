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
    overflowX: "hidden",
    maxHeight: "100vh",
    "@media (min-width: 768px)": {
      width: "900px",
    },
  },
  card: {},
  button: {
    textAlign: "end",
    marginLeft:"auto",
    background: "transparent",
    border: "0px ",
    fontSize: "1.2em",
    textColor: "black",
    cursor: "pointer",
    display: "block",
    padding:"1em"
  },
  img: {
    maxHeight: "30.25em",
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
