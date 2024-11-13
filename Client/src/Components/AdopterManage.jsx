import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdopterManage.css';

const AdopterManagement = ({ formType }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userID: '',
        adoID: '',
        adoName: '',
        adoNIC: '',
        adoAge: '',
        adoJob: '',
        adoGender: '',
        adoLocation: '',
        adoEmail: '',
        adoPhone: '',
        householdComposition: '',
        reasonForAdoption: ''
    });
    const [searchCriteria, setSearchCriteria] = useState({
        searchBy: '',
        searchValue: ''
    });
    const [foundAdopters, setFoundAdopters] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria({ ...searchCriteria, [name]: value });
    };

    // const handleSubmit = async (e, url, method) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios({ method, url, data: formData });
    //         alert(response.data);
    //     } catch (err) {
    //         // console.error(err);
    //         // alert(`Error ${formType} adopter: ${err.response?.data?.error || err.message}`);
    //         console.error(err);
    //         const errorMessage = err.response?.data?.error || err.message; 
    //         alert(`Error deleting adopter: ${errorMessage}`); 
    //     }
    // };
    const handleSubmit = async (e, url, method) => {
        e.preventDefault();
        try {
            const response = await axios({ method, url, data: formData });
            alert(response.data);  
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.error || err.message; 
            // alert(`Error adding adopter: ${errorMessage}`); 
            alert(`Error: ${errorMessage}`); 
        }
    };
    

    const handleAdopterSearch = async (e) => {
        e.preventDefault();
        try {
            const { searchBy, searchValue } = searchCriteria;
            const response = await axios.get(
                `http://localhost:8800/api/adopter/find/${searchBy}/${searchValue || ''}`
            );
            setFoundAdopters(response.data);
        } catch (err) {
            console.error(err);
            alert(`Error finding adopters: ${err.response?.data?.error || err.message}`);
        }
    };

    const getUrlAndMethod = () => {
        if (formType === 'delete') return [`http://localhost:8800/api/adopter/delete/${formData.adoID}`, 'delete'];
        if (formType === 'update') return [`http://localhost:8800/api/adopter/update/${formData.adoID}`, 'put'];
        if (formType === 'add') return ['http://localhost:8800/api/adopter/add', 'post'];
        return ['', ''];
    };

    const [url, method] = getUrlAndMethod();

    return (
        <div className="adopter-management-container">
            <h2>{formType === 'add' ? 'Add Adopter' : formType === 'update' ? 'Update Adopter' : formType === 'delete' ? 'Delete Adopter' : 'Find Adopter'}</h2>

            <form onSubmit={(e) => (formType === 'find' ? handleAdopterSearch(e) : handleSubmit(e, url, method))}>
                {formType === 'update' && (
                    <div className="form-row">
                        <label>Adopter ID</label>
                        <input type="text" name="adoID" value={formData.adoID} onChange={handleChange} required />
                    </div>
                )}
                
                {formType !== 'delete' && formType !== 'find' && (
                    <>
                        <div className="form-row">
                            <label>User ID</label>
                            <input type="text" name="userID" value={formData.userID} onChange={handleChange} required />
                        </div>
                        <div className="form-row">
                            <label>Adopter Name</label>
                            <input type="text" name="adoName" value={formData.adoName} onChange={handleChange} required />
                        </div>
                        <div className="form-row">
                            <label>Adopter NIC</label>
                            <input type="text" name="adoNIC" value={formData.adoNIC} onChange={handleChange} required />
                        </div>
                        <div className="form-row">
                            <label>Adopter Age</label>
                            <input type="number" name="adoAge" value={formData.adoAge} onChange={handleChange} required />
                        </div>
                        <div className="form-row">
                            <label>Adopter Job</label>
                            <input type="text" name="adoJob" value={formData.adoJob} onChange={handleChange} required />
                        </div>
                        <div className="form-row">
                            <label>Adopter Gender</label>
                            <select name="adoGender" value={formData.adoGender} onChange={handleChange} required>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="form-row">
                            <label>Adopter Location</label>
                            <input type="text" name="adoLocation" value={formData.adoLocation} onChange={handleChange} required />
                        </div>
                        <div className="form-row">
                            <label>Adopter Email</label>
                            <input type="email" name="adoEmail" value={formData.adoEmail} onChange={handleChange} required />
                        </div>
                        <div className="form-row">
                            <label>Adopter Phone</label>
                            <input type="text" name="adoPhone" value={formData.adoPhone} onChange={handleChange} required />
                        </div>
                        <div className="form-row">
                            <label>Household Composition</label>
                            <input type="text" name="householdComposition" value={formData.householdComposition} onChange={handleChange} required />
                        </div>
                        <div className="form-row">
                            <label>Reason for Adoption</label>
                            <input type="text" name="reasonForAdoption" value={formData.reasonForAdoption} onChange={handleChange} required />
                        </div>
                    </>
                )}

                {formType === 'delete' && (
                    <div className="form-row">
                        <label>Adopter ID to Delete</label>
                        <input type="text" name="adoID" value={formData.adoID} onChange={handleChange} required />
                    </div>
                )}

                {formType === 'find' && (
                    <>
                        <div className="form-row">
                            <label>Search By</label>
                            <select name="searchBy" onChange={handleSearchChange} required>
                                <option value="">Select Search Criteria</option>
                                <option value="all">Find All Adopters</option>
                                <option value="adoID">Find by Adopter ID</option>
                                <option value="userID">Find by User ID</option>
                                <option value="adoGender">Find by Adopter Gender</option>
                                <option value="adoLocation">Find by Adopter Location</option>
                                <option value="reasonForAdoption">Find by Reason for Adoption</option>
                            </select>
                        </div>
                        <div className="form-row">
                            <label>{`Enter ${searchCriteria.searchBy}`}</label>
                            <input type="text" name="searchValue" onChange={handleSearchChange} required />
                        </div>
                    </>
                )}

                <button type="submit">{formType === 'delete' ? 'Delete Adopter' : formType === 'find' ? 'Find Adopter' : formType === 'add' ? 'Add Adopter' : 'Update Adopter'}</button>
            </form>

            {formType === 'find' && foundAdopters.length > 0 && (
                <div className="adopter-list">
                    <h3>Found Adopters:</h3>
                    {foundAdopters.map((adopter) => (
                        <div key={adopter.adoID} className="adopter-card">
                            <h4>{adopter.adoName}</h4>
                            <p>NIC: {adopter.adoNIC}</p>
                            <p>Age: {adopter.adoAge}</p>
                            <p>Job: {adopter.adoJob}</p>
                            <p>Gender: {adopter.adoGender}</p>
                            <p>Location: {adopter.adoLocation}</p>
                            <p>Email: {adopter.adoEmail}</p>
                            <p>Phone: {adopter.adoPhone}</p>
                            <p>Household Composition: {adopter.householdComposition}</p>
                            <p>Reason for Adoption: {adopter.reasonForAdoption}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdopterManagement;



