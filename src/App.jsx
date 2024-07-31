import React from "react";
import "./style.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialSignupForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  dateOfBirth: "",
  telNumber: "",
  termsAndPolicies: false,
  newsletterSub: false,
};

export default function App() {
  const id = React.useId();
  const [signupForm, setSignupForm] = React.useState(initialSignupForm);
  const [showPassword, setShowPassword] = React.useState(false);
  const [profilePicturePreview, setProfilePicturePreview] = React.useState("./images/default-pic1.png");
  const [passwordValid, setPasswordValid] = React.useState(true);

  const isMatch = signupForm.password === signupForm.passwordConfirmation;

  function handleChange(event) {
    const { name, value, type, checked, files } = event.target;

    if (name === 'telNumber' && !/^\d*$/.test(value)) {
      return; // Ignore input if it's not a number
    }

    if (name === "profilePicture" && files && files[0]) {
      setProfilePicturePreview(URL.createObjectURL(files[0]));
    }

    if (name === "password") {
      const minLength = 8;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*]/.test(value);

      const isValid = value.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
      setPasswordValid(isValid);

      setSignupForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setSignupForm((prevState) => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : files ? files[0] : value,
      }));
    }
  }

  function handlePassword() {
    setShowPassword((prevState) => !prevState);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (signupForm.password === signupForm.passwordConfirmation && passwordValid) {
      toast.success(`Signup successful! \n Welcome ${signupForm.firstName} ${signupForm.lastName}!`);
      if (signupForm.newsletterSub) {
        toast.success(`Thanks for joining our newsletter :)`);
      }
      console.log(signupForm);
    } else if(signupForm.password !== signupForm.passwordConfirmation) {
      toast.error(`Passwords Do Not Match!`);
    } else {
      toast.error(`Password's Requirements Aren't Met!`);
    }
  }

  return (
    <div>
      <h1 className="main-title">SIGN-UP FORM</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor={`${id}fname`} className="fname">First Name</label>
        <input 
          id={`${id}fname`}
          type="text"
          placeholder="e.g. Haider"
          onChange={handleChange}
          name="firstName"
          value={signupForm.firstName}
          className="fname-field"
          required
        />
        <br /><br />
        <label htmlFor={`${id}lname`} className="lname">Last Name</label>
        <input 
          id={`${id}lname`}
          type="text"
          placeholder="e.g. Al-Khafaji"
          onChange={handleChange}
          name="lastName"
          value={signupForm.lastName}
          className="lname-field"
          required
        />
        <br /><br />
        <label htmlFor={`${id}email`} className="email">Email</label>
        <input 
          id={`${id}email`}
          type="email"
          placeholder="e.g. example@gmail.com"
          onChange={handleChange}
          name="email"
          value={signupForm.email}
          className="email-field"
          required
        />
        <br /><br />
        <label htmlFor={`${id}pass`} className="password">Password</label>
        <input 
          id={`${id}pass`}
          type={showPassword ? "text" : "password"}
          placeholder="e.g. H18uh2@@ha299"
          onChange={handleChange}
          name="password"
          value={signupForm.password}
          className="pass-field"
          required
        />
        <div className="info-container">
          <span className="info-icon" tabindex="0">ℹ️</span>
          <p className="info-message">
                password should contain: <br />
                -min. 8 characters <br />
                -upper case letter <br />
                -numbers <br />
                -special characters <br />
          </p>
        </div>
        {!passwordValid && signupForm.password && (
          <p className="validation-message" style={{ color: 'red' }}>
            ❗REQUIREMENTS AREN'T MET
          </p>
        )}

        <br /><br />
        <label htmlFor={`${id}passConfirm`} className="confirm-pass">Confirm Password</label>
        <input 
          id={`${id}passConfirm`}
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Your Password"
          onChange={handleChange}
          name="passwordConfirmation"
          value={signupForm.passwordConfirmation}
          className={`confirm-field ${isMatch ? "match" : "nomatch"}`}
          required
        />
        <br /><br />
        <div className="checkbox-group">
          <label htmlFor={`${id}show`} className="show-btn">Show Password</label>
          <input 
            id={`${id}show`}
            type="checkbox"
            onChange={handlePassword}
            checked={showPassword}
            className="show-field"
          />
        </div>
        <br /><br />
        <label htmlFor={`${id}dob`} className="dob">Date of Birth</label>
        <input 
          id={`${id}dob`}
          type="date"
          onChange={handleChange}
          name="dateOfBirth"
          value={signupForm.dateOfBirth}
          className="dob-field"
          required
        />
        <br /><br />
        <label htmlFor={`${id}tel`} className="tel">Phone Number</label>
        <input 
          id={`${id}tel`}
          type="tel"
          placeholder="e.g. 00964 111 111 1111"
          onChange={handleChange}
          name="telNumber"
          value={signupForm.telNumber}
          className="num-field"
          required
        />
        <br /><br />
        <label htmlFor={`${id}pic`} className="pic">Add a Profile Picture</label>
        <input 
          id={`${id}pic`}
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleChange}
          name="profilePicture"
          className="pic-field"
        />
        <img 
          src={profilePicturePreview} 
          alt="Profile Preview" 
          className="profile-picture-preview" 
        />
        <br /><br />
        <div className="checkbox-group">
          <label htmlFor={`${id}terms`} className="terms">Accept our Terms and Policy</label>
          <input 
            id={`${id}terms`}
            type="checkbox"
            onChange={handleChange}
            name="termsAndPolicies"
            checked={signupForm.termsAndPolicies}
            className="terms-field"
            required
          />
        </div>
        <div className="checkbox-group">
          <label htmlFor={`${id}news`} className="news">Join Our Newsletter</label>
          <input 
            id={`${id}news`}
            type="checkbox"
            onChange={handleChange}
            name="newsletterSub"
            checked={signupForm.newsletterSub}
            className="news-field"
          />
        </div>
        <button type="submit">Submit!</button>
      </form>
      <ToastContainer />
    </div>
  );
}
