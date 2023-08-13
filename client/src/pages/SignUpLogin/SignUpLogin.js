import React, { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";


//----------------------START OF COMPONENT----------------------------//
const SignUpLoginPage = () => {
   //-----------------STATE---------------//
  const [currentComponent, setComponent] = useState("SignUp");

    //----------HANDLERS ---------\\
  const renderComponent = () => {
      // Check if 'currentComponent' is set to "SignUp"
    if (currentComponent === "SignUp") {
       // If true, render the SignUpForm component with appropriate props
      return (
        <SignUpForm
          handleComponentChange={handleComponentChange}
          LoginForm="Login"
        />
      );
       // If 'currentComponent' is not "SignUp", render the LoginForm component
    } else {
      return <LoginForm />;
    }
  };

  //function 'handleComponentChange' to update the 'currentComponent' state
  const handleComponentChange = (component) => {
    setComponent(component);
  };

  //Render the appropriate component based on the value of 'currentComponent'
  return <div>{renderComponent()}</div>;
};

export default SignUpLoginPage;
