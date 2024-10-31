import React, { useState } from 'react';
import axios from 'axios';
import './VetManage.css';

const VetManagement = ({ formType }) => {
    const [vetFormData, setVetFormData] = useState({
        vetID: '',
        vetName: '',
        vetEmail: '',
        vetSpecialization: '',
        vetPhone: '',
        clinic: '',
        userID: ''
    });
    const [searchCriteria, setSearchCriteria] = useState({
        searchBy: '',
        searchValue: ''
    });
    const [foundVets, setFoundVets] = useState([]);

    const handleVetChange = (e) => {
        const { name, value } = e.target;
        setVetFormData({ ...vetFormData, [name]: value });
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria({ ...searchCriteria, [name]: value });
    };

    const handleVetSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8800/api/vetManage/add', vetFormData);
            alert(response.data);
            setVetFormData({
                vetID: '',
                vetName: '',
                vetEmail: '',
                vetSpecialization: '',
                vetPhone: '',
                clinic: '',
                userID: ''
            });
        } catch (err) {
            console.error(err);
            alert('Error adding veterinarian: ' + err.message);
        }
    };

    const handleUpdateVetSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8800/api/vetManage/update/${vetFormData.vetID}`, vetFormData);
            alert(response.data);
        } catch (err) {
            console.error(err);
            alert('Error updating veterinarian: ' + err.message);
        }
    };

    const handleVetDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:8800/api/vetManage/delete/${vetFormData.vetID}`);
            alert(response.data);
        } catch (err) {
            console.error(err);
            alert('Error deleting veterinarian: ' + err.message);
        }
    };

    const handleVetSearch = async (e) => {
        e.preventDefault();
        try {
            const { searchBy, searchValue } = searchCriteria;
            let response;
            if (searchBy === 'id') {
                response = await axios.get(`http://localhost:8800/api/vetManage/findById/${searchValue}`);
            } else if (searchBy === 'specialization') {
                response = await axios.get(`http://localhost:8800/api/vetManage/findBySpecialization/${searchValue}`);
            } else if (searchBy === 'clinic') {
                response = await axios.get(`http://localhost:8800/api/vetManage/findByClinic/${searchValue}`);
            } else {
                response = await axios.get('http://localhost:8800/api/vetManage/findAll');
            }
            setFoundVets(response.data);
        } catch (err) {
            console.error(err);
            alert(`Error finding vets: ${err.message}`);
        }
    };

    return (
        <div className="vet-management-container">
            <h2>
                {formType === 'add' ? 'Add Veterinarian' :
                 formType === 'update' ? 'Update Veterinarian' :
                 formType === 'delete' ? 'Delete Veterinarian' :
                 'Find Veterinarian'}
            </h2>
            <form onSubmit={
                formType === 'delete' ? handleVetDelete :
                formType === 'find' ? handleVetSearch :
                formType === 'update' ? handleUpdateVetSubmit :
                handleVetSubmit
            }>
                {formType !== 'delete' && formType !== 'find' && (
                    <>
                        <div className="form-row">
                            <label>Veterinarian Name</label>
                            <input
                                type="text"
                                name="vetName"
                                value={vetFormData.vetName}
                                onChange={handleVetChange}
                                placeholder="Enter Veterinarian Name"
                                required
                            />
                        </div>
                        <div className="form-row">
                            <label>Email</label>
                            <input
                                type="email"
                                name="vetEmail"
                                value={vetFormData.vetEmail}
                                onChange={handleVetChange}
                                placeholder="Enter Email"
                                required
                            />
                        </div>
                        <div className="form-row">
                            <label>Specialization</label>
                            <input
                                type="text"
                                name="vetSpecialization"
                                value={vetFormData.vetSpecialization}
                                onChange={handleVetChange}
                                placeholder="Enter Specialization"
                                required
                            />
                        </div>
                        <div className="form-row">
                            <label>Phone</label>
                            <input
                                type="text"
                                name="vetPhone"
                                value={vetFormData.vetPhone}
                                onChange={handleVetChange}
                                placeholder="Enter Phone"
                                required
                            />
                        </div>
                        <div className="form-row">
                            <label>Clinic</label>
                            <input
                                type="text"
                                name="clinic"
                                value={vetFormData.clinic}
                                onChange={handleVetChange}
                                placeholder="Enter Clinic"
                                required
                            />
                        </div>
                        <div className="form-row">
                            <label>User ID</label>
                            <input
                                type="text"
                                name="userID"
                                value={vetFormData.userID}
                                onChange={handleVetChange}
                                placeholder="Enter User ID"
                                required
                            />
                        </div>
                    </>
                )}

                {formType === 'update' && (
                    <div className="form-row">
                        <label>Veterinarian ID</label>
                        <input
                            type="text"
                            name="vetID"
                            value={vetFormData.vetID}
                            onChange={handleVetChange}
                            placeholder="Enter Veterinarian ID"
                            required
                        />
                    </div>
                )}

                {formType === 'delete' && (
                    <div className="form-row">
                        <label>Veterinarian ID to Delete</label>
                        <input
                            type="text"
                            name="vetID"
                            value={vetFormData.vetID}
                            onChange={handleVetChange}
                            placeholder="Enter Veterinarian ID to Delete"
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
                                <option value="all">Find All Veterinarians</option>
                                <option value="id">Find by ID</option>
                                <option value="specialization">Find by Specialization</option>
                                <option value="clinic">Find by Clinic</option>
                            </select>
                        </div>

                        {searchCriteria.searchBy !== 'all' && (
                            <div className="form-row">
                                <label>{`Enter ${searchCriteria.searchBy}`}</label>
                                <input
                                    type="text"
                                    name="searchValue"
                                    placeholder={`Enter ${searchCriteria.searchBy}`}
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
                        ? 'Add Veterinarian'
                        : 'Update Veterinarian'}
                </button>
            </form>

            {formType === 'find' && foundVets.length > 0 && (
                <div className="vet-found-vets">
                    <h3>Found Veterinarians:</h3>
                    {foundVets.map((vet) => (
                        <div key={vet.vetID} className="vet-vet-card">
                            <h4>{vet.vetName}</h4>
                            <p>ID: {vet.vetID}</p>
                            <p>Specialization: {vet.vetSpecialization}</p>
                            <p>Clinic: {vet.clinic}</p>
                            <p>Phone: {vet.vetPhone}</p>
                            <p>Email: {vet.vetEmail}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VetManagement;
