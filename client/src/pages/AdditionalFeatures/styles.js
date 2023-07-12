const styles = {
  mainContainer: {
    backgroundColor: "#e8f5e9",
    textAlign: "center",
    paddingBottom: 15,
    fontFamily: "'Roboto', sans-serif",
    "@media (min-width: 768px)": {},
  },
  heading: { mx: "auto", padding: "10% 0% 0% 0%", fontSize: 25, "@media (min-width: 768px)": {padding: "4% 0% 0% 0%"}, },

  featuresContainer: { "@media (min-width: 768px)": { 
    display:"flex",

    }},
  feature: {
    display: "flex",
   
    flexDirection: "column",
    borderRadius: "5px",
    backgroundColor: "white",
    py: 4,
    px: 8,
    textAlign: "center",
    mx: "auto",
    width: "50%",
    my: 5,
    "@media (min-width: 768px)": { 
    width: "20%",
  
    },
  },
  img: { mx: "auto" },
  typography: { fontSize: 20, pt: 2 },
};

export default styles;
