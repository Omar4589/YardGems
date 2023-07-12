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
  signupContainer: {
    background: "white",
    mx: 3,
    px: 4,
    borderRadius: 2,
    "@media (min-width: 768px)": { maxWidth: "30%" },
  },
  appName: { py: 2, px: 2 },
  heading: { fontWeight: "bold", fontSize: 25, mb: 1 },
  form: {},
  inputBoxes: { py: 1 },
  labels: { fontWeight: "semibold", mb: 1, display: "block" },
  button: { bgcolor: "#66bb6a", color: "white", fontWeight: "semibold", py: 1 },
  login: { my: 3, textAlign: "center" },
  loginButton: {
    color: "#66bb6a",
    margin: 10,
    p: 1,
    "&:hover": {
      color: "#66bb6a",
    },
  },
};

export default styles;
