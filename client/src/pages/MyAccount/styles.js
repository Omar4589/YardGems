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
  myaccountContainer: {
    background: "white",
    width: "75%",
    px: 4,
    py: 8,
    borderRadius: 2,
    "@media (min-width: 768px)": { maxWidth: "30%" },
  },
  heading: { fontWeight: "bold", fontSize: 25, mb: 1 },
  labels: { fontWeight: "semibold", mb: 1, display: "block" },
  form: {},
  email: { mb: 2 },
  button: { bgcolor: "#66bb6a", color: "white", fontWeight: "semibold", py: 1 },
  snackAlert: {
    boxShadow: "0em 0em .5em black",
    borderRadius: 1,
    bgcolor: "#ffffff",
  },
};

export default styles;
