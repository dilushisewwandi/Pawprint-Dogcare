import React, { useState } from 'react';
import './DaycareRegiForm.css';
import { useNavigate } from 'react-router-dom';

function DaycareRegiForm() {
  const [values, setValues] = useState({
    dcName: '',
    dcLocation: '',
    dcPhone: '',
    dcEmail: '',
    openDays: '',
    openTimes: '',
    noOfStaffMembers: '',
    amenitiesOffered: '',
    safetyFeatures: '',
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
        const response = await fetch('http://localhost:8800/api/daycare/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });

        const result = await response.json();

        if (response.ok) {
          alert(result.message || 'Daycare registered successfully');
          // navigate('/daycare/dashboard');
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
    if (!values.dcName) errors.dcName = 'Daycare Name is required';
    if (!values.dcEmail) errors.dcEmail = 'Daycare Email is required';
    if (!values.dcPhone) errors.dcPhone = 'Daycare Phone is required';
    if (!values.dcLocation) errors.dcLocation = 'Daycare Location is required';
    if (!values.userID) errors.userID = 'User ID is required';
    return errors;
  };

  const backgroundStyle = {
    backgroundImage: "url('/images/daycare.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div className="dc-form-container" style={backgroundStyle}>
      <h1 className="dc-welcome-message">Register Your Daycare</h1>
      <div className="dc-registration-card">
        <div className="dc-registration-card-body">
          <h2 className="dc-regi-form-name">Daycare Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="dc-form-group">
              <label htmlFor="dcName">Daycare Name</label>
              <input
                type="text"
                name="dcName"
                value={values.dcName}
                onChange={handleInput}
                required
                placeholder="Enter Daycare Name"
              />
              {errors.dcName && <span className="text-danger">{errors.dcName}</span>}
            </div>

            <div className="dc-form-group">
              <label htmlFor="dcEmail">Daycare Email</label>
              <input
                type="email"
                name="dcEmail"
                value={values.dcEmail}
                onChange={handleInput}
                required
                placeholder="Enter Daycare Email"
              />
              {errors.dcEmail && <span className="text-danger">{errors.dcEmail}</span>}
            </div>

            <div className="dc-form-group">
              <label htmlFor="dcPhone">Daycare Phone</label>
              <input
                type="text"
                name="dcPhone"
                value={values.dcPhone}
                onChange={handleInput}
                required
                placeholder="Enter Phone"
              />
              {errors.dcPhone && <span className="text-danger">{errors.dcPhone}</span>}
            </div>

            <div className="dc-form-group">
              <label htmlFor="dcLocation">Daycare Location</label>
              <input
                type="text"
                name="dcLocation"
                value={values.dcLocation}
                onChange={handleInput}
                required
                placeholder="Enter Location"
              />
              {errors.dcLocation && <span className="text-danger">{errors.dcLocation}</span>}
            </div>

            <div className="dc-form-group">
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

            {/* Additional inputs specific to daycare */}
            <div className="dc-form-group">
              <label htmlFor="openDays">Open Days</label>
              <input
                type="text"
                name="openDays"
                value={values.openDays}
                onChange={handleInput}
                placeholder="Enter Open Days"
              />
            </div>

            <div className="dc-form-group">
              <label htmlFor="openTimes">Open Times</label>
              <input
                type="text"
                name="openTimes"
                value={values.openTimes}
                onChange={handleInput}
                placeholder="Enter Open Times"
              />
            </div>

            <div className="dc-form-group">
              <label htmlFor="noOfStaffMembers">Number of Staff Members</label>
              <input
                type="number"
                name="noOfStaffMembers"
                value={values.noOfStaffMembers}
                onChange={handleInput}
                placeholder="Enter Number of Staff Members"
              />
            </div>

            <div className="dc-form-group">
              <label htmlFor="amenitiesOffered">Amenities Offered</label>
              <input
                type="text"
                name="amenitiesOffered"
                value={values.amenitiesOffered}
                onChange={handleInput}
                placeholder="Enter Amenities Offered"
              />
            </div>

            <div className="dc-form-group">
              <label htmlFor="safetyFeatures">Safety Features</label>
              <input
                type="text"
                name="safetyFeatures"
                value={values.safetyFeatures}
                onChange={handleInput}
                placeholder="Enter Safety Features"
              />
            </div>

            <button type="submit" className="dc-regi-submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DaycareRegiForm;
