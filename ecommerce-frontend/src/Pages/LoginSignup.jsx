import React, { useState, useContext } from 'react'
import './CSS/LoginSignup.css'
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import eyeIcon from '../Components/Assets/eye.png';
import hiddenIcon from '../Components/Assets/hidden.png';
import { authAPI } from '../services/api';

const LoginSignup = () => {
  const navigate = useNavigate();
  const { restoreCart } = useContext(ShopContext);

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    try {
      if (state === "Login") {
        const response = await authAPI.login({ username: email, password });
        if (response.status === 200) {
          // Store user data in context or localStorage
          const userResponse = {
            id: response.data.id,
            username: response.data.username,
            email: response.data.email,
            firstName: response.data.firstName || response.data.username,
            token: response.data.token
          };
          localStorage.setItem('user', JSON.stringify(userResponse));
          alert("Login successful!");
          navigate('/');
        }
      } else {
        const userData = {
          username: name || email,
          password,
          email,
          firstName: name
        };
        const response = await authAPI.register(userData);
        if (response.status === 200) {
          // Store user data in localStorage after registration
          const userResponse = {
            id: response.data.id,
            username: response.data.username || email,
            email: response.data.email,
            firstName: response.data.firstName || name,
            token: response.data.token
          };
          localStorage.setItem('user', JSON.stringify(userResponse));
          alert("Account created successfully!");
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      let errorMessage = 'An error occurred';

      if (error.response) {
        // Server responded with error status
        if (error.response.data && typeof error.response.data === 'object') {
          // Try to get error message from response object
          errorMessage = error.response.data.error || error.response.data.message || 'Server error occurred';
        } else if (typeof error.response.data === 'string') {
          // If response is a string, try to parse as JSON
          try {
            const parsedError = JSON.parse(error.response.data);
            errorMessage = parsedError.error || parsedError.message || 'Server error occurred';
          } catch {
            // If parsing fails, use the raw response
            errorMessage = error.response.data || 'Server error occurred';
          }
        } else {
          errorMessage = error.response.data || 'Server error occurred';
        }
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'Network error - please check your connection';
      } else {
        // Something else happened
        errorMessage = error.message || 'An error occurred';
      }

      alert(errorMessage);
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" placeholder='Your Name' /> : <></>}
          <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='Email Address' />
          <div className="password-field">
            <input
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              type={showPassword ? "text" : "password"}
              placeholder='Password'
            />
            <img
              src={showPassword ? eyeIcon : hiddenIcon}
              alt="toggle visibility"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle-icon"
            />
          </div>
        </div>
        <button onClick={user_auth} type="submit">Continue</button>
        {state === "Sign Up" ? <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>Login here</span> </p> : <p className="loginsignup-login">Create an account? <span onClick={() => { setState("Sign Up") }}>Click here</span> </p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
