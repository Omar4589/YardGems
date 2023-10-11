const styles = {
  mainContainer: {
    width: "100%",
    height:"100%",
    "@media (min-width: 768px)": {
      display: "flex",
      justifyContent: "center",
    },
  },
  map: {
    height:"100%",
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
};

export default styles;
