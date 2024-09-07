import axios from "axios";
import pool from "../../config/mysqlConnection.js";

const API_KEY = process.env.FRESHWORK_API;
const DOMAIN = process.env.DOMAIN_URL;

export const updateContact = async (req, res) => {
    const { new_email, new_mobile_number, data_store } = req.body;

    const { contactId } = req.params;

    if (!req.body || !new_email || !new_mobile_number || !contactId) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (data_store !== "CRM" && data_store !== "DATABASE") {
        return res.status(400).json({ error: "Invalid value for data_store" });
    }

    try {

        if (data_store === "CRM") {
            await updateContactByCRM(req, res);
        } else if (data_store === "DATABASE") {
            await updateContactByDATABASE(req, res);
        }

    } catch (error) {

        const statusCode = error.status || 500;
        console.error(error);
        res.status(statusCode).json({ error: error.message, message: "Error while updating contact" });

    }
}

const updateContactByCRM = async (req, res) => {

    const { new_email, new_mobile_number } = req.body;

    const { contactId } = req.params;
    const url = `${DOMAIN}/${contactId}`;

    try {

        const response = await axios.put(url, {
            contact: {
                mobile_number: new_mobile_number,
                email: new_email,
                custom_field: {
                    cf_is_active: false
                }
            }
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
        res.status(statusCode).json({ error: error.message, message: "Error while updating contact in CRM" });

    }

}

const updateContactByDATABASE = async (req, res) => {
    const { new_email, new_mobile_number } = req.body;

    const { contactId } = req.params;

    const query = `UPDATE contacts SET email = ?, mobile_number = ? WHERE id = ?`;

    try {

        const [result] = await pool.execute(query, [new_email, new_mobile_number, contactId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        console.log(result);
        res.status(200).json({ message: 'Contact updated successfully' });

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Error while updating contact in DATABASE" });

    }

}