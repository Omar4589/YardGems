const styles = {
  mainContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "white",
    color: "#24CF6B",
    padding: "10px 5px 10px 5px",
    fontFamily: "'Roboto', sans-serif", // Add this line to set the font

    "@media (min-width: 768px)": {
      justifyContent: "space-between",
      padding: "5px 50px 15px 50px",
      height: "70px",
    },
  },
  appLogobox: {
    width: "100%",

    "@media (min-width: 768px)": {
      width: "25%",
      paddingRight: 0,
    },
  },
  appLogo: {
    width: "80%",
    "@media (min-width: 768px)": {
      width: "100%",
    },
  },
  logoLink: {
    textDecoration: "none",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    "@media (min-width: 768px)": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  box: {
    display: "none",
    "@media (min-width: 768px)": {
      width: "33.33%",
      display: "flex",
      justifyContent: "space-around",
    },
  },

  searchIcon: {
    fontSize: 30,
    "@media (min-width: 768px)": {
      display: "none",
    },
  },
  searchField: { padding: "5% 0% 0% 0%" },
  messagesIcon: {
    fontSize: 30,
    ml: 1,
    "@media (min-width: 768px)": {
      display: "none",
    },
  },
  signUpLoginLink: {
    display: "none",
    "@media (min-width: 768px)": {
      display: "inline",
      mr: 1,
      color: "#2a2a35f2",
      textDecoration: "none",
      padding: "5px 10px",
      borderRadius: "10px",
      fontSize: "19px",
      "&:hover": {
        color: "#66bb6a",
      },
    },
  },
  myListingsLink: {
    display: "none",
    "@media (min-width: 768px)": {
      display: "inline",
      mr: 1,
      color: "#2a2a35f2",
      textDecoration: "none",
      padding: "5px 10px",
      borderRadius: "10px",
      fontSize: "19px",
      "&:hover": {
        color: "#66bb6a",
      },
    },
  },
  savedListingLink: {
    display: "none",
    "@media (min-width: 768px)": {
      display: "inline",
      mr: 1,
      color: "#2a2a35f2",
      textDecoration: "none",
      padding: "5px 10px",
      borderRadius: "10px",
      fontSize: "19px",
      "&:hover": {
        color: "#66bb6a",
      },
    },
  },
  myAccountLink: {
    display: "none",
    "@media (min-width: 768px)": {
      display: "inline",
      mr: 1,
      color: "#2a2a35f2",
      textDecoration: "none",
      padding: "5px 10px",
      borderRadius: "10px",
      fontSize: "19px",
      "&:hover": {
        color: "#66bb6a",
      },
    },
  },
  homeLink: {
    display: "none",
    "@media (min-width: 768px)": {
      display: "inline",
      mr: 1,
      color: "#2a2a35f2",
      textDecoration: "none",
      padding: "5px 10px",
      borderRadius: "10px",
      fontSize: "19px",
      "&:hover": {
        color: "#66bb6a",
      },
    },
  },
  logoutLink: {
    display: "none",
    "@media (min-width: 768px)": {
      display: "inline",
      mr: 1,
      color: "#2a2a35f2",
      textDecoration: "none",
      padding: "5px 10px",
      borderRadius: "10px",
      fontSize: "19px",
      "&:hover": {
        color: "#66bb6a",
      },
    },
  },
  snackAlert: {
    boxShadow: "0em 0em .5em black",
    borderRadius: 1,
    bgcolor: "#ffffff",
  },
};

export default styles;
