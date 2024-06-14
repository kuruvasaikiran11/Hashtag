import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('https://hashtag-273q.onrender.com/auth/signup', formData);
      // console.log(response.data); // Handle success response
      // You can redirect to login page or show a success message
      alert(`User ${response.data.user.username} registered Successfully! Please continue to Login`)
      navigate("/login");
    } catch (err) {
      setError(err.response.data.message || 'An error occurred');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="container-fluid h-100">
      <div className="row no-gutters h-100">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="p-4" style={{ width: "490px" }}>
            <h1 className="text-center">Sign Up</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
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
              <div className="form-group">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <span className="input-group-append" onClick={toggleShowConfirmPassword}>
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </span>
              </div>
              <div className="form-group">
                <button type="submit" className="btn submit-btn">Create Account</button>
              </div>
            </form>
            <div className='text-section'>
              <p>By clicking <b>Create Account</b>, you agree to #Hashtag's <Link to="/signup">Terms and Conditions</Link> and confirm you have read our <Link to=''>Privacy Notice</Link>. You may receive offers, news and updates from us.</p>
              <p> Already have an account? <Link to="/login">Sign In</Link></p>
            </div>
          </div>
        </div>
        <div className="col-md-6 right-section">
          <img id="signup-image" src="https://i.pinimg.com/originals/25/7d/5d/257d5d7d19546a40543bd9d916127e03.png" alt="SignUp" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
