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
  loginContainer: { background: "white", mx: 3, px: 4, borderRadius: 2, "@media (min-width: 768px)": { maxWidth: "30%" }, },
  appName: { py: 2, px: 2 },
  labels: { fontWeight: "semibold", mb: 1, display: "block" },

  heading: { fontWeight: "bold", fontSize: 25, mb: 1 },
  form: {},
  email: {mb:2},
  button: { bgcolor: "#66bb6a", color: "white", fontWeight: "semibold", py: 1 },
  happyHunting: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    py: 3,
    
  },
};

export default styles;
