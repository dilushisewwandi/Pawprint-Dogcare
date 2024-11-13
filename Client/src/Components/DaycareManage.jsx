import React, { useState } from 'react';
import axios from 'axios';
import './DaycareManage.css';

const DaycareManage = ({ formType }) => {
    const [daycareFormData, setDaycareFormData] = useState({
        dcID: '',
        userID: '', 
        dcName: '',
        dcLocation: '',
        dcPhone: '',
        dcEmail: '',
        openDays: '',
        openTimes: '',
        noOfStaffMembers: '',
        amenitiesOffered: '',
        safetyFeatures: ''
    });
    const [daycareToDelete, setDaycareToDelete] = useState('');
    const [daycareSearchCriteria, setDaycareSearchCriteria] = useState({
        searchBy: '',
        searchValue: ''
    });
    const [foundDaycares, setFoundDaycares] = useState([]);

    const handleDaycareChange = (e) => {
        const { name, value } = e.target;
        setDaycareFormData({ ...daycareFormData, [name]: value });
    };

    const handleDeleteChange = (e) => {
        setDaycareToDelete(e.target.value);
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setDaycareSearchCriteria({ ...daycareSearchCriteria, [name]: value });
    };

    const handleDaycareSubmit = async (e) => {
        e.preventDefault();
    
        try {
            let response;
            if (formType === 'add') {
                response = await axios.post('http://localhost:8800/api/daycareManage/add', daycareFormData);
                alert(response.data.message);
            } else if (formType === 'update') {
                response = await axios.put(`http://localhost:8800/api/daycareManage/update/${daycareFormData.dcID}`, daycareFormData);
                alert(response.data.message);
            }
    
            setDaycareFormData({
                dcID: '',
                userID: '', 
                dcName: '',
                dcLocation: '',
                dcPhone: '',
                dcEmail: '',
                openDays: '',
                openTimes: '',
                noOfStaffMembers: '',
                amenitiesOffered: '',
                safetyFeatures: ''
            });
        } catch (error) {
            console.error("Error:", error);
            alert(`An error occurred: ${error.message}`);
        }
    };

    const handleDaycareDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete(`http://localhost:8800/api/daycareManage/delete/${daycareToDelete}`);
            alert(response.data.message);
        } catch (error) {
            console.error("Error:", error);
            alert(`An error occurred: ${error.message}`);
        }
    };

    const handleDaycareSearch = async (e) => {
        e.preventDefault();

        try {
            const { searchBy, searchValue } = daycareSearchCriteria;
            let response;
            if (searchBy === 'all') {
                response = await axios.get('http://localhost:8800/api/daycareManage/findAll');
            } else {
                response = await axios.get(`http://localhost:8800/api/daycareManage/findBy${searchBy.charAt(0).toUpperCase() + searchBy.slice(1)}/${searchValue}`);
            }
            setFoundDaycares(response.data);
        } catch (error) {
            console.error("Error:", error);
            alert(`An error occurred: ${error.message}`);
        }
    };

    return (
        <div className="daycare-management-container">
            <h2>
                {formType === 'add'
                    ? 'Add Daycare'
                    : formType === 'update'
                    ? 'Update Daycare'
                    : formType === 'delete'
                    ? 'Delete Daycare'
                    : 'Find Daycare'}
            </h2>
            <form
                onSubmit={
                    formType === 'delete'
                        ? handleDaycareDelete
                        : formType === 'find'
                        ? handleDaycareSearch
                        : handleDaycareSubmit
                }
            >
                {formType === 'add' && (
                    <div className="form-row">
                        <label>User ID</label>
                        <input
                            type="text"
                            name="userID"
                            value={daycareFormData.userID}
                            onChange={handleDaycareChange}
                            placeholder="Enter user ID"
                            required
                        />
                    </div>
                )}

                {formType !== 'delete' && formType !== 'find' && (
                    <>
                        <div className="form-row">
                            <label>Daycare Name</label>
                            <input
                                type="text"
                                name="dcName"
                                value={daycareFormData.dcName}
                                onChange={handleDaycareChange}
                                placeholder="Enter Daycare Name"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <label>Location</label>
                            <input
                                type="text"
                                name="dcLocation"
                                value={daycareFormData.dcLocation}
                                onChange={handleDaycareChange}
                                placeholder="Enter Location"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <label>Phone</label>
                            <input
                                type="text"
                                name="dcPhone"
                                value={daycareFormData.dcPhone}
                                onChange={handleDaycareChange}
                                placeholder="Enter Phone"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <label>Email</label>
                            <input
                                type="email"
                                name="dcEmail"
                                value={daycareFormData.dcEmail}
                                onChange={handleDaycareChange}
                                placeholder="Enter Email"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <label>Open Days</label>
                            <input
                                type="text"
                                name="openDays"
                                value={daycareFormData.openDays}
                                onChange={handleDaycareChange}
                                placeholder="Enter Open Days"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <label>Open Times</label>
                            <input
                                type="text"
                                name="openTimes"
                                value={daycareFormData.openTimes}
                                onChange={handleDaycareChange}
                                placeholder="Enter Open Times"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <label>Staff Members</label>
                            <input
                                type="number"
                                name="noOfStaffMembers"
                                value={daycareFormData.noOfStaffMembers}
                                onChange={handleDaycareChange}
                                placeholder="Enter Staff Members"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <label>Amenities Offered</label>
                            <input
                                type="text"
                                name="amenitiesOffered"
                                value={daycareFormData.amenitiesOffered}
                                onChange={handleDaycareChange}
                                placeholder="Enter Amenities"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <label>Safety Features</label>
                            <input
                                type="text"
                                name="safetyFeatures"
                                value={daycareFormData.safetyFeatures}
                                onChange={handleDaycareChange}
                                placeholder="Enter Safety Features"
                                required
                            />
                        </div>
                    </>
                )}

                {formType === 'update' && (
                    <div className="form-row">
                        <label>Daycare ID</label>
                        <input
                            type="text"
                            name="dcID"
                            value={daycareFormData.dcID}
                            onChange={handleDaycareChange}
                            placeholder="Enter Daycare ID"
                            required
                        />
                    </div>
                )}

                {formType === 'delete' && (
                    <div className="form-row">
                        <label>Daycare ID to Delete</label>
                        <input
                            type="text"
                            value={daycareToDelete}
                            onChange={handleDeleteChange}
                            placeholder="Enter Daycare ID to Delete"
                            required
                        />
                    </div>
                )}

                {formType === 'find' && (
                    <>
                        <div className="form-row">
                            <label>Search By</label>
                            <select name="searchBy" onChange={handleSearchChange} required>
                                <option value="">Select Search Criteria</option>
                                <option value="all">Find All Daycares</option>
                                <option value="id">Find by ID</option>
                                <option value="location">Find by Location</option>
                                <option value="userid">Find by User ID</option>
                            </select>
                        </div>

                        {daycareSearchCriteria.searchBy !== 'all' && (
                            <div className="form-row">
                                <label>{`Enter ${daycareSearchCriteria.searchBy}`}</label>
                                <input
                                    type="text"
                                    name="searchValue"
                                    placeholder={`Enter ${daycareSearchCriteria.searchBy}`}
                                    onChange={handleSearchChange}
                                    required
                                />
                            </div>
                        )}
                    </>
                )}

                <button type="submit">
                    {formType === 'delete' ? 'Delete Daycare' : formType === 'find' ? 'Search Daycare' : formType === 'add' ? 'Add Daycare' : 'Update Daycare'}
                </button>
            </form>

            {formType === 'find' && foundDaycares.length > 0 && (
                <div>
                    <h3>Found Daycares:</h3>
                    <ul>
                        {foundDaycares.map((daycare) => (
                           <div key={daycare.dcID} className="d-daycare-card">
                           <h4>{daycare.dcName}</h4>
                           <p>ID: {daycare.dcID}</p>
                           <p>Location: {daycare.dcLocation}</p>
                           <p>Phone: {daycare.dcPhone}</p>
                           <p>Email: {daycare.dcEmail}</p>
                           <p>Open Days: {daycare.openDays}</p>
                           <p>Open Times: {daycare.openTimes}</p>
                           <p>Staff Members: {daycare.noOfStaffMembers}</p>
                           <p>Amenities: {daycare.amenitiesOffered}</p>
                           <p>Safety Features: {daycare.safetyFeatures}</p>
                       </div>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DaycareManage;
