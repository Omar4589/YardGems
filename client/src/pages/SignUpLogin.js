import React, { useState } from "react";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import LoginForm from "../components/LoginForm/LoginForm";

const SignUpLoginPage = () => {
  const [currentComponent, setComponent] = useState("SignUp");

  const renderComponent = () => {
    if (currentComponent === "SignUp") {
      return (
        <SignUpForm
          handleComponentChange={handleComponentChange}
          LoginForm="Login"
        />
      );
    } else {
      return <LoginForm />;
    }
  };

  const handleComponentChange = (component) => {
    setComponent(component);
  };

  return <div> {renderComponent()}</div>;
};

export default SignUpLoginPage;
