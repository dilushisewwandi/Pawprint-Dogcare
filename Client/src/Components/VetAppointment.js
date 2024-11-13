import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const VetAppointment = ({ vetId }) => {
    const navigate = useNavigate(); 
    const [showForm, setShowForm] = useState(false);
    const [appointmentDetails, setAppointmentDetails] = useState({
        appointmentDate: '',
        appointmentTime: '',
        userID: '',
        petName: '',
        petAge: '',
        petBreed: '',
        reason: '',
        name: '',
        phone: '',
        email: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointmentDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        const newErrors = {};
        if (!appointmentDetails.appointmentDate) newErrors.appointmentDate = 'Appointment Date is required';
        if (!appointmentDetails.appointmentTime) newErrors.appointmentTime = 'Appointment Time is required';
        if (!appointmentDetails.userID) newErrors.userID = 'User ID is required';
        if (!appointmentDetails.petName) newErrors.petName = 'Pet name is required';
        if (!appointmentDetails.petAge) newErrors.petAge = 'Pet age is required';
        if (!appointmentDetails.petBreed) newErrors.petBreed = 'Pet breed is required';
        if (!appointmentDetails.reason) newErrors.reason = 'Reason is required';
        if (!appointmentDetails.name) newErrors.name = 'Your name is required';
        if (!appointmentDetails.phone) newErrors.phone = 'Phone number is required';
        if (!appointmentDetails.email) newErrors.email = 'Email address is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            console.log('Booking appointment with vetID:', vetId);
            await axios.post('http://localhost:8800/api/vet/vetAppointment', {
                ...appointmentDetails,
                vetID: vetId,
            });
            
            setSuccessMessage('Appointment booked successfully!');
        } catch (error) {
            console.error('Error booking vet appointment:', error);
        }
    };

    return (
        <div>
        <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
        >
            {showForm ? 'Cancel Appointment' : 'Get Appointment'}
        </button>

        {showForm && (
            <form onSubmit={handleSubmit} className="mt-3">
                {successMessage && <p className="text-success">{successMessage}</p>}
                {Object.keys(errors).map((key) => (
                    <p key={key} className="text-danger">{errors[key]}</p>
                ))}
            
                <div className="form-group">
                    <label htmlFor="petName">Pet Name</label>
                    <input
                        type="text"
                        id="petName"
                        name="petName"
                        value={appointmentDetails.petName}
                        onChange={handleChange}
                        required
                        placeholder="Enter Pet Name"
                        className="form-control rounded"
                    />
                </div>
           
                <div className="form-group">
                    <label htmlFor="petAge">Pet Age</label>
                    <input
                        type="number"
                        id="petAge"
                        name="petAge"
                        value={appointmentDetails.petAge}
                        onChange={handleChange}
                        required
                        placeholder="Enter Pet Age"
                        className="form-control rounded"
                    />
                </div>
       
                <div className="form-group">
                    <label htmlFor="breed">Pet Breed</label>
                    <input
                        type="text"
                        id="breed"
                        name="petBreed"
                        value={appointmentDetails.petBreed}
                        onChange={handleChange}
                        required
                        placeholder="Enter Pet Breed"
                        className="form-control rounded"
                    />
                </div>
   
                <div className="form-group">
                    <label htmlFor="reason">Reason</label>
                    <input
                        type="text"
                        id="reason"
                        name="reason"
                        value={appointmentDetails.reason}
                        onChange={handleChange}
                        required
                        placeholder="Enter Reason for Appointment"
                        className="form-control rounded"
                    />
                    
                </div>
     
                <div className="form-group">
                    <label htmlFor="userID">User ID</label>
                    <input
                        type="text"
                        id="userID"
                        name="userID"
                        value={appointmentDetails.userID}
                        onChange={handleChange}
                        required
                        placeholder="Enter User ID"
                        className="form-control rounded"
                    />
                </div>
      
                <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={appointmentDetails.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter Your Username"
                        className="form-control rounded"
                    />
                </div>
       
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={appointmentDetails.phone}
                        onChange={handleChange}
                        required
                        placeholder="Enter Your Phone Number"
                        className="form-control rounded"
                    />
                </div>
       
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={appointmentDetails.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter Your Email Address"
                        className="form-control rounded"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="appointmentDate">Appointment Date</label>
                    <input
                        type="date"
                        id="appointmentDate"
                        name="appointmentDate"
                        value={appointmentDetails.appointmentDate}
                        onChange={handleChange}
                        required
                        className="form-control rounded"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="appointmentTime">Appointment Time</label>
                    <input
                        type="time"
                        id="appointmentTime"
                        name="appointmentTime"
                        value={appointmentDetails.appointmentTime}
                        onChange={handleChange}
                        required
                        className="form-control rounded"
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit Appointment</button>
            </form>
        )}
</div>
    );
};

export default VetAppointment;
