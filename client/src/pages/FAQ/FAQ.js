import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "./styles";

const FAQ = () => {
  return (
    <Box sx={{ ...styles.mainContainer }}>
      <Box sx={{ ...styles.contextBox }}>
        <Typography sx={{ ...styles.tobHeading }}>Table of Contents</Typography>
        <Box sx={{ ...styles.nav }}>
          <Box sx={{ ...styles.section }}>
            <Typography
              component="a"
              href="#accessandsignup"
              color="inherit"
              sx={{ ...styles.sectionTitle }}
            >
              Access and Sign Up
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <Typography
                component="a"
                href="#isyardgemsfree"
                sx={{ ...styles.link }}
              >
                Is YardGems free to use?
              </Typography>
              <Typography
                component="a"
                href="#doineedtoentercreditcard"
                sx={{ ...styles.link }}
              >
                Do I need to enter my credit card info?
              </Typography>
              <Typography
                component="a"
                href="#doineedtosignup"
                sx={{ ...styles.link }}
              >
                Do I need to sign up to view listings?
              </Typography>
              <Typography
                component="a"
                href="#whatadditionalfeatures"
                sx={{ ...styles.link }}
              >
                What additional features do I get by signing up?
              </Typography>
              <Typography
                component="a"
                href="#howdoisignup"
                sx={{ ...styles.link }}
              >
                {" "}
                How do I sign up for YardGems?
              </Typography>
            </Box>
          </Box>

          <Box sx={{ ...styles.section }}>
            {" "}
            <Typography
              component="a"
              href="#navigationandinterface"
              sx={{ ...styles.sectionTitle }}
            >
              {" "}
              Navigation and Interface{" "}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <Typography
                component="a"
                href="#howdoinavigate"
                sx={{ ...styles.link }}
              >
                How do I navigate the site?
              </Typography>
              <Typography
                component="a"
                href="#whydoesthenavigationchange"
                sx={{ ...styles.link }}
              >
                Why does the navigation change on mobile devices?
              </Typography>
            </Box>
          </Box>

          <Box sx={{ ...styles.section }}>
            <Typography
              component="a"
              href="#creatingandmanaginglistings"
              sx={{ ...styles.sectionTitle }}
            >
              Creating and Managing Listings{" "}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <Typography
                component="a"
                href="#howdoicreateanewlisting"
                sx={{ ...styles.link }}
              >
                {" "}
                How do I create a new listing?
              </Typography>
              <Typography
                component="a"
                href="#canieditalisting"
                sx={{ ...styles.link }}
              >
                {" "}
                Can I edit or delete a listing after creating it?{" "}
              </Typography>
              <Typography
                component="a"
                href="#howdoisavealisting"
                sx={{ ...styles.link }}
              >
                How do I save a listing as a favorite?{" "}
              </Typography>
              <Typography
                component="a"
                href="#howdoiremoveasavedlisting"
                sx={{ ...styles.link }}
              >
              
                How do I remove a saved listing from my favorites?
              </Typography>
            </Box>
          </Box>

          <Box sx={{ ...styles.section }}>
         
            <Typography
              component="a"
              href="#accountmanagement"
              sx={{ ...styles.sectionTitle }}
            >
              {" "}
              Account Management{" "}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <Typography
                component="a"
                href="#howcaniupdatemyusername"
                sx={{ ...styles.link }}
              >
                How can I update my username?
              </Typography>
            </Box>
          </Box>

          <Box sx={{ ...styles.section }}>
            <Typography
              component="a"
              href="#googlemapsintegration"
              sx={{ ...styles.sectionTitle }}
            >
              {" "}
              Google Maps Integration
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <Typography
                component="a"
                href="#howarelistingsrepresentedonthemap"
                sx={{ ...styles.link }}
              >
                {" "}
                How are listings represented on the map?
              </Typography>
              <Typography
                component="a"
                href="#canisearchforlistingsinmap"
                sx={{ ...styles.link }}
              >
                {" "}
                Can I search for listings in specific areas on the map?
              </Typography>
            </Box>
          </Box>
          <Box sx={{ ...styles.section }}>
            {" "}
            <Typography
              component="a"
              href="#support"
              sx={{ ...styles.sectionTitle }}
            >
              Support
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <Typography
                component="a"
                href="#reportissue"
                sx={{ ...styles.link }}
              >
                How do I report an issue?
              </Typography>
              <Typography
                component="a"
                href="#contactadmin"
                sx={{ ...styles.link }}
              >
                How do I contact an administrator?
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ ...styles.faq }}>
          <Typography sx={{ ...styles.tobHeading }}>
            Frequently Asked Questions
          </Typography>

          <Typography id="accessandsignup" sx={{ ...styles.heading }}>
            Access and Sign Up
          </Typography>
          <Typography id="isyardgemsfree">
            {" "}
            <Typography sx={{ ...styles.question }}>
              {" "}
              Is YardGems free to use?{" "}
            </Typography>
            Yes, YardGems is completely free to use. There are no subscription
            fees or charges for accessing the platform.
          </Typography>
          <Typography id="doineedtoentercreditcard">
            <Typography sx={{ ...styles.question }}>
              {" "}
              Do I need to enter my credit card info?
            </Typography>
            No, you do not need to enter your credit card information to use
            YardGems. Our service is entirely free, and we do not require any
            payment details.
          </Typography>
          <Typography id="doineedtosignup">
            {" "}
            <Typography sx={{ ...styles.question }}>
              Do I need to sign up to view listings?
            </Typography>{" "}
            No, you can view all available listings without signing up. We
            believe in making the browsing experience as easy and accessible as
            possible.
          </Typography>
          <Typography id="whatadditionalfeatures">
            {" "}
            <Typography sx={{ ...styles.question }}>
              {" "}
              What additional features do I get by signing up?{" "}
            </Typography>{" "}
            By signing up for YardGems, you gain access to additional features
            such as the ability to create listings, update them, and save
            listings as favorites for quicker access.
          </Typography>
          <Typography id="howdoisignup">
            {" "}
            <Typography sx={{ ...styles.question }}>
              How do I sign up for YardGems?{" "}
            </Typography>{" "}
            To sign up for YardGems, click on the "Sign Up" in the header or
            bottom nav menu, and follow the simple registration process. It's
            quick and easy to get started.
          </Typography>
          <Typography id="navigationandinterface" sx={{ ...styles.heading }}>
            {" "}
            Navigation and Interface
          </Typography>
          <Typography id="howdoinavigate">
            {" "}
            <Typography sx={{ ...styles.question }}>
              {" "}
              How do I navigate the site?{" "}
            </Typography>
            Navigating YardGems is straightforward. You can explore listings on
            the homepage, and use the header or bottom navigation links to
            access different sections of the platform.
          </Typography>
          <Typography id="whydoesthenavigationchange">
            {" "}
            <Typography sx={{ ...styles.question }}>
              {" "}
              Why does the navigation change on mobile devices?
            </Typography>
            To enhance your experience on smaller screens, like mobile devices,
            we've optimized the navigation. The links move to the bottom,
            similar to popular mobile app interfaces, for easier access.
          </Typography>
          <Typography
            id="creatingandmanaginglistings"
            sx={{ ...styles.heading }}
          >
            {" "}
            Creating and Managing Listings
          </Typography>
          <Typography id="howdoicreateanewlisting">
            {" "}
            <Typography sx={{ ...styles.question }}>
              How do I create a new listing?{" "}
            </Typography>
            After signing in, visit the "My Listings" page and click the "Create
            New Listing" button. Fill out the form, and submit your listing to
            share it with the community.
          </Typography>
          <Typography id="canieditalisting">
            <Typography sx={{ ...styles.question }}>
              {" "}
              Can I edit or delete a listing after creating it?{" "}
            </Typography>
            Yes, you can edit a listing by clicking the "Edit" button on the "My
            Listings" page. To delete a listing, simply use the "Delete" button.
          </Typography>
          <Typography id="howdoisavealisting">
            {" "}
            <Typography sx={{ ...styles.question }}>
              {" "}
              How do I save a listing as a favorite?{" "}
            </Typography>
            To save a listing as a favorite, click the heart icon beneath the
            listing. The heart will turn red, indicating that you've saved it
            for easier access later.
          </Typography>
          <Typography id="howdoiremoveasavedlisting">
            {" "}
            <Typography sx={{ ...styles.question }}>
              {" "}
              How do I remove a saved listing from my favorites?
            </Typography>
            On the "Saved Listings" page, you can remove a saved listing by
            clicking the "Remove Favorite" button.
          </Typography>
          <Typography id="accountmanagement" sx={{ ...styles.heading }}>
            {" "}
            Account Management
          </Typography>
          <Typography id="howcaniupdatemyusername">
            <Typography sx={{ ...styles.question }}>
              {" "}
              How can I update my username?
            </Typography>
            You can update your username by clicking on the "My Account" link in
            the navigation, then updating the username field and clicking the
            "Save" button.
          </Typography>

          <Typography id="googlemapsintegration">
            {" "}
            Google Maps Integration
          </Typography>
          <Typography id="howarelistingsrepresentedonthemap">
            {" "}
            <Typography sx={{ ...styles.question }}>
              How are listings represented on the map?
            </Typography>
            Listings are displayed on the map with green gem icons. Clicking on
            an icon allows you to view the details of that specific listing.
          </Typography>
          <Typography id="canisearchforlistingsinmap">
            {" "}
            <Typography sx={{ ...styles.question }}>
              {" "}
              Can I search for listings in specific areas on the map?
            </Typography>
            Yes, you can use the search box within the Google Maps component to
            find listings in different areas. This makes it easy to explore
            sales in your desired location.
          </Typography>
          <Typography id="support" sx={{ ...styles.heading }}>
            {" "}
            Support
          </Typography>
          <Typography id="reportissue">
            <Typography sx={{ ...styles.question }}>
              {" "}
              How do I report an issue?
            </Typography>
            If you encounter any issues or have concerns, please visit our
            "Contact Us" page, where you can report problems and get assistance
            from our team.
          </Typography>
          <Typography id="contactadmin">
            {" "}
            <Typography sx={{ ...styles.question }}>
              How do I contact an administrator?
            </Typography>
            If you need to contact an administrator for any reason, you can do
            so through our "Contact Us" page. We're here to help and address any
            questions or concerns you may have.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FAQ;
