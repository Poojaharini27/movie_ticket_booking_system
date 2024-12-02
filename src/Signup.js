import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Regular expression for password validation
  const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

  function handleSubmit(event) {
    event.preventDefault();  // Prevent default form submission

    // Now make the POST request
    axios.post("http://localhost:3001/signup", {
      email,
      password,
      name,
      gender,
      dob,
      address,
      city,
      state
    }).then((res) => {
      console.log("Signup successful");
      navigate("/");  // Redirect to the home page after successful signup
    }).catch((err) => {
      console.log(err);  // Log the error if the request fails
    });
  }

  function handlePasswordChange(e) {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    if (!passwordCriteria.test(inputPassword)) {
      setPasswordError("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
    } else {
      setPasswordError(""); 
    }
  }

  return (
    <div className="body">
      <div className="signup">
        <h2>Signup</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="signup-form-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="signup-form-col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-field"
                value={password}
                onChange={handlePasswordChange}
                required
              /><br/>
              {passwordError && <small style={{ color: 'red', display: 'block', marginTop: '5px' }}>{passwordError}</small>}
            </div>
            <div className="signup-form-col">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="form-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="signup-form-col">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                className="signup-form-field"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="prefer">Prefer not to say</option>
              </select>
            </div>
            <div className="signup-form-col">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                className="form-field"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>
            <div className="signup-form-col">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                placeholder="Enter address"
                className="form-field"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="signup-form-col">
              <label htmlFor="city">City</label>
              <input
                type="text"
                placeholder="Enter city"
                className="form-field"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="signup-form-col">
              <label htmlFor="state">State</label>
              <input
                type="text"
                placeholder="Enter state"
                className="form-field"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            <p>
              Already have an account? <Link to="/signin">Sign in</Link>
            </p>
            <button className="signup-btn" type="submit" disabled={!!passwordError}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
