import React, { useState } from 'react';
import axios from 'axios';

const DaycareBooking = ({ daycareId }) => {
    const [bookingDetails, setBookingDetails] = useState({
        userID: '',
        name: '',
        phone: '',
        email: '',
        petName: '',
        petAge: '',
        petBreed: '',
        bookingDate: '', 
        bookingTime:''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const newErrors = {};
        if (!bookingDetails.userID) newErrors.userID = 'User ID is required';
        if (!bookingDetails.name) newErrors.name = 'Name is required';
        if (!bookingDetails.phone) newErrors.phone = 'Phone number is required';
        if (!bookingDetails.email) newErrors.email = 'Email address is required';
        if (!bookingDetails.petName) newErrors.petName = 'Pet name is required';
        if (!bookingDetails.petAge) newErrors.petAge = 'Pet age is required';
        if (!bookingDetails.petBreed) newErrors.petBreed = 'Pet breed is required';
        if (!bookingDetails.bookingDate) newErrors.bookingDate = 'Booking date is required';
        if (!bookingDetails.bookingTime) newErrors.bookingTime = 'Booking time is required';
    
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8800/api/daycare/book', {
                ...bookingDetails,
                dcID: daycareId,
            });
    
            alert('Daycare Booking is successfully done!');
  
        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert('User not found or User ID and Email do not match. Redirecting to signup.');
                window.location.href = '/signup'; 
            } else {
                console.error('Error booking daycare:', error);
                alert('Failed to book daycare. Please try again.');
            }
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="mt-3">
                    <div className="form-group">
                        <label htmlFor="userID">User ID</label>
                        <input
                            type="text"
                            id="userID"
                            name="userID"
                            value={bookingDetails.userID}
                            onChange={handleChange}
                            required
                            placeholder="Enter User ID"
                            className="form-control rounded"
                        />
                        {errors.userID && <span className="text-danger">{errors.userID}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={bookingDetails.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter Your Name"
                            className="form-control rounded"
                        />
                        {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={bookingDetails.phone}
                            onChange={handleChange}
                            required
                            placeholder="Enter Phone Number"
                            className="form-control rounded"
                        />
                        {errors.phone && <span className="text-danger">{errors.phone}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={bookingDetails.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter Email Address"
                            className="form-control rounded"
                        />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="petName">Pet Name</label>
                        <input
                            type="text"
                            id="petName"
                            name="petName"
                            value={bookingDetails.petName}
                            onChange={handleChange}
                            required
                            placeholder="Enter Pet Name"
                            className="form-control rounded"
                        />
                        {errors.petName && <span className="text-danger">{errors.petName}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="petAge">Pet Age</label>
                        <input
                            type="number"
                            id="petAge"
                            name="petAge"
                            value={bookingDetails.petAge}
                            onChange={handleChange}
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
                            id="petBreed"
                            name="petBreed"
                            value={bookingDetails.petBreed}
                            onChange={handleChange}
                            required
                            placeholder="Enter Pet Breed"
                            className="form-control rounded"
                        />
                        {errors.petBreed && <span className="text-danger">{errors.petBreed}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="bookingDate">Booking Date</label>
                        <input
                            type="date"
                            id="bookingDate"
                            name="bookingDate"
                            value={bookingDetails.bookingDate}
                            onChange={handleChange}
                            required
                            className="form-control rounded"
                        />
                        {errors.bookingDate && <span className="text-danger">{errors.bookingDate}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="bookingTime">Booking Time</label>
                        <input
                            type="time"
                            id="bookingTime"
                            name="bookingTime"
                            value={bookingDetails.bookingTime}
                            onChange={handleChange}
                            required
                            className="form-control rounded"
                        />
                        {errors.bookingTime && <span className="text-danger">{errors.bookingTime}</span>}
                    </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default DaycareBooking;

