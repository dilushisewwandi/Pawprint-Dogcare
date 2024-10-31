import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainDashboard.css';

const HealthCardDashBoard = () => {
    const navigate = useNavigate();

    return (
        <div className="admin-dashboard">
            <div className="admin-card">
                <h3>Health Card Management</h3>
                <div>
                    <button className="admin-button" onClick={() => navigate('/healthcard/add')}>Add Health Card</button>
                    <button className="admin-button" onClick={() => navigate('/healthcard/update')}>Update Health Card</button>
                    <button className="admin-button" onClick={() => navigate('/healthcard/delete')}>Delete Health Card</button>
                    <button className="admin-button" onClick={() => navigate('/healthcard/find')}>Find Health Card</button>
                </div>
            </div>
        </div>
    );
};

export default HealthCardDashBoard;

