// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './VetRegiForm.css'; 

// function VetRegiForm() {
//   const [values, setValues] = useState({
//     vetName: '',
//     vetEmail: '',
//     vetSpecialization: '',
//     vetPhone: '',
//     clinic: '',
//     userID: ''
//   });

//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate(); 

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const validationErrors = validateInputs(values);
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         const response = await fetch('http://localhost:8800/api/vet/register', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(values)
//         });

//         if (response.ok) {
//           alert('Veterinarian registered successfully');
         
//         } else {
//           console.error('Error storing data:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     }
//   };

//   const handleInput = (event) => {
//     const { name, value } = event.target;
//     setValues(prev => ({ ...prev, [name]: value }));
//   };

//   const validateInputs = (values) => {
//     let errors = {};
//     if (!values.vetName) errors.vetName = 'Veterinarian Name is required';
//     if (!values.vetEmail) errors.vetEmail = 'Veterinarian Email is required';
//     if (!values.vetSpecialization) errors.vetSpecialization = 'Specialization is required';
//     if (!values.vetPhone) errors.vetPhone = 'Veterinarian Phone is required';
//     if (!values.clinic) errors.clinic = 'Clinic Name is required';
//     if (!values.userID) errors.userID = 'User ID is required';
//     return errors;
//   };

//   const backgroundStyle = {
//     backgroundImage: "url('/images/login1.jpg')",
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     minHeight: '100vh',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center'
//   };

//   return (
//     <div className="form-container" style={backgroundStyle}>
//       <div className="registration-content">
//         <h1 className="welcome-message">Join Our Veterinary Network</h1>
//         <div className="registration-card">
//           <div className="registration-card-body">
//             <h2 className="regi-form-name">Veterinarian Registration</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="vetName">Vet Name</label>
//                 <input
//                   type="text"
//                   name="vetName"
//                   value={values.vetName}
//                   onChange={handleInput}
//                   required
//                   placeholder="Enter Veterinarian Name"
//                 />
//                 {errors.vetName && <span className="text-danger">{errors.vetName}</span>}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="vetEmail">Vet Email</label>
//                 <input
//                   type="email"
//                   name="vetEmail"
//                   value={values.vetEmail}
//                   onChange={handleInput}
//                   required
//                   placeholder="Enter Veterinarian Email"
//                 />
//                 {errors.vetEmail && <span className="text-danger">{errors.vetEmail}</span>}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="vetSpecialization">Specialization</label>
//                 <input
//                   type="text"
//                   name="vetSpecialization"
//                   value={values.vetSpecialization}
//                   onChange={handleInput}
//                   required
//                   placeholder="Enter Specialization"
//                 />
//                 {errors.vetSpecialization && <span className="text-danger">{errors.vetSpecialization}</span>}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="vetPhone">Vet Phone</label>
//                 <input
//                   type="text"
//                   name="vetPhone"
//                   value={values.vetPhone}
//                   onChange={handleInput}
//                   required
//                   placeholder="Enter Phone"
//                 />
//                 {errors.vetPhone && <span className="text-danger">{errors.vetPhone}</span>}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="clinic">Vet Clinic</label>
//                 <input
//                   type="text"
//                   name="clinic"
//                   value={values.clinic}
//                   onChange={handleInput}
//                   required
//                   placeholder="Enter Clinic"
//                 />
//                 {errors.clinic && <span className="text-danger">{errors.clinic}</span>}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="userID">User ID</label>
//                 <input
//                   type="text"
//                   name="userID"
//                   value={values.userID}
//                   onChange={handleInput}
//                   required
//                   placeholder="Enter User ID"
//                 />
//                 {errors.userID && <span className="text-danger">{errors.userID}</span>}
//               </div>

//               <button type="submit" className='vet-regi-submit'>Register</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VetRegiForm;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VetRegiForm.css'; 

function VetRegiForm() {
  const [values, setValues] = useState({
    vetName: '',
    vetEmail: '',
    vetSpecialization: '',
    vetPhone: '',
    clinic: '',
    userID: ''
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(''); // State for server error messages
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateInputs(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:8800/api/vet/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });

        if (response.ok) {
          alert('Veterinarian registered successfully');
          setServerError(''); // Clear any previous server errors
        } else {
          const errorData = await response.json();
          setServerError(errorData.error || 'Error registering veterinarian');
        }
      } catch (error) {
        setServerError('Failed to connect to the server. Please try again.');
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
    if (!values.vetName) errors.vetName = 'Veterinarian Name is required';
    if (!values.vetEmail) errors.vetEmail = 'Veterinarian Email is required';
    if (!values.vetSpecialization) errors.vetSpecialization = 'Specialization is required';
    if (!values.vetPhone) errors.vetPhone = 'Veterinarian Phone is required';
    if (!values.clinic) errors.clinic = 'Clinic Name is required';
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
    <div className="form-container" style={backgroundStyle}>
      <div className="registration-content">
        <h1 className="welcome-message">Join Our Veterinary Network</h1>
        <div className="registration-card">
          <div className="registration-card-body">
            <h2 className="regi-form-name">Veterinarian Registration</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="vetName">Vet Name</label>
                <input
                  type="text"
                  name="vetName"
                  value={values.vetName}
                  onChange={handleInput}
                  required
                  placeholder="Enter Veterinarian Name"
                />
                {errors.vetName && <span className="text-danger">{errors.vetName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="vetEmail">Vet Email</label>
                <input
                  type="email"
                  name="vetEmail"
                  value={values.vetEmail}
                  onChange={handleInput}
                  required
                  placeholder="Enter Veterinarian Email"
                />
                {errors.vetEmail && <span className="text-danger">{errors.vetEmail}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="vetSpecialization">Specialization</label>
                <input
                  type="text"
                  name="vetSpecialization"
                  value={values.vetSpecialization}
                  onChange={handleInput}
                  required
                  placeholder="Enter Specialization"
                />
                {errors.vetSpecialization && <span className="text-danger">{errors.vetSpecialization}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="vetPhone">Vet Phone</label>
                <input
                  type="text"
                  name="vetPhone"
                  value={values.vetPhone}
                  onChange={handleInput}
                  required
                  placeholder="Enter Phone"
                />
                {errors.vetPhone && <span className="text-danger">{errors.vetPhone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="clinic">Vet Clinic</label>
                <input
                  type="text"
                  name="clinic"
                  value={values.clinic}
                  onChange={handleInput}
                  required
                  placeholder="Enter Clinic"
                />
                {errors.clinic && <span className="text-danger">{errors.clinic}</span>}
              </div>

              <div className="form-group">
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

              {serverError && <div className="text-danger">{serverError}</div>} {/* Display server error here */}

              <button type="submit" className='vet-regi-submit'>Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VetRegiForm;
