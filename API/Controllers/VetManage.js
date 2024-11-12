import { db } from "../Connect.js";

//add vet
export const addVet = (req, res) => {
    const {vetName, vetEmail, vetSpecialization,vetPhone,clinic,userID } = req.body;

    console.log("Received data:", req.body);

    if (isNaN(vetPhone) || vetPhone.trim() === '') {
        return res.status(400).json({ error: "Invalid phone number" });
    }

    const q = "INSERT INTO veterinarian(`vetName`, `vetEmail`, `vetSpecialization`,`vetPhone`,`clinic`,`userID`) VALUES (?)";
    const values = [vetName,vetEmail,vetSpecialization,vetPhone,clinic,userID];

    db.query(q, [values], (err, data) => {
        if (err) {
            // Log the error for debugging
            console.error("Database query failed:", err);
            return res.status(500).json({ error: "Internal Server Error", details: err });
        }
        return res.status(201).json("Vet has been added successfully.");
    });
};

//delete vet
export const deleteVet = (req, res) => {
    const vetID = req.params.id;

    const q = "DELETE FROM veterinarian WHERE vetID = ?";

    db.query(q, [vetID], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Vet has been deleted successfully.");
    });
};

//update vet
export const updateVet = (req, res) => {
    const vetID = req.params.id;
    const { vetName, vetEmail, vetSpecialization, vetPhone, clinic, userID } = req.body;

    const q = `UPDATE veterinarian SET vetName = ?, vetEmail = ?, vetSpecialization = ?, vetPhone = ?, clinic = ?, userID = ? WHERE vetID = ?`;

    db.query(q, [vetName, vetEmail, vetSpecialization, vetPhone, clinic, userID, vetID], (err, data) => {
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({ error: "Internal Server Error", details: err });
        }
        if (data.affectedRows === 0) return res.status(404).json({ error: "Veterinarian not found" });
        return res.status(200).json("Veterinarian details have been updated successfully.");
    });

};

// Find vet by ID
export const findVetByID = (req, res) => {
    const vetID = req.params.id;
    console.log(`Received request to find vet by ID: ${vetID}`);
    const q = "SELECT * FROM veterinarian WHERE vetID = ?";
    
    db.query(q, [vetID], (err, data) => {
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({ error: "Internal Server Error", details: err });
        }
        if (data.length === 0) {
            console.log(`No vet found with ID: ${vetID}`);
            return res.status(404).json({ message: "Vet not found" });
        }
        console.log(`Vet found:`, data); 
        return res.status(200).json(data);
    });
};


// Find vet by specialization
export const findVetBySpecialization = (req, res) => {
    const specialization = req.params.specialization;
    console.log(`Finding vet by specialization: ${specialization}`); // Debug log
    const q = "SELECT * FROM veterinarian WHERE vetSpecialization = ?";
    db.query(q, [specialization], (err, data) => {
        if (err) {
            console.error('Error finding vet by specialization:', err);
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
};


// Find vet by clinic
export const findVetByClinic = (req, res) => {
    const clinic = req.params.clinic;
    const q = "SELECT * FROM veterinarian WHERE clinic = ?";
    db.query(q, [clinic], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

// Find all vets
export const findAllVets = (req, res) => {
    const q = "SELECT * FROM veterinarian";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};