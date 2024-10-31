import React, { useState } from 'react';
import './PetRegistrationForm.css';

function PetRegistrationForm() {
  const [values, setValues] = useState({
    userID: '',
    petName: '',
    petAge: '',
    petHeight: '',
    petWeight: '',
    petGender: '',
    petSkinColor: '',
    petBreed: '',
    petImage: null
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateInputs(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      try {
        const response = await fetch('http://localhost:8800/api/pet/register', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (response.ok) {
          alert('Your pet registered successfully');
          // window.location.href = '/services';
        } else {
          setServerError(result.error || 'Error registering pet.');
        }
      } catch (error) {
        console.error('Error:', error);
        setServerError('An unexpected error occurred.');
      }
    }
  };


  

  const handleInput = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      setValues(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setValues(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateInputs = (values) => {
    let errors = {};
    if (!values.userID) errors.userID = 'User ID is required';
    if (!values.petName) errors.petName = 'Pet Name is required';
    if (!values.petAge) errors.petAge = 'Pet Age is required';
    if (!values.petBreed) errors.petBreed = 'Pet Breed is required';
    if (!values.petWeight) errors.petWeight = 'Pet Weight is required';
    if (!values.petHeight) errors.petHeight = 'Pet Height is required';
    if (!values.petSkinColor) errors.petSkinColor = 'Pet Skin Color is required';
    if (!values.petGender) errors.petGender = 'Pet Gender is required';
    if (!values.petImage) errors.petImage = 'Pet Image is required';
    return errors;
  };

  const backgroundStyle = {
    backgroundImage: "url('/images/login1.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div className="form-container" style={backgroundStyle}>
      <div className="registration-card">
        <div className="registration-card-body">
          <h2 className="regi-form-name">Pet Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="userID">User ID</label>
              <input
                type="text"
                name="userID"
                value={values.userID}
                onChange={handleInput}
                required
                placeholder="Enter User ID"
                className="form-control rounded"
              />
              {errors.userID && <span className="text-danger">{errors.userID}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="petName">Pet Name</label>
              <input
                type="text"
                name="petName"
                value={values.petName}
                onChange={handleInput}
                required
                placeholder="Enter Pet Name"
                className="form-control rounded"
              />
              {errors.petName && <span className="text-danger">{errors.petName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="petAge">Pet Age</label>
              <input
                type="text"
                name="petAge"
                value={values.petAge}
                onChange={handleInput}
                required
                placeholder="Enter Pet Age"
                className="form-control rounded"
              />
              {errors.petAge && <span className="text-danger">{errors.petAge}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="petBreed">Pet Breed</label>
              <input
                type="text"
                name="petBreed"
                value={values.petBreed}
                onChange={handleInput}
                required
                placeholder="Enter Pet Breed"
                className="form-control rounded"
              />
              {errors.petBreed && <span className="text-danger">{errors.petBreed}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="petWeight">Pet Weight</label>
              <input
                type="text"
                name="petWeight"
                value={values.petWeight}
                onChange={handleInput}
                required
                placeholder="Enter Pet Weight"
                className="form-control rounded"
              />
              {errors.petWeight && <span className="text-danger">{errors.petWeight}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="petHeight">Pet Height</label>
              <input
                type="text"
                name="petHeight"
                value={values.petHeight}
                onChange={handleInput}
                required
                placeholder="Enter Pet Height"
                className="form-control rounded"
              />
              {errors.petHeight && <span className="text-danger">{errors.petHeight}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="petSkinColor">Pet Skin Color</label>
              <input
                type="text"
                name="petSkinColor"
                value={values.petSkinColor}
                onChange={handleInput}
                required
                placeholder="Enter Pet Skin Color"
                className="form-control rounded"
              />
              {errors.petSkinColor && <span className="text-danger">{errors.petSkinColor}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="petGender">Pet Gender</label>
              <select
                name="petGender"
                value={values.petGender}
                onChange={handleInput}
                required
                className="form-control rounded"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.petGender && <span className="text-danger">{errors.petGender}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="petImage">Pet Image</label>
              <input type="file" name="petImage" onChange={handleInput} required className="form-control rounded" />
              {errors.petImage && <span className="text-danger">{errors.petImage}</span>}
            </div>

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PetRegistrationForm;
