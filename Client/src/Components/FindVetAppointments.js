import React, { useState } from 'react';
import axios from 'axios';
import styles from './FindVetAppointments.module.css';

const FindVetAppointments = () => {
    const [userID, setUserID] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleInputChange = (e) => {
        setUserID(e.target.value);
    };

    const fetchAppointments = async () => {
        if (!userID) {
            setError('Please enter a valid userID.');
            return;
        }

        setLoading(true);
        setError('');
        
        try {
            const response = await axios.get(`http://localhost:8800/api/vet/findVetAppointments/${userID}`);
            if (response.data.length > 0) {
                setAppointments(response.data);
            } else {
                setError('No appointments found for this veterinarian.');
                setAppointments([]);
            }
        } catch (err) {
            console.error('Error fetching appointments:', err);
            setError('Failed to retrieve appointments. Please try again later.');
            setAppointments([]);
        }

        setLoading(false);
    };

    return (
        <div className={styles.findVetAppointments}>
            <div className={styles.appointmentsCard}>
                <h2>Find Vet Appointments</h2>
                <div className={styles.appointmentsFormGroup}>
                    <label htmlFor="userID" className={styles.appointmentsLabel}>Enter Your User ID:</label>
                    <input
                        type="text"
                        id="userID"
                        value={userID}
                        onChange={handleInputChange}
                        className={styles.appointmentsInput}
                    />
                    <button onClick={fetchAppointments} disabled={loading} className={styles.appointmentsButton}>
                        {loading ? 'Loading...' : 'Find Appointments'}
                    </button>
                </div>
    
                {error && <p className={styles.appointmentsError}>{error}</p>}
    
                {appointments.length > 0 && (
                    <div className={styles.appointmentsList}>
                        <h3>Your Appointments:</h3>
                        <ul>
                            {appointments.map((appointment) => (
                                <li key={appointment.appointmentID} className={styles.appointmentCard}>
                                    <p><strong>Pet Name:</strong> {appointment.petName}</p>
                                    <p><strong>Owner Name:</strong> {appointment.name}</p>
                                    <p><strong>Owner Phone:</strong> {appointment.phone}</p>
                                    <p><strong>Owner Email:</strong> {appointment.email}</p>
                                    <p><strong>Reason:</strong> {appointment.reason}</p>
                                    <p><strong>Date:</strong> {appointment.appointmentDate}</p>
                                    <p><strong>Time:</strong> {appointment.appointmentTime}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FindVetAppointments;
