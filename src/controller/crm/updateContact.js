import axios from "axios";

const API_KEY = process.env.FRESHWORK_API;
const DOMAIN = process.env.DOMAIN_URL;

export const updateContact = async (req, res)=>{
    const { new_email, new_mobile_number, data_store } = req.body;

    const { contactId } = req.params;
    
    if (!req.body || !new_email || !new_mobile_number || !contactId) {
        return res.status(400).json({ message: "All fields are required" });
    }

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
        res.status(statusCode).json({ error,message: "Error while updating contact" });
    }
}