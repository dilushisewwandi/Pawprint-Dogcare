import React, { useState } from 'react';
import axios from 'axios';
import './ViewDaycareSchedule.css';

const ViewDaycareSchedule = () => {
    const [userID, setUserID] = useState('');
    const [schedules, setSchedules] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleInputChange = (e) => {
        setUserID(e.target.value);
    };

    const fetchSchedules = async () => {
        if (!userID) {
            setError('Please enter a valid userID.');
            return;
        }

        setLoading(true);
        setError('');
        
        try {
            const response = await axios.get(`http://localhost:8800/api/daycare/viewSchedule/${userID}`);
            if (response.data.length > 0) {
                setSchedules(response.data);
            } else {
                setError('No schedules found for this user.');
                setSchedules([]);
            }
        } catch (err) {
            console.error('Error fetching schedules:', err);
            setError('Failed to retrieve schedules. Please try again later.');
            setSchedules([]);
        }

        setLoading(false);
    };

    return (
        <div className="view-daycare-schedule">
            <div className="schedule-card">
                <h2>View Daycare Schedules</h2>
                <div className="form-group">
                    <label htmlFor="userID">Enter Your User ID:</label>
                    <input
                        type="text"
                        id="userID"
                        value={userID}
                        onChange={handleInputChange}
                    />
                    <button onClick={fetchSchedules} disabled={loading}>
                        {loading ? 'Loading...' : 'View Schedules'}
                    </button>
                </div>
    
                {error && <p className="error">{error}</p>}
    
                {schedules.length > 0 && (
                    <div className="schedules-list">
                        <h3>Your Schedules:</h3>
                        <ul>
                            {schedules.map((schedule) => (
                                <li key={schedule.scheduleID}>
                                    <p><strong>Date of sheduled:</strong> {schedule.bookingDate}</p>
                                    <p><strong>Time of sheduled:</strong> {schedule.bookingTime}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewDaycareSchedule;
