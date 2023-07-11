const styles = {
  mainContainer: {
    mx: "auto",
    px: 3,
    paddingTop: 5,
    paddingBottom: 15,
    backgroundColor: "#e8f5e9",
    fontFamily: "'Roboto', sans-serif", // Add this line to set the font
    "@media (min-width: 768px)": { padding: "5% 20% 10% 20%" },
  },
  heading: { mb: 2, fontSize: 35, fontWeight: "semi-bold" },
  statement: { mb: 2, fontSize: 20 },
  fieldContainers: { mb: 2 },
  labels: { fontSize: 20 },
  inputFields: {
    backgroundColor: "white",
  },
  button: {
    width: "10nom0%",
    marginTop: 2,

    py: 2,
    borderRadius: 2,
    backgroundColor: "#66bb6a",
    "@media (min-width: 768px)": {
      width: "25%",
      marginTop: 2,
      marginLeft: "75%",
    },
  },
};

export default styles;
