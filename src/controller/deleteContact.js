import axios from "axios";
import pool from "../config/mysqlConnection.js";

const API_KEY = process.env.FRESHWORK_API;
const DOMAIN = process.env.DOMAIN_URL;

export const deleteContact = async (req, res)=>{

    const { contactId } = req.params || null;
    const { data_store } = req.body;
    
    if (!contactId) {
        return res.status(400).json({ message: "contact ID is required" });
    }

    if (data_store !== "CRM" && data_store !== "DATABASE") {
        return res.status(400).json({ error: "Invalid value for data_store" });
    }

    try {

        if (data_store === "CRM") {
            await deleteContactByCRM(req, res);
        } else if (data_store === "DATABASE") {
            await deleteContactByDATABASE(req, res);
        }

    } catch (error) {
        const statusCode = error.status || 500;
        console.error(error);
        res.status(statusCode).json({ error: error.message,message: "Error while deleting contact" });
    }
}

const deleteContactByCRM = async (req, res)=>{

    const { contactId } = req.params
    const url = `${DOMAIN}/${contactId}`;


    try {
        
        const response = await axios.delete(url,
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
        res.status(statusCode).json({ error: error.message,message: "Error while deleting contact using CRM" });

    }
}

const deleteContactByDATABASE = async (req, res)=>{

    const { contactId } = req.params;

    const query = `DELETE FROM contacts WHERE id = ?`;

    try {
        const [result] = await pool.execute(query, [contactId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        console.log(result);
        res.status(200).json({ message: 'Contact deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while deleting contact from DATABASE" });
    }

}