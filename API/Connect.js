import mysql from "mysql";

// Create and export the connection
export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", 
    database: "pawprints",
    port: 3306
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed: ", err);
        return;
    }
    console.log("Connected to database.");
});
