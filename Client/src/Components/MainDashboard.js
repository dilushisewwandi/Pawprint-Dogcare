import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainDashboard.css';

const MainDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="admin-dashboard">
           
            <div className="admin-card">
                <h3>Pet Details Management</h3>
                <div>
                    <button className="admin-button" onClick={() => navigate('/petManage/add')}>Add Pet</button>
                    <button className="admin-button" onClick={() => navigate('/petManage/update')}>Update Pet</button>
                    <button className="admin-button" onClick={() => navigate('/petManage/delete')}>Delete Pet</button>
                    <button className="admin-button" onClick={() => navigate('/petManage/find')}>Find Pet</button>
                </div>
            </div>
            <div className="admin-card">
                <h3>Adopter Details Management</h3>
                <div>
                    <button className="admin-button" onClick={() => navigate('/adopter/add')}>Add Adopter</button>
                    <button className="admin-button" onClick={() => navigate('/adopter/update')}>Update Adopter</button>
                    <button className="admin-button" onClick={() => navigate('/adopter/delete')}>Delete Adopter</button>
                    <button className="admin-button" onClick={() => navigate('/adopter/find')}>Find Adopter</button>
                </div>
            </div>
            <div className="admin-card">
                <h3>Distributor Management</h3>
                <div>
                    <button className="admin-button" onClick={() => navigate('/distributorManage/add')}>Add Distributor</button>
                    <button className="admin-button" onClick={() => navigate('/distributorManage/update')}>Update Distributor</button>
                    <button className="admin-button" onClick={() => navigate('/distributorManage/delete')}>Delete Distributor</button>
                    <button className="admin-button" onClick={() => navigate('/distributorManage/find')}>Find Distributor</button>
                </div>
            </div>
            <div className="admin-card">
                <h3>Veterinary Doctor Management</h3>
                <div>
                    <button className="admin-button" onClick={() => navigate('/vet/add')}>Add Vet</button>
                    <button className="admin-button" onClick={() => navigate('/vet/update')}>Update Vet</button>
                    <button className="admin-button" onClick={() => navigate('/vet/delete')}>Delete Vet</button>
                    <button className="admin-button" onClick={() => navigate('/vet/find')}>Find Vet</button>
                </div>   
            </div>
            <div className="admin-card">
                <h3>Daycare Center Management</h3>
                <div>
                    <button className="admin-button" onClick={() => navigate('/daycareManage/add')}>Add Daycare</button>
                    <button className="admin-button" onClick={() => navigate('/daycareManage/update')}>Update Daycare</button>
                    <button className="admin-button" onClick={() => navigate('/daycareManage/delete')}>Delete Daycare</button>
                    <button className="admin-button" onClick={() => navigate('/daycareManage/find')}>Find Daycare</button>
                </div>
            </div>
            </div>
    
    );
};

export default MainDashboard;
