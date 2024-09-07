import axios from "axios";
import pool from "../config/mysqlConnection.js";

const API_KEY = process.env.FRESHWORK_API;
const DOMAIN = process.env.DOMAIN_URL;

export const getContact = async (req, res) => {
    const { data_store } = req.body;

    if (data_store !== "CRM" && data_store !== "DATABASE") {
        return res.status(400).json({ error: "Invalid value for data_store" });
    }

    if (!req.params || !req.params.contactId) {
        return res.status(400).json({ message: 'Contact ID is required' });
    }

    if (data_store === "CRM") {
        await getContactByCRM(req, res);
    } else if (data_store === "DATABASE") {
        await getContactByDATABASE(req, res);
    }

    try {

    } catch (error) {
        const statusCode = error.status || 500;
        console.error(error);
        res.status(statusCode).json({ error: error.message, message: 'Error fetching contact' });
    }
}

const getContactByCRM = async (req, res) => {

    const { contactId } = req.params;
    const include = req.query.include;

    const url = `${DOMAIN}/${contactId}`;

    if (include) {
        url += `?include=${include}`;
    }

    try {
    
        const response = await axios.get(url, {
            headers: {
                Authorization: `Token token=${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
    
        console.log(response.data);
        res.status(200).json(response.data);
    
    } catch (error) {
        
        const statusCode = error.status || 500;
        console.error(error);
        res.status(statusCode).json({ error: error.message, message: "Error while getting contact in CRM" });
    
    }
}

const getContactByDATABASE = async (req, res)=>{
    
    const { contactId } = req.params;

    const query = `SELECT * FROM contacts WHERE id = ?`;
    
    try {
        
        const [result] = await pool.execute(query, [contactId]);
        
        if (!result.length) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        
        console.log(result[0]);
        res.status(200).json(result[0]);
    
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ message: "Error while getting contact from DATABASE" });
    
    }
}