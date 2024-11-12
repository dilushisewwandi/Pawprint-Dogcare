import { db } from "../Connect.js";

//add healthcard
// export const addHealthCard = (req, res) => {
//     const { vetUserID, petID, healthIssues, lastCheckupDate, vName, vDate, vDose, vStatus, dueDateForNext } = req.body;

//     //Insert into the healthcard table (no vetID here)
//     const healthCardQuery = `INSERT INTO healthcard (petID, healthIssues, lastCheckupDate) VALUES (?, ?, ?);`;

//     db.query(healthCardQuery, [petID, healthIssues, lastCheckupDate], (err, healthCardResult) => {
//         if (err) {
//             console.error('Error inserting health card:', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }

//         const healthCardID = healthCardResult.insertId; // Get the newly inserted health card ID

//     //Insert the vetID and healthCardID into the healthcard_veterinarian table
//     const vetCardQuery = `INSERT INTO healthcard_veterinarian (cardID, vetID) VALUES (?, (SELECT vetID FROM veterinarian WHERE userID = ?));`;

//     db.query(vetCardQuery, [healthCardID, vetUserID], (err) => {
//         if (err) {
//             console.error('Error linking vet to health card:', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }

//     //Insert into the vaccine table
//     const vaccineQuery = `INSERT INTO vaccine (vName, vDate, vDose, vStatus, dueDateForNext) VALUES (?, ?, ?, ?, ?);`;

//     db.query(vaccineQuery, [vName, vDate, vDose, vStatus, dueDateForNext], (err, vaccineResult) => {
//         if (err) {
//             console.error('Error inserting vaccine:', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }

//         const vaccineID = vaccineResult.insertId; // Get the newly inserted vaccine ID

//         //Link the health card and vaccine in the healthcard_vaccine table
//         const linkQuery = `INSERT INTO healthcard_vaccine (cardID, vID) VALUES (?, ?);`;

//         db.query(linkQuery, [healthCardID, vaccineID], (err) => {
//             if (err) {
//                 console.error('Error linking health card and vaccine:', err);
//                 return res.status(500).json({ error: 'Internal Server Error' });
//             }

//             res.status(200).json({ message: 'Health card and vaccine added successfully!' });
//             });
//         });
//     }); 
// });
// };

//Add healthcard
export const addHealthCard = (req, res) => {
    const { vetUserID, petID, healthIssues, lastCheckupDate, vName, vDate, vDose, vStatus, dueDateForNext } = req.body;

    // Insert into the healthcard table
    const healthCardQuery = `INSERT INTO healthcard (petID, healthIssues, lastCheckupDate) VALUES (?, ?, ?);`;

    db.query(healthCardQuery, [petID, healthIssues, lastCheckupDate], (err, healthCardResult) => {
        if (err) {
            console.error('Error inserting health card:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const healthCardID = healthCardResult.insertId; // Get the newly inserted health card ID

        // Insert the vetID and healthCardID into the healthcard_veterinarian table
        const vetCardQuery = `INSERT INTO healthcard_veterinarian (cardID, vetID) VALUES (?, (SELECT vetID FROM veterinarian WHERE userID = ?));`;

        db.query(vetCardQuery, [healthCardID, vetUserID], (err) => {
            if (err) {
                console.error('Error linking vet to health card:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Check if vaccine details are provided
            if (vName && vDate && vDose && vStatus && dueDateForNext) {
                const vaccineQuery = `INSERT INTO vaccine (vName, vDate, vDose, vStatus, dueDateForNext) VALUES (?, ?, ?, ?, ?);`;

                db.query(vaccineQuery, [vName, vDate, vDose, vStatus, dueDateForNext], (err, vaccineResult) => {
                    if (err) {
                        console.error('Error inserting vaccine:', err);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }

                    const vaccineID = vaccineResult.insertId; // Get the newly inserted vaccine ID

                    // Link the health card and vaccine in the healthcard_vaccine table
                    const linkQuery = `INSERT INTO healthcard_vaccine (cardID, vID) VALUES (?, ?);`;

                    db.query(linkQuery, [healthCardID, vaccineID], (err) => {
                        if (err) {
                            console.error('Error linking health card and vaccine:', err);
                            return res.status(500).json({ error: 'Internal Server Error' });
                        }

                        res.status(200).json({ message: 'Health card and vaccine added successfully!' });
                    });
                });
            } else {
                res.status(200).json({ message: 'Health card added successfully without vaccine details!' });
            }
        });
    });
};

//get health profiles
export const getHealthProfile = (req, res) => {
    const petID = req.params.petID;

    const fetchHealthProfileQuery = `
        SELECT p.petName, 
               d.disName, d.disEmail, d.disPhone, d.disLocation,
               h.healthIssues, h.lastCheckupDate,
               v.vName, v.vDate, v.vDose, v.vStatus, v.dueDateForNext,
               vt.vetName, vt.vetEmail, vt.vetPhone, vt.vetSpecialization, vt.clinic
        FROM pet p
        LEFT JOIN distributor d ON p.disID = d.disID
        LEFT JOIN healthcard h ON p.petID = h.petID
        LEFT JOIN healthcard_vaccine hv ON h.cardID = hv.cardID
        LEFT JOIN vaccine v ON hv.vID = v.vID
        LEFT JOIN healthcard_veterinarian hvn ON h.cardID = hvn.cardID
        LEFT JOIN veterinarian vt ON hvn.vetID = vt.vetID
        WHERE p.petID = ?;
    `;
    
    db.query(fetchHealthProfileQuery, [petID], (err, data) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: "Internal Server Error", details: err });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: 'Health Profile not found for the specified pet.' });
        }

        return res.status(200).json(data[0]);  
    });
};

// //update health card
// export const updateHealthCard = (req, res) => {
//     const { cardID } = req.params;
//     const { vetUserID, petID, healthIssues, lastCheckupDate, vName, vDate, vDose, vStatus, dueDateForNext } = req.body;

//     //Fetch the vetID based on vetUserID
//     const fetchVetIDQuery = "SELECT vetID FROM veterinarian WHERE userID = ?";

//     db.query(fetchVetIDQuery, [vetUserID], (err, vetResults) => {
//         if (err) {
//             console.error("Failed to fetch vetID:", err);
//             return res.status(500).json({ error: "Internal Server Error", details: err });
//         }
//         if (vetResults.length === 0) {
//             return res.status(404).json({ error: "Veterinarian not found" });
//         }

//         const vetID = vetResults[0].vetID;

//         //Update the healthcard_veterinarian table to link the vet to the health card
//         const updateVetCardQuery = `UPDATE healthcard_veterinarian SET vetID = ? WHERE cardID = ?;`;

//         db.query(updateVetCardQuery, [vetID, cardID], (err) => {
//             if (err) {
//                 console.error("Failed to update vet for health card:", err);
//                 return res.status(500).json({ error: "Internal Server Error", details: err });
//             }

//             const updateVaccineQuery = `UPDATE vaccine SET vName = ?, vDate = ?, vDose = ?, vStatus = ?, dueDateForNext = ? WHERE vID = (SELECT vID FROM healthcard_vaccine WHERE cardID = ? );`;

//             db.query(updateVaccineQuery, [vName, vDate, vDose, vStatus, dueDateForNext, cardID], (err) => {
//                 if (err) {
//                     console.error("Failed to update vaccine details:", err);
//                     return res.status(500).json({ error: "Internal Server Error", details: err });
//                 }

//                 //Update the health card details
//                 const updateHealthCardQuery = `UPDATE healthcard SET petID = ?, healthIssues = ?, lastCheckupDate = ?WHERE cardID = ?;`;

//                 db.query(updateHealthCardQuery, [petID, healthIssues, lastCheckupDate, cardID], (err) => {
//                     if (err) {
//                         console.error("Failed to update health card:", err);
//                         return res.status(500).json({ error: "Internal Server Error", details: err });
//                     }
//                     return res.status(200).json({ message: "Health card has been updated successfully." });
//                 });
//             });
//         });
//     });
// };

//Update healthcard
export const updateHealthCard = (req, res) => {
    const { cardID } = req.params;
    const { vetUserID, petID, healthIssues, lastCheckupDate, vName, vDate, vDose, vStatus, dueDateForNext } = req.body;

    if (!cardID) {
        return res.status(400).json({ error: "cardID parameter is required" });
    }

    //Fetch vetID based on vetUserID
    const fetchVetIDQuery = "SELECT vetID FROM veterinarian WHERE userID = ?";
    db.query(fetchVetIDQuery, [vetUserID], (err, vetResults) => {
        if (err) {
            console.error("Failed to fetch vetID:", err);
            return res.status(500).json({ error: "Failed to fetch veterinarian details" });
        }
        if (vetResults.length === 0) {
            return res.status(404).json({ error: "Veterinarian not found" });
        }

        const vetID = vetResults[0].vetID;

        //Update healthcard_veterinarian table
        const updateVetCardQuery = "UPDATE healthcard_veterinarian SET vetID = ? WHERE cardID = ?";
        db.query(updateVetCardQuery, [vetID, cardID], (err) => {
            if (err) {
                console.error("Failed to update vet for health card:", err);
                return res.status(500).json({ error: "Failed to update veterinarian for health card" });
            }

            //Conditionally Update vaccine table
            if (vName || vDate || vDose || vStatus || dueDateForNext) {
                const updateVaccineQuery = `
                    UPDATE vaccine 
                    SET vName = COALESCE(?, vName), 
                        vDate = COALESCE(?, vDate), 
                        vDose = COALESCE(?, vDose), 
                        vStatus = COALESCE(?, vStatus), 
                        dueDateForNext = COALESCE(?, dueDateForNext) 
                    WHERE vID = (SELECT vID FROM healthcard_vaccine WHERE cardID = ?);
                `;
                db.query(updateVaccineQuery, [vName, vDate, vDose, vStatus, dueDateForNext, cardID], (err) => {
                    if (err) {
                        console.error("Failed to update vaccine details:", err);
                        return res.status(500).json({ error: "Failed to update vaccine details" });
                    }
                });
            }

            //Update healthcard table
            const updateHealthCardQuery = `
                UPDATE healthcard 
                SET petID = ?, healthIssues = ?, lastCheckupDate = ? 
                WHERE cardID = ?;
            `;
            db.query(updateHealthCardQuery, [petID, healthIssues, lastCheckupDate, cardID], (err) => {
                if (err) {
                    console.error("Failed to update health card:", err);
                    return res.status(500).json({ error: "Failed to update health card" });
                }
                res.status(200).json({ message: "Health card has been updated successfully." });
            });
        });
    });
};


//delete health card
export const deleteHealthCard = (req, res) => {
    const { id } = req.params;

    //Delete from the healthcard_vaccine table
    const deleteVaccineQuery = `DELETE FROM vaccine WHERE vID = (SELECT vID FROM healthcard_vaccine WHERE cardID = ?);`;

    db.query(deleteVaccineQuery, [id], (err) => {
        if (err) {
            console.error("Failed to delete vaccine details:", err);
            return res.status(500).json({ error: "Internal Server Error", details: err });
        }

        //Delete from the healthcard_veterinarian table 
        const deleteVetCardQuery = `DELETE FROM healthcard_veterinarian WHERE cardID = ?; `;

        db.query(deleteVetCardQuery, [id], (err) => {
            if (err) {
                console.error("Failed to delete veterinarian association:", err);
                return res.status(500).json({ error: "Internal Server Error", details: err });
            }

            //Delete from the healthcard table
            const deleteHealthCardQuery = `DELETE FROM healthcard WHERE cardID = ?; `;

            db.query(deleteHealthCardQuery, [id], (err) => {
                if (err) {
                    console.error("Failed to delete health card:", err);
                    return res.status(500).json({ error: "Internal Server Error", details: err });
                }
                return res.status(200).json("Health card and related records have been deleted successfully.");
            });
        });
    });
};

//get all health cards
export const getAllHealthCard = (req, res) => {
    const fetchAllHealthCardsQuery = `
        SELECT hc.cardID, hc.petID, hc.healthIssues, hc.lastCheckupDate,
               v.vName, v.vDate, v.vDose, v.vStatus, v.dueDateForNext,
               vt.vetID, vt.vetName, vt.vetEmail, vt.vetPhone, vt.vetSpecialization,
               u.userID, u.userName
        FROM healthcard hc
        LEFT JOIN healthcard_vaccine hv ON hc.cardID = hv.cardID
        LEFT JOIN vaccine v ON hv.vID = v.vID
        LEFT JOIN healthcard_veterinarian hcv ON hc.cardID = hcv.cardID
        LEFT JOIN veterinarian vt ON hcv.vetID = vt.vetID
        LEFT JOIN user u ON vt.userID = u.userID
    `;

    db.query(fetchAllHealthCardsQuery, (err, results) => {
        if (err) {
            console.error("Failed to fetch health cards:", err);
            return res.status(500).json({ error: "Internal Server Error", details: err });
        }

        return res.status(200).json(results);
    });
};
