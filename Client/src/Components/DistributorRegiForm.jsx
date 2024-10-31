import React, { useState } from 'react';
import './DistributorRegiForm.css';
import { useNavigate } from 'react-router-dom';

function DistributorRegiForm() {
  const [values, setValues] = useState({
    disName: '',
    disEmail: '',
    disPhone: '',
    disLocation: '',
    userID: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateInputs(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:8800/api/distributor/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });

        const result = await response.json();

        if (response.ok) {
          alert(result.message || 'Distributor registered successfully');
          window.location.href = '/pet/register';
        } else {
          alert(result.error || 'This user ID is wrong or already assigned. Please sign up.');
          navigate('/signup');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = (values) => {
    let errors = {};
    if (!values.disName) errors.disName = 'Distributor Name is required';
    if (!values.disEmail) errors.disEmail = 'Distributor Email is required';
    if (!values.disPhone) errors.disPhone = 'Distributor Phone is required';
    if (!values.disLocation) errors.disLocation = 'Distributor Location is required';
    if (!values.userID) errors.userID = 'User ID is required';
    return errors;
  };

  const backgroundStyle = {
    backgroundImage: "url('/images/login1.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div className="dis-form-container" style={backgroundStyle}>
       <h1 className="dis-welcome-message">Join Our Network</h1>
  <div className="dis-registration-card">
   
    <div className="dis-registration-card-body">
      <h2 className="dis-regi-form-name">Distributor Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="dis-form-group">
          <label htmlFor="disName">Distributor Name</label>
          <input
            type="text"
            name="disName"
            value={values.disName}
            onChange={handleInput}
            required
            placeholder="Enter Distributor Name"
          />
          {errors.disName && <span className="text-danger">{errors.disName}</span>}
        </div>

        <div className="dis-form-group">
          <label htmlFor="disEmail">Distributor Email</label>
          <input
            type="email"
            name="disEmail"
            value={values.disEmail}
            onChange={handleInput}
            required
            placeholder="Enter Distributor Email"
          />
          {errors.disEmail && <span className="text-danger">{errors.disEmail}</span>}
        </div>

        <div className="dis-form-group">
          <label htmlFor="disPhone">Distributor Phone</label>
          <input
            type="text"
            name="disPhone"
            value={values.disPhone}
            onChange={handleInput}
            required
            placeholder="Enter Phone"
          />
          {errors.disPhone && <span className="text-danger">{errors.disPhone}</span>}
        </div>

        <div className="dis-form-group">
          <label htmlFor="disLocation">Distributor Location</label>
          <input
            type="text"
            name="disLocation"
            value={values.disLocation}
            onChange={handleInput}
            required
            placeholder="Enter Location"
          />
          {errors.disLocation && <span className="text-danger">{errors.disLocation}</span>}
        </div>

        <div className="dis-form-group">
          <label htmlFor="userID">User ID</label>
          <input
            type="text"
            name="userID"
            value={values.userID}
            onChange={handleInput}
            required
            placeholder="Enter User ID"
          />
          {errors.userID && <span className="text-danger">{errors.userID}</span>}
        </div>

        <button type="submit" className="dis-regi-submit">Register</button>
      </form>
    </div>
  </div>
</div>

  );
}

export default DistributorRegiForm;






