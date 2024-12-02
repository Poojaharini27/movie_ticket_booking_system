import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // To store error message
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");

    axios.post('http://localhost:3001/signin', { email, password })
      .then(res => {
        console.log("Response received:", res.data);
        
        // If signin is successful
        if (res.data && res.data.message === 'Signin successful') {
          localStorage.setItem('user', JSON.stringify(res.data.user));
          console.log('Signin successful:', res.data.user.access);

          // Navigate based on user access
          if (res.data.user.access === 'admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }
      })
      .catch(err => {
        console.error("Error during signin:", err);
        
        // Handle the error based on the status code
        if (err.response && err.response.status === 401) {
          setErrorMessage('Invalid email or password');
        } else {
          setErrorMessage('An error occurred. Please try again later.');
        }
      });
  };

  return (
    <div className='signin'>
      <div className="signin-form">
        <form onSubmit={handleSubmit}>
          <h2>Signin</h2>
          <div className="signin-email">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder='Enter Email'
              className='form-control'
              onChange={e => setEmail(e.target.value)}
              required
            />
            {/* {errorMessage && errorMessage.includes('email') && (
              <small>{errorMessage}</small>
            )} */}
          </div>
          <div className="signin-password">
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder='Enter Password'
              className='form-control'
              onChange={e => setPassword(e.target.value)}
              required
            />
            {errorMessage && errorMessage.includes('password') && (
              <small>{errorMessage}</small>
            )}
          </div>
          <p>Don't have an account? <Link to="/signup">Signup</Link></p>
          <button className="btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
