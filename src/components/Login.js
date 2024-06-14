import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData)
    try {
      const response = await axios.post('https://hashtag-273q.onrender.com/auth/login', formData);
      if (response && response.data) {
        const { token } = response.data;
        localStorage.setItem('token', token); // Store token in local storage
        console.log('Login successful'); // Handle success response
        // Redirect to another page or update UI
        alert("Login successful");
        localStorage.setItem("token", token);
        navigate("/profile");
      } else {
        alert("Invalid Credentials");
        setError('Unexpected response structure');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container-fluid h-100">
      <div className="row no-gutters h-100">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="p-4" style={{ width: "490px" }}>
            <h1 className="text-center">Login</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Username or email"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span className="input-group-append" onClick={toggleShowPassword}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
              <div id='check' className='checkbox-text'>
                <div>
                  <input type="checkbox" name="remember" id="remember" /><span>Remember Me</span>
                </div>
                <Link to=''>Forgot Password</Link>
              </div>
              <div className="form-group">
                <button type="submit" className="btn submit-btn">Login</button>
              </div>
            </form>
            <div className='text-section checkbox-text'>
              <div>
                <input type="checkbox" name="terms" required /><span>I understand and agree with the <Link to=''>Terms and Conditions</Link> and <Link to=''>Privacy Notice</Link></span>
              </div>
              <p>Doesn't have an account yet?<Link to='/signup'>Sign Up</Link></p>
            </div>
          </div>
        </div>
        <div className="col-md-6 right-section">
          <img id="signup-image" src="https://i.pinimg.com/originals/5b/7a/92/5b7a92438d8bcfa9f3f39b44df4f9885.png" alt="SignUp" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}

export default Login;
