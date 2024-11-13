import React, { useState } from 'react';
import axios from 'axios';
import './HealthCardManagement.css';

const HealthCardManagement = ({ formType }) => {
    const [healthCardFormData, setHealthCardFormData] = useState({
        cardID: '',
        vetUserID: '',
        petID: '',
        healthIssues: '',
        lastCheckupDate: '',
        vName: '',
        vDate: '',
        vDose: '',
        vStatus: '',
        dueDateForNext: ''
    });
    const [healthCardToDelete, setHealthCardToDelete] = useState('');
    const [healthCardSearchCriteria, setHealthCardSearchCriteria] = useState({
        searchBy: '',
        searchValue: ''
    });
    const [foundHealthCards, setFoundHealthCards] = useState([]);

    const handleHealthCardChange = (e) => {
        const { name, value } = e.target;
        setHealthCardFormData({ ...healthCardFormData, [name]: value });
    };

    const handleDeleteChange = (e) => {
        setHealthCardToDelete(e.target.value);
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setHealthCardSearchCriteria({ ...healthCardSearchCriteria, [name]: value });
    };

    // const handleHealthCardSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         let response;
    //         if (formType === 'add') {
    //             response = await axios.post('http://localhost:8800/api/healthcard/add', healthCardFormData);
    //             // alert(response.data);
    //             alert(response.data.message);
    //         } else if (formType === 'update') {
    //             response = await axios.put(`http://localhost:8800/api/healthcard/update/${healthCardFormData.cardID}`, healthCardFormData);
    //             // alert(response.data);
    //             alert(response.data.message);
    //         }

    //         setHealthCardFormData({
    //             cardID: '',
    //             vetUserID: '',
    //             petID: '',
    //             healthIssues: '',
    //             lastCheckupDate: '',
    //             vName: '',
    //             vDate: '',
    //             vDose: '',
    //             vStatus: '',
    //             dueDateForNext: ''
    //         });
    //     } catch (error) {
    //         console.error("Error:", error);
    //         // alert(`An error occurred: ${error.message}`);
    //         alert(`An error occurred: ${error.response?.data?.message || error.message}`);
    //     }
    // };
    const handleHealthCardSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Ensure necessary fields are filled
            if (!healthCardFormData.vetUserID || !healthCardFormData.petID) {
                alert("Please fill in the vet and pet IDs.");
                return;
            }
    
            let response;
            if (formType === 'add') {
                response = await axios.post('http://localhost:8800/api/healthcard/add', healthCardFormData);
                alert(response.data.message);
            } else if (formType === 'update') {
                if (!healthCardFormData.cardID) {
                    alert("Please provide a valid card ID for updating.");
                    return;
                }
    
                response = await axios.put(`http://localhost:8800/api/healthcard/update/${healthCardFormData.cardID}`, healthCardFormData);
                alert(response.data.message);
            }
    
            // Reset form only after a successful request
            setHealthCardFormData({
                cardID: '',
                vetUserID: '',
                petID: '',
                healthIssues: '',
                lastCheckupDate: '',
                vName: '',
                vDate: '',
                vDose: '',
                vStatus: '',
                dueDateForNext: ''
            });
    
        } catch (error) {
            console.error("Error:", error);
    
            // Display specific error message if available
            alert(`An error occurred: ${error.response?.data?.error || error.message}`);
        }
    };
    

    const handleHealthCardDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete(`http://localhost:8800/api/healthcard/delete/${healthCardToDelete}`);
            alert(response.data);
        } catch (error) {
            console.error("Error:", error);
            alert(`An error occurred: ${error.message}`);
        }
    };

    const handleHealthCardSearch = async (e) => {
        e.preventDefault();

        try {
            const { searchBy, searchValue } = healthCardSearchCriteria;
            let response;
            if (searchBy === 'all') {
                response = await axios.get('http://localhost:8800/api/healthcard/findAll');
            }
            // } else {
            //     response = await axios.get(`http://localhost:8800/api/healthcard/findBy${searchBy.charAt(0).toUpperCase() + searchBy.slice(1)}/${searchValue}`);
            // }
            setFoundHealthCards(response.data);
        } catch (error) {
            console.error("Error:", error);
            alert(`An error occurred: ${error.message}`);
        }
    };

    return (
        <div className="h-card-management-container">
            <h2>
                {formType === 'add'
                    ? 'Add Health Card'
                    : formType === 'update'
                    ? 'Update Health Card'
                    : formType === 'delete'
                    ? 'Delete Health Card'
                    : 'Find Health Card'}
            </h2>
            <form
                onSubmit={
                    formType === 'delete'
                        ? handleHealthCardDelete
                        : formType === 'find'
                        ? handleHealthCardSearch
                        : handleHealthCardSubmit
                }
            >
                {formType !== 'delete' && formType !== 'find' && (
                    <>
                        <div className="h-card-form-row">
                            <label>Vet's User ID</label>
                            <input
                                type="text"
                                name="vetUserID"
                                value={healthCardFormData.vetUserID}
                                onChange={handleHealthCardChange}
                                placeholder="Enter Vet's User ID"
                                required
                            />
                        </div>

                        <div className="h-card-form-row">
                            <label>Pet ID</label>
                            <input
                                type="text"
                                name="petID"
                                value={healthCardFormData.petID}
                                onChange={handleHealthCardChange}
                                placeholder="Enter Pet ID"
                                required
                            />
                        </div>

                        <div className="h-card-form-row">
                            <label>Health Issues</label>
                            <textarea
                                name="healthIssues"
                                value={healthCardFormData.healthIssues}
                                onChange={handleHealthCardChange}
                                placeholder="Enter Health Issues"
                                required
                            />
                        </div>

                        <div className="h-card-form-row">
                            <label>Last Checkup Date</label>
                            <input
                                type="date"
                                name="lastCheckupDate"
                                value={healthCardFormData.lastCheckupDate}
                                onChange={handleHealthCardChange}
                                required
                            />
                        </div>

                        <div className="h-card-form-row">
                            <label>Vaccine Name</label>
                            <input
                                type="text"
                                name="vName"
                                value={healthCardFormData.vName}
                                onChange={handleHealthCardChange}
                                placeholder="Enter Vaccine Name"
                              
                            />
                        </div>

                        <div className="h-card-form-row">
                            <label>Vaccination Date</label>
                            <input
                                type="date"
                                name="vDate"
                                value={healthCardFormData.vDate}
                                onChange={handleHealthCardChange}
                                
                            />
                        </div>

                        <div className="h-card-form-row">
                            <label>Dose</label>
                            <input
                                type="text"
                                name="vDose"
                                value={healthCardFormData.vDose}
                                onChange={handleHealthCardChange}
                                placeholder="Enter Dose"
                                
                            />
                        </div>

                        <div className="h-card-form-row">
                            <label>Status</label>
                            <input
                                type="text"
                                name="vStatus"
                                value={healthCardFormData.vStatus}
                                onChange={handleHealthCardChange}
                                placeholder="Enter Status"
                               
                            />
                        </div>

                        <div className="h-card-form-row">
                            <label>Due Date for Next</label>
                            <input
                                type="date"
                                name="dueDateForNext"
                                value={healthCardFormData.dueDateForNext}
                                onChange={handleHealthCardChange}
                            
                            />
                        </div>
                    </>
                )}

                {formType === 'update' && (
                    <div className="h-card-form-row">
                        <label>Health Card ID</label>
                        <input
                            type="text"
                            name="cardID"
                            value={healthCardFormData.cardID}
                            onChange={handleHealthCardChange}
                            placeholder="Enter Health Card ID"
                            required
                        />
                    </div>
                )}

                {formType === 'delete' && (
                    <div className="h-card-form-row">
                        <label>Health Card ID to Delete</label>
                        <input
                            type="text"
                            value={healthCardToDelete}
                            onChange={handleDeleteChange}
                            placeholder="Enter Health Card ID to Delete"
                            required
                        />
                    </div>
                )}

                {formType === 'find' && (
                    <>
                        <div className="h-card-form-row">
                            <label>Search By</label>
                            <select name="searchBy" onChange={handleSearchChange} required>
                                <option value="">Select Search Criteria</option>
                                <option value="all">Find All Health Cards</option>
                            </select>
                        </div>

                        {healthCardSearchCriteria.searchBy !== 'all' && (
                            <div className="h-card-form-row">
                                <label>{`Enter ${healthCardSearchCriteria.searchBy}`}</label>
                                <input
                                    type="text"
                                    name="searchValue"
                                    placeholder={`Enter ${healthCardSearchCriteria.searchBy}`}
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
                        ? 'Add Health Card'
                        : 'Update Health Card'}
                </button>
            </form>

            {formType === 'find' && foundHealthCards.length > 0 && (
                <div className="h-card-found-cards">
                    <h3>Found Health Cards:</h3>
                    {foundHealthCards.map((healthCard) => (
                        <div key={healthCard.cardID} className="h-card">
                            <h4>Health Card ID: {healthCard.cardID}</h4>
                            {/* <p>Vet User ID: {healthCard.userID}</p> */}
                            <p>Pet ID: {healthCard.petID}</p>
                            <p>Health Issues: {healthCard.healthIssues}</p>
                            <p>Last Checkup Date: {healthCard.lastCheckupDate}</p>
                            <p>Vaccine Name: {healthCard.vName}</p>
                            <p>Vaccination Date: {healthCard.vDate}</p>
                            <p>Dose: {healthCard.vDose}</p>
                            <p>Status: {healthCard.vStatus}</p>
                            <p>Due Date for Next: {healthCard.dueDateForNext}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HealthCardManagement;
