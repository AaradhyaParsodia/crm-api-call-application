import axios from "axios";
import pool from "../config/mysqlConnection.js";

const API_KEY = process.env.FRESHWORK_API;
const DOMAIN = process.env.DOMAIN_URL;

export const createContact = async (req, res) => {
    
    const { first_name, last_name, email, mobile_number, data_store } = req.body;

    if (!req.body || !first_name || !last_name || !email || !mobile_number) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (data_store !== "CRM" && data_store !== "DATABASE") {
        return res.status(400).json({ error: "Invalid value for data_store" });
    }

    try {
        
        if (data_store === "CRM") {
            await createContactByCRM(req, res);
        } else if (data_store === "DATABASE") {
            await createContactByDATABASE(req, res);
        }

    } catch (error) {
        
        const statusCode = error.status || 500;
        console.error(error);
        res.status(statusCode).json({ error: error.message, message: "Error while creating contact" });
    
    }
};

const createContactByCRM = async (req, res) => {
    
    const { first_name, last_name, email, mobile_number } = req.body;
    const url = `${DOMAIN}`;
    
    try {
        const response = await axios.post(
            url,
            {
                contact: {
                    first_name: first_name,
                    last_name: last_name,
                    mobile_number: mobile_number,
                    email: email,
                },
            },
            {
                headers: {
                    Authorization: `Token token=${API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );
    
        console.log(response.data);
        res.status(200).json(response.data);
    
    } catch (error) {
    
        const statusCode = error.status || 500;
        console.error(error);
        res.status(statusCode).json({ error: error.message, message: "Error while creating contact in CRM" });
    
    }
};

const createContactByDATABASE = async (req, res) => {
    
    const { first_name, last_name, email, mobile_number } = req.body;
    const query = `INSERT INTO contacts (first_name, last_name, email, mobile_number) VALUES (?, ?, ?, ?)`;
    
    try {
    
        const [result] = await pool.execute(query, [
            first_name,
            last_name,
            email,
            mobile_number
        ]);

        console.log(result);
        res.status(201).json({ message: `Contact created with ID ${result.insertId}` });
    
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ message: "Error while creating contact in DATABASE" });
    
    }
};
