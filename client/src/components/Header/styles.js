const styles = {
  mainContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "white",
    color: "#24CF6B",
    padding: "0px 20px 0px 20px",
    "@media (min-width: 768px)": {
      justifyContent: "space-between",
      padding: "0px 50px 0px 50px",
    },
  },
  appLogo: { width: "25%" },
  logoLink: {
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    mx: 1,
    "@media (min-width: 768px)": {
      display: "none",
    },
  },
  messagesIcon: {
    mx: 1,
    "@media (min-width: 768px)": {
      display: "none",
    },
  },
  signUpLoginLink: {
    mr: 1,
    color: "#2a2a35f2",
    textDecoration: "none",
    padding: "5px 10px",
    borderRadius: "10px",
    "&:hover": {
      color: "#66bb6a",
    },
  },
};

export default styles;
