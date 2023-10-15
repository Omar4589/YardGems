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
  loginContainer: {
    background: "white",
    mx: 3,
    px: 4,
    borderRadius: 2,
    "@media (min-width: 768px)": { maxWidth: "30%" },
  },
  appName: { py: 2, px: 2 },
  labels: { fontWeight: "semibold", mb: 1, display: "block" },

  heading: { fontWeight: "bold", fontSize: 25, mb: 1 },
  form: {},
  email: { mb: 2 },
  button: { bgcolor: "#66bb6a", color: "white", fontWeight: "semibold", py: 1 },
  happyHunting: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    pb: 3,
  },
  snackAlert: {
    boxShadow: "0em 0em .5em black",
    borderRadius: 1,
    bgcolor: "#ffffff",
  },
  signup: { mt: 3, textAlign: "center" },
  signupButton: {
    color: "#66bb6a",
    margin: 10,
    p: 1,
    "&:hover": {
      color: "#66bb6a",
    },
  },
};

export default styles;
