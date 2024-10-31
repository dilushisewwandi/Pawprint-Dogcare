import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DaycareBooking from './DaycareBooking';
import './Daycare.css';

const Daycare = () => {
  const { dcID } = useParams();
  const [daycare, setDaycare] = useState([]);
  const [activeBookingForm, setActiveBookingForm] = useState(null); // To track the active booking form

  useEffect(() => {
    fetchDaycareDetails();
  }, []);

  const fetchDaycareDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api/daycare/daycare`);
      setDaycare(response.data);
    } catch (error) {
      console.error('Error fetching daycare details:', error);
    }
  };

  const handleBookingButtonClick = (dcID) => {
    if (activeBookingForm === dcID) {
      setActiveBookingForm(null); // Close the form if clicked again
    } else {
      setActiveBookingForm(dcID); // Open the clicked form
    }
  };

  if (!daycare.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="daycare-profile-container">
      {/* Hero section for the image and welcome message */}
      <div className="dc-hero-section">
        <div className="dc-welcome-message">
          <h1>Welcome to Our Daycares!</h1>
          <p>
            Explore the best care facilities for your pets. Each daycare offers unique services tailored
            to ensure your pets are well taken care of.
          </p>
        </div>
      </div>

      {/* Daycare cards */}
      <div className="daycare-card-container">
        {daycare.map((dc) => (
          <div key={dc.dcID} className="daycare-card">
            <div className="daycare-details">
              <h2>{dc.dcName}</h2>
              <p><strong>Daycare ID:</strong> {dc.dcID}</p>
              <p><strong>Location:</strong> {dc.dcLocation}</p>
              <p><strong>Phone:</strong> {dc.dcPhone}</p>
              <p><strong>Email:</strong> {dc.dcEmail}</p>
              <p><strong>Open Days:</strong> {dc.openDays}</p>
              <p><strong>Open Times:</strong> {dc.openTimes}</p>
              <p><strong>No of Staff Members:</strong> {dc.noOfStaffMembers}</p>
              <p><strong>Amenities Offered:</strong> {dc.amenitiesOffered}</p>
              <p><strong>Safety Features:</strong> {dc.safetyFeatures}</p>
              
              {/* Button to toggle the booking form */}
              <button 
                className="btn btn-primary"
                onClick={() => handleBookingButtonClick(dc.dcID)}
              >
                {activeBookingForm === dc.dcID ? 'Cancel Booking' : 'Add Booking'}
              </button>
              
              {/* Show the booking form only if this card's dcID matches the active one */}
              {activeBookingForm === dc.dcID && <DaycareBooking daycareId={dc.dcID} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Daycare;
