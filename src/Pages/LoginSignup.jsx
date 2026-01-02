import React, { useState, useContext } from 'react'
import './CSS/LoginSignup.css'
import { login, signup } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import eyeIcon from '../Components/Assets/eye.png';
import hiddenIcon from '../Components/Assets/hidden.png';

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
    if (state === "Login") {
      const user = await login(email, password);
      if (user) {
        restoreCart(user.uid);
        alert("Login successful!");
        navigate('/');
      }
      // Error is already handled in the login function
    } else {
      const user = await signup(name, email, password);
      if (user) {
        restoreCart(user.uid);
        alert("Account created successfully!");
        navigate('/');
      }
      // Error is already handled in the signup function
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
