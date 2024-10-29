import { db } from "../Connect.js";

export const getUser = (req, res) => {
    const userId = req.params.userID;
    const q = "SELECT * FROM user WHERE userID = ?";
    
    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");
        
        return res.status(200).json(data[0]);
    });
};
