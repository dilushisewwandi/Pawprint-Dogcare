import React, { useState } from 'react';
import './AdopterRegiForm.css';

function AdopterRegiForm() {
  const [values, setValues] = useState({
    // adoID: '',
    userID: '',
    adoName: '',
    adoNIC: '',
    adoAge: '',
    adoJob: '',
    adoGender: '',
    adoLocation: '',
    adoEmail: '',
    adoPhone: '',
    houseHoldComposition: '',
    reasonForAdoption: ''
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateInputs(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:8800/api/adopterRegi/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });
        if (response.ok) {
          alert('Adopter registered successfully');
          window.location.href = '/services';
        } else {
          console.error('Error storing data:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const validateInputs = (values) => {
    let errors = {};
    // if (!values.adoID) errors.adoID = 'Adopter ID is required';
    if (!values.userID) errors.userID = 'User ID is required';
    if (!values.adoName) errors.adoName = 'Adopter Name is required';
    if (!values.adoNIC) errors.adoNIC = 'Adopter NIC is required';
    if (!values.adoAge) errors.adoAge = 'Adopter Age is required';
    if (!values.adoJob) errors.adoJob = 'Adopter Job is required';
    if (!values.adoGender) errors.adoGender = 'Adopter Gender is required';
    if (!values.adoLocation) errors.adoLocation = 'Adopter Location is required';
    if (!values.adoEmail) errors.adoEmail = 'Adopter Email is required';
    if (!values.adoPhone) errors.adoPhone = 'Adopter Phone is required';
    if (!values.houseHoldComposition) errors.houseHoldComposition = 'Household Composition is required';
    if (!values.reasonForAdoption) errors.reasonForAdoption = 'Reason for Adoption is required';
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
      <div className="ado-regi-card">
        <div className="ado-regi-card-body">
          <h2 className="ado-regi-form-name">Adopter Registration</h2>
          <form onSubmit={handleSubmit}>
            {Object.keys(values).map(key => (
              <div className="form-group" key={key}>
                <label htmlFor={key}>{key.split(/(?=[A-Z])/).join(' ')}</label>
                <input
                  type={key === 'adoEmail' ? 'email' : 'text'}
                  name={key}
                  value={values[key]}
                  onChange={handleInput}
                  required
                  placeholder={`Enter ${key.split(/(?=[A-Z])/).join(' ')}`}
                  className="form-control rounded"
                />
                {errors[key] && <span className="text-danger">{errors[key]}</span>}
              </div>
            ))}
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdopterRegiForm;



