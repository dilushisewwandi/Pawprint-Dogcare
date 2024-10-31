import React, { useState } from 'react';
import axios from 'axios';
import './DistributorManage.css';

const DistributorManagement = ({ formType }) => {
    const [distributorFormData, setDistributorFormData] = useState({
        disID: '',
        userID: '',
        disName: '',
        disLocation: '',
        disPhone: '',
        disEmail: ''
    });
    const [distributorToDelete, setDistributorToDelete] = useState('');
    const [distributorSearchCriteria, setDistributorSearchCriteria] = useState({
        searchBy: '',
        searchValue: ''
    });
    const [foundDistributors, setFoundDistributors] = useState([]);

    const handleDistributorChange = (e) => {
        const { name, value } = e.target;
        setDistributorFormData({ ...distributorFormData, [name]: value });
    };

    const handleDeleteChange = (e) => {
        setDistributorToDelete(e.target.value);
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setDistributorSearchCriteria({ ...distributorSearchCriteria, [name]: value });
    };

    const handleDistributorSubmit = async (e) => {
        e.preventDefault();

        try {
            let response;
            if (formType === 'add') {
                response = await axios.post('http://localhost:8800/api/distributorManage/add', distributorFormData);
                alert(response.data);
            } else if (formType === 'update') {
                response = await axios.put(`http://localhost:8800/api/distributorManage/update/${distributorFormData.disID}`, distributorFormData);
                alert(response.data);
            }

            setDistributorFormData({
                disID: '',
                userID: '',
                disName: '',
                disLocation: '',
                disPhone: '',
                disEmail: ''
            });
        } catch (error) {
            console.error("Error:", error);
            alert(`An error occurred: ${error.message}`);
        }
    };

    const handleDistributorDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete(`http://localhost:8800/api/distributorManage/delete/${distributorToDelete}`);
            alert(response.data);
        } catch (error) {
            console.error("Error:", error);
            alert(`An error occurred: ${error.message}`);
        }
    };

    const handleDistributorSearch = async (e) => {
        e.preventDefault();

        try {
            const { searchBy, searchValue } = distributorSearchCriteria;
            let response;
            if (searchBy === 'all') {
                response = await axios.get('http://localhost:8800/api/distributorManage/findAll');
            } else {
                response = await axios.get(`http://localhost:8800/api/distributorManage/findBy${searchBy.charAt(0).toUpperCase() + searchBy.slice(1)}/${searchValue}`);
            }
            setFoundDistributors(response.data);
        } catch (error) {
            console.error("Error:", error);
            alert(`An error occurred: ${error.message}`);
        }
    };

    return (
        <div className="distributor-management-container">
            <h2>
                {formType === 'add'
                    ? 'Add Distributor'
                    : formType === 'update'
                    ? 'Update Distributor'
                    : formType === 'delete'
                    ? 'Delete Distributor'
                    : 'Find Distributor'}
            </h2>
            <form
                onSubmit={
                    formType === 'delete'
                        ? handleDistributorDelete
                        : formType === 'find'
                        ? handleDistributorSearch
                        : handleDistributorSubmit
                }
            >
                {formType !== 'delete' && formType !== 'find' && (
                    <>
                        <div className="form-row">
                            <label>User ID</label>
                            <input
                                type="text"
                                name="userID"
                                value={distributorFormData.userID}
                                onChange={handleDistributorChange}
                                placeholder="Enter User ID"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <label>Distributor Name</label>
                            <input
                                type="text"
                                name="disName"
                                value={distributorFormData.disName}
                                onChange={handleDistributorChange}
                                placeholder="Enter Distributor Name"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <label>Distributor Location</label>
                            <input
                                type="text"
                                name="disLocation"
                                value={distributorFormData.disLocation}
                                onChange={handleDistributorChange}
                                placeholder="Enter Distributor Location"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <label>Distributor Phone</label>
                            <input
                                type="text"
                                name="disPhone"
                                value={distributorFormData.disPhone}
                                onChange={handleDistributorChange}
                                placeholder="Enter Distributor Phone"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <label>Distributor Email</label>
                            <input
                                type="email"
                                name="disEmail"
                                value={distributorFormData.disEmail}
                                onChange={handleDistributorChange}
                                placeholder="Enter Distributor Email"
                                required
                            />
                        </div>
                    </>
                )}

                {formType === 'update' && (
                    <div className="form-row">
                        <label>Distributor ID</label>
                        <input
                            type="text"
                            name="disID"
                            value={distributorFormData.disID}
                            onChange={handleDistributorChange}
                            placeholder="Enter Distributor ID"
                            required
                        />
                    </div>
                )}

                {formType === 'delete' && (
                    <div className="form-row">
                        <label>Distributor ID to Delete</label>
                        <input
                            type="text"
                            value={distributorToDelete}
                            onChange={handleDeleteChange}
                            placeholder="Enter Distributor ID to Delete"
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
                                <option value="all">Find All Distributors</option>
                                <option value="id">Find by ID</option>
                                <option value="location">Find by Location</option>
                            </select>
                        </div>

                        {distributorSearchCriteria.searchBy !== 'all' && (
                            <div className="form-row">
                                <label>{`Enter ${distributorSearchCriteria.searchBy}`}</label>
                                <input
                                    type="text"
                                    name="searchValue"
                                    placeholder={`Enter ${distributorSearchCriteria.searchBy}`}
                                    onChange={handleSearchChange}
                                    required
                                />
                            </div>
                        )}
                    </>
                )}

                <button type="submit">
                    {formType === 'delete'
                        ? 'Delete'
                        : formType === 'find'
                        ? 'Search'
                        : formType === 'add'
                        ? 'Add Distributor'
                        : 'Update Distributor'}
                </button>
            </form>

            {formType === 'find' && foundDistributors.length > 0 && (
                <div className="distributor-found-distributors">
                    <h3>Found Distributors:</h3>
                    {foundDistributors.map((distributor) => (
                        <div key={distributor.disID} className="distributor-card">
                            <h4>{distributor.disName}</h4>
                            <p>ID: {distributor.disID}</p>
                            <p>Location: {distributor.disLocation}</p>
                            <p>Phone: {distributor.disPhone}</p>
                            <p>Email: {distributor.disEmail}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DistributorManagement;
