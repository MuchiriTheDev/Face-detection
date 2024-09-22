import React, { useState } from 'react';
import "./Signing.css";

const Signing = (props) => {
  const [mail, setMail] = useState("");
  const [pwd, setPwd] = useState("");

  // Handle email input change
  const onEmailChange = (event) => {
    setMail(event.target.value);
  };

  // Handle password input change
  const onPasswordChange = (event) => {
    setPwd(event.target.value);
  };

  // Handle form submission
  const onSubmitSign = () => {
    if (mail && pwd) {  // Ensure both email and password are filled
      fetch("http://localhost:3000/signing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: mail,
          password: pwd
        })
      })
      .then(resp => resp.json())
      .then(data => {
        if (data.id) {  // Ensure user data contains id, which means successful login
          props.check("home");  // Navigate to the home page
          props.checkUser(data); // Set user data in the parent component
        } else {
          console.log("Login failed: Verification failed or wrong credentials");
        }
      })
      .catch(err => console.error("Error:", err));  // Catch any fetch errors
    } else {
      console.log("Please enter both email and password");
      // Optionally: Display a message on the UI to prompt user to fill the form
    }
  };

  return (
    <main className="br3 mw7 center shadow-5 pa4 black-80">
      <div className="measure center">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Sign In</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input
              onChange={onEmailChange}
              className="pa3 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="email"
              name="email-address"
              id="email-address"
            />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input
              onChange={onPasswordChange}
              className="b pa3 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="password"
              name="password"
              id="password"
            />
          </div>
        </fieldset>
        <div className="">
          <input
            onClick={onSubmitSign}
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Sign in"
          />
        </div>
        <div className="lh-copy mt3">
          <a href="#0" onClick={() => props.check("register")} className="f6 pointer link dim black db">Register</a>
        </div>
      </div>
    </main>
  );
};

export default Signing;