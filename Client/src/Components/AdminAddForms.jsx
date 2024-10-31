import React, { useState } from 'react';
import axios from 'axios';
import './AdminAddForms.css';

const AdminAddForms = () => {
    const [formData, setFormData] = useState({
        vet: { vetID: '', vetName: '', vetEmail: '', vetSpecialization: '', vetPhone: '', clinic: '', userID:'' },
        daycare: { dcID: '', dcName: '', dcEmail: '', dcPhone: '', dcLocation: '', openDays: '', openTimes: '', noOfStaffMembers: '', amenitiesOffered: '', safetyFeatures: '' },
        adopter: { adoID: '', usersID: '', adoName: '', adoNIC: '', adoAge: '', adoJob: '', adoGender: '', adoLocation: '', adoEmail: '', adoPhone: '', householdComposition: '', reasonForAdoption: '' },
        distributor: { disID: '', disName: '', disEmail: '', disPhone: '', disLocation: '', usersID: '' }
    });

    const handleChange = (e, entity) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [entity]: { ...prevState[entity], [name]: value }
        }));
    };

    const handleSubmit = async (e, entity, url, method = 'post') => {
        e.preventDefault();
        try {
            const response = await axios[method](url, formData[entity]);
            alert(response.data);
        } catch (err) {
            console.error(err);
            alert(`Error: ${err.message}`);
        }
    };

    const renderForm = (entity, url, method) => (
        <form onSubmit={(e) => handleSubmit(e, entity, url, method)}>
            {Object.keys(formData[entity]).map(key => (
                <div className="form-group" key={key}>
                    <label>{key}</label>
                    <input
                        type="text"
                        name={key}
                        value={formData[entity][key]}
                        onChange={(e) => handleChange(e, entity)}
                        required
                    />
                </div>
            ))}
            <button type="submit">{method === 'post' ? 'Add' : 'Update'} {entity}</button>
        </form>
    );

    return (
        <div className="admin-add-forms">
            <h2>Add Veterinary Doctor</h2>
            {renderForm('vet', 'http://localhost:8800/api/vet/add')}

            <h2>Add Daycare Center</h2>
            {renderForm('daycare', 'http://localhost:8800/api/daycareManage/add')}

            <h2>Add Adopter</h2>
            {renderForm('adopter', 'http://localhost:8800/api/adopter/add')}

            <h2>Add Distributor</h2>
            {renderForm('distributor', 'http://localhost:8800/api/distributorManage/add')}

            {/* Add similar sections for update, delete, and find operations */}
        </div>
    );
};

export default AdminAddForms;
