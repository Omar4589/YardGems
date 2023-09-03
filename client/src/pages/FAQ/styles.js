const styles = {
  mainContainer: {
    mx: "auto",
    px: 3,
    py: 5,
    backgroundColor: "#e8f5e9",
    "@media (min-width: 768px)": { padding: "3% 2% 5% 2%" },
  },
  contextBox: {
    mb: 10,
    "@media (min-width: 768px)": {},
  },

  nav: {
    display: "flex",
    mb: 8,
    flexDirection: "column",
    "@media (min-width: 768px)": {
      flexDirection: "row",
      flexWrap: "wrap",
    },
  },
  section: { "@media (min-width: 768px)": { width: "33%", py: 3 } },

  sectionTitle: {
    fontSize: 25,
    textDecoration: "none",
    textAlign: "center",
    mb: 2,
    mt: 2,
    mx: "auto",
    color: "inherit",
    "&:hover": {
      color: "#24CF6B",
    },
    "@media (min-width: 768px)": {
      fontSize: 30,
      display: "block",
      height: "20%",
      width: "100%",
    },
  },
  link: {
    my: 0.5,
    mr: "auto",

    "&:hover": {
      color: "#24CF6B",
    },
    "@media (min-width: 768px)": {
      mx: "auto",
      py: 0.5,
      textAlign: "center",
      fontSize: 20,
    },
  },
  faq: { mt: 0, "@media (min-width: 768px)": {} },

  tobHeading: {
    mb: 2,
    fontSize: 30,
    textAlign: "center",
    "@media (min-width: 768px)": { fontSize: 40 },
  },

  heading: {
    fontSize: 25,
    my: 1,
    textAlign: "center",
    "@media (min-width: 768px)": { fontSize: 30, mt: 4 },
  },
  question: {
    my: 1,
    fontWeight: "bold",
    "@media (min-width: 768px)": { fontSize: 20 },
  },
};

export default styles;
