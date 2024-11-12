import { db } from "../Connect.js";

// Register adopter
export const registerAdopter = (req, res) => {
    const { userID, adoName, adoNIC, adoAge, adoJob, adoGender, adoLocation, adoEmail, adoPhone, houseHoldComposition,  reasonForAdoption } = req.body;

    console.log("Received data:", req.body);

    const q = `
        INSERT INTO adopter(userID, adoName, adoNIC, adoAge, adoJob, adoGender, adoLocation, adoEmail, adoPhone, houseHoldComposition, reasonForAdoption) VALUES (?)`;
    const values = [userID, adoName, adoNIC, adoAge, adoJob, adoGender, adoLocation, adoEmail, adoPhone, houseHoldComposition, reasonForAdoption];

    db.query(q, [values], (err, data) => {
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({ error: "Internal Server Error", details: err });
        }
        return res.status(201).json("Adopter has been registered successfully.");
    });
};
