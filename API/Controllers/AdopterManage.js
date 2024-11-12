import { db } from "../Connect.js";

export const addAdopter = (req, res) => {
    const { userID, adoName, adoNIC, adoAge, adoJob, adoGender, adoLocation, adoEmail, adoPhone, householdComposition, reasonForAdoption } = req.body;

    console.log("Received data:", req.body);

    //Check if the provided userID exists in the user table
    const checkUserQuery = "SELECT * FROM user WHERE userID = ?";
    db.query(checkUserQuery, [userID], (err, data) => {
        if (err) {
            console.error("Error checking if user exists:", err);
            return res.status(500).json("Internal Server Error: " + err.message);
        }

        //If the userID exists, check that the username and email match
        if (data.length > 0) {
            const existingUser = data[0];

            // Check if the username and email match
            if (adoName !== existingUser.username || adoEmail !== existingUser.email) {
                const errorMessage = "The username or email does not match the existing user's information.";
                console.error(errorMessage);  // Log the error in the terminal
                return res.status(400).json({ error: errorMessage });  // Send the error message to the frontend
            }
        }

        //Proceed with adding the adopter (if userID exists or does not exist)
        const q = "INSERT INTO adopter(`userID`, `adoName`, `adoNIC`, `adoAge`, `adoJob`, `adoGender`, `adoLocation`, `adoEmail`, `adoPhone`, `householdComposition`, `reasonForAdoption`) VALUES (?)";
        const values = [userID, adoName, adoNIC, adoAge, adoJob, adoGender, adoLocation, adoEmail, adoPhone, householdComposition, reasonForAdoption];

        db.query(q, [values], (err, data) => {
            if (err) {
                // Log the error for debugging
                console.error("Database query failed:", err);
                return res.status(500).json("Internal Server Error: " + err.message);
            }

            return res.status(201).json("Adopter has been added successfully.");
        });
    });
};

// Delete adopter
export const deleteAdopter = (req, res) => {
    const adoID = req.params.id;

    // Check if the adopter exists
    const checkQuery = "SELECT * FROM adopter WHERE adoID = ?";
    db.query(checkQuery, [adoID], (err, data) => {
        if (err) {
            console.error("Error during database query:", err);
            return res.status(500).json("Internal server error while checking adopter.");
        }

        // If no adopter with the given adoID is found, return an error with the message
        if (data.length === 0) {
            const errorMessage = `No adopter found with adoID: ${adoID}`;
            console.error(errorMessage);  
            return res.status(404).json({ error: errorMessage });  
        }

        // Proceed with deletion if the adopter exists
        const deleteQuery = "DELETE FROM adopter WHERE adoID = ?";
        db.query(deleteQuery, [adoID], (err, result) => {
            if (err) {
                console.error("Error during deletion:", err);
                return res.status(500).json("Error deleting adopter.");
            }
            return res.status(200).json("Adopter has been deleted successfully.");
        });
    });
};

//update adopter
export const updateAdopter = (req, res) => {
    const { userID, adoName, adoNIC, adoAge, adoJob, adoGender, adoLocation, adoEmail, adoPhone, householdComposition, reasonForAdoption } = req.body;
    const adoID = req.params.id;

    // Validate phone number 
    if (!adoPhone || adoPhone.trim() === '') {
        return res.status(400).json({ error: "Invalid phone number" });
    }

    const q = `UPDATE adopter SET userID = ?, adoName = ?, adoNIC = ?, adoAge = ?, adoJob = ?, adoGender = ?, adoLocation = ?, adoEmail = ?, adoPhone = ?, householdComposition = ?, reasonForAdoption = ? WHERE adoID = ?`;

    db.query(q, [userID, adoName, adoNIC, adoAge, adoJob, adoGender, adoLocation, adoEmail, adoPhone, householdComposition, reasonForAdoption, adoID], (err, data) => {
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({ error: "Internal Server Error", details: err });
        }
        if (data.affectedRows === 0) {
            return res.status(404).json({ error: "Adopter not found" });
        }
        return res.status(200).json("Adopter details have been updated successfully.");
    });
};

// Find adopters by adoID, userID, gender, location, reason for adoption, or find all adopters
export const findAdopters = (req, res) => {
    const { searchBy, searchValue } = req.params;
    let query;

    if (searchBy === 'all') {
        query = "SELECT * FROM adopter";
    } else {
        switch (searchBy) {
            case 'adoID':
                query = "SELECT * FROM adopter WHERE adoID = ?";
                break;
            case 'userID':
                query = "SELECT * FROM adopter WHERE userID = ?";
                break;
            case 'adoGender':
                query = "SELECT * FROM adopter WHERE adoGender = ?";
                break;
            case 'adoLocation':
                query = "SELECT * FROM adopter WHERE adoLocation = ?";
                break;
            case 'reasonForAdoption':
                query = "SELECT * FROM adopter WHERE reasonForAdoption = ?";
                break;
            default:
                return res.status(400).json({ error: "Invalid search criteria" });
        }
    }

    const params = searchBy === 'all' ? [] : [searchValue];

    db.query(query, params, (err, data) => {
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({ error: "Database query failed", details: err.message });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "No adopters found" });
        }
        return res.status(200).json(data);
    });
    
};


