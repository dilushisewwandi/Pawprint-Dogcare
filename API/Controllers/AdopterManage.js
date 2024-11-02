import { db } from "../Connect.js";

//add adopter
export const addAdopter = (req,res) => {
    const {userID,adoName,adoNIC,adoAge,adoJob,adoGender,adoLocation,adoEmail,adoPhone,householdComposition,reasonForAdoption} = req.body;

    console.log("Received data:", req.body);

    const q = "INSERT INTO adopter(`userID`,`adoName`,`adoNIC`,`adoAge`,`adoJob`,`adoGender`,`adoLocation`,`adoEmail`,`adoPhone`,`householdComposition`,`reasonForAdoption`) VALUES (?)";
    const values = [userID,adoName,adoNIC,adoAge,adoJob,adoGender,adoLocation,adoEmail,adoPhone,householdComposition,reasonForAdoption];

    db.query(q,[values],(err,data)=>{
        if(err){
        //log the error for debugging
            console.error("Database query failed:", err);
            return res.status(500).json({error:"Internal Server Error", details: err});
        }
        return res.status(201).json("Adopter has been added successfully.");
    });
};

//delete adopter
export const deleteAdopter = (req, res) => {
    const adoID = req.params.id;

    const q = "DELETE FROM adopter WHERE adoID = ?";

    db.query(q, [adoID], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Adopter has been deleted successfully.");
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
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "No adopters found" });
        }
        return res.status(200).json(data);
    });
};


