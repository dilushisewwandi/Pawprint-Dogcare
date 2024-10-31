import React, { useState } from 'react';
import axios from 'axios';
import './FindDaycareBooking.css';

const FindDaycareBooking = () => {
    const [userID, setUserID] = useState('');
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleInputChange = (e) => {
        setUserID(e.target.value);
    };

    const fetchBookings = async () => {
        if (!userID) {
            setError('Please enter a valid userID.');
            return;
        }

        setLoading(true);
        setError('');
        
        try {
            const response = await axios.get(`http://localhost:8800/api/daycare/findBookings/${userID}`);
            if (response.data.length > 0) {
                setBookings(response.data);
            } else {
                setError('No bookings found for this user.');
                setBookings([]);
            }
        } catch (err) {
            console.error('Error fetching bookings:', err);
            setError('Failed to retrieve bookings. Please try again later.');
            setBookings([]);
        }

        setLoading(false);
    };

    return (
        <div className="find-daycare-bookings">
            <div className="bookings-card">
                <h2>Find Daycare Bookings</h2>
                <div className="form-group">
                    <label htmlFor="userID">Enter Your User ID:</label>
                    <input
                        type="text"
                        id="userID"
                        value={userID}
                        onChange={handleInputChange}
                    />
                    <button onClick={fetchBookings} disabled={loading}>
                        {loading ? 'Loading...' : 'Find Bookings'}
                    </button>
                </div>
    
                {error && <p className="error">{error}</p>}
    
                {bookings.length > 0 && (
                    <div className="bookingsList">
                        <h3>Your Bookings:</h3>
                        <ul>
                            {bookings.map((booking) => (
                                <li className="bookingCard" key={booking.bookingID}>
                                    <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
                                    <p><strong>Booking Time:</strong> {booking.bookingTime}</p>
                                    <p><strong>Pet Owner Name:</strong> {booking.username}</p>
                                    <p><strong>Owner Phone:</strong> {booking.phone}</p>
                                    <p><strong>Owner Email:</strong> {booking.email}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FindDaycareBooking;
