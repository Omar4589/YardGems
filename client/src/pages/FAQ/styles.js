const styles = {
  mainContainer: {
    mx: "auto",
    px: 3,
    py: 5,
    backgroundColor: "#e8f5e9",
    "@media (min-width: 768px)": { padding: "5% 8% 5% 8%" },
  },
  header: { display: "flex" },
  contextBox: {
    mb:10,
    "@media (min-width: 768px)": { display: "flex" },
  },

  nav: {
    display: "flex",
    mb:8,
    flexDirection: "column",
    "@media (min-width: 768px)": { width: "50%" },
  },
  faq: { mt:0 ,"@media (min-width: 768px)": { width: "50%" } },

  tobHeading: { mb: 3, fontSize: 30, textAlign: "center" },

  section: {
    fontSize: 20,
    textDecoration: "none",
    textAlign: "center",
    mb: 2,
    mt: 2,
  },
  link: { my: 0.5 },
  heading: { fontSize: 25, my: 1, textAlign: "center" },
  question: { my: 1, fontWeight: "bold" },
};

export default styles;
