import {db} from "../Connect.js";

//add distributors
export const addDistributor = (req,res) => {
    const {disName, disEmail, disPhone, disLocation, userID} = req.body;

    console.log("Received data:", req.body);

    //validate input
    if (isNaN(disPhone) || disPhone.trim() === ''){
        return res.status(400).json({error: "Invalid phone number"});
    }

    const q = "INSERT INTO distributor(`disName`,`disEmail`,`disPhone`,`disLocation`,`userID`) VALUES (?)";
    const values = [disName, disEmail, disPhone, disLocation, userID];

    db.query(q,[values],(err,data)=>{
        if(err){
            //log the error for debugging
            console.error("Database query failed:", err);
            return res.status(500).json({error:"Internal Server Error", details: err});
        }
        return res.status(201).json("Distributor has been added successfully.");
    });
};

//delete distributor
export const deleteDistributor = (req, res) => {
    const disID = req.params.id;

    const q = "DELETE FROM distributor WHERE disID = ?";

    db.query(q, [disID], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Distributor has been deleted successfully.");
    });
};

//update distributor
export const updateDistributor = (req, res) => {
    const { disName, disEmail, disPhone, disLocation, userID } = req.body;
    const disID = req.params.id;

    // Validate phone number
    if (!disPhone || disPhone.trim() === '') {
        return res.status(400).json({ error: "Invalid phone number" });
    }
    
    const q = "UPDATE distributor SET disName = ?, disEmail = ?, disPhone = ?, disLocation = ?, userID = ? WHERE disID = ?";

    db.query(q, [disName, disEmail, disPhone, disLocation, userID, disID], (err, data) => {
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({ error: "Internal Server Error", details: err });
        }
        if (data.affectedRows === 0) return res.status(404).json({ error: "Distributor not found" });
        return res.status(200).json("Distributor details have been updated successfully.");
    });
};


// Find distributor by ID
export const findDistributorById = (req, res) => {
    const disID = req.params.id;

    const q = "SELECT * FROM distributor WHERE disID = ?";

    db.query(q, [disID], (err, data) => {
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({ error: "Internal Server Error", details: err });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "Distributor not found" });
        }
        return res.status(200).json(data);
    });
};

// Find distributors by location
export const findDistributorsByLocation = (req, res) => {
    const disLocation = req.params.location;

    const q = "SELECT * FROM distributor WHERE disLocation = ?";

    db.query(q, [disLocation], (err, data) => {
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({ error: "Internal Server Error", details: err });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "No distributors found in the specified location" });
        }
        return res.status(200).json(data);
    });
};

// Get all distributors
export const getAllDistributors = (req, res) => {
    const q = "SELECT * FROM distributor";

    db.query(q, (err, data) => {
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({ error: "Internal Server Error", details: err });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "No distributors found" });
        }
        return res.status(200).json(data);
    });
};