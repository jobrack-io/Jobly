import React, { useState } from 'react';
import axios from 'axios';

function SignupForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const [formErrors, setFormErrors] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newFormErrors:  { first_name: string; last_name: string; email: string; password: string; confirm_password: string; } = {first_name: "", last_name: "", email: "", password: "", confirm_password: ""};

    // Validate first_name
    if (!formData.first_name) {
      isValid = false;
      newFormErrors.first_name = 'First Name is required';
    }

    // Validate last_name
    if (!formData.last_name) {
      isValid = false;
      newFormErrors.last_name = 'Last Name is required';
    }

    // Validate email
    if (!formData.email) {
      isValid = false;
      newFormErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      newFormErrors.email = 'Invalid email format';
    }

    // Validate password
    if (!formData.password) {
      isValid = false;
      newFormErrors.password = 'Password is required';
    }

    // Validate confirm_password
    if (!formData.confirm_password) {
      isValid = false;
      newFormErrors.confirm_password = 'Confirm Password is required';
    } else if (formData.password !== formData.confirm_password) {
      isValid = false;
      newFormErrors.confirm_password = 'Passwords do not match';
    }

    setFormErrors(newFormErrors);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      // Perform API call using Axios or Fetch here
      try {
        await axios.post('http://localhost:8080/user/signup', {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
        });
        // Handle successful form submission
        alert('Signup successful!');
      } catch (error) {
        // Handle error in form submission
        alert('Signup failed. Please try again later.');
      }
    }
  };

  return (
    <div
      style={{
        width: '90%',
        margin: '50px',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        background: 'linear-gradient(to right, #c4d3f6, #f3e7ff)',
      }}
    >
      <form onSubmit={handleSubmit}>
        <h3 className="text-center mb-4">Signup</h3>
        <div className="mb-3">
          <input
            type="text"
            name="first_name"
            className="form-control"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
          />
          {formErrors.first_name && (
            <div className="text-danger">{formErrors.first_name}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="last_name"
            className="form-control"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
          />
          {formErrors.last_name && (
            <div className="text-danger">{formErrors.last_name}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && (
            <div className="text-danger">{formErrors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {formErrors.password && (
            <div className="text-danger">{formErrors.password}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="confirm_password"
            className="form-control"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={handleChange}
          />
          {formErrors.confirm_password && (
            <div className="text-danger">{formErrors.confirm_password}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
