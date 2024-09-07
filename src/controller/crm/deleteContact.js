import axios from "axios";

const API_KEY = process.env.FRESHWORK_API;
const DOMAIN = process.env.DOMAIN_URL;

export const deleteContact = async (req, res)=>{

    const { contactId } = req.params || null;
    
    if (!contactId) {
        return res.status(400).json({ message: "contact ID is required" });
    }

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
        res.status(statusCode).json({ error: error.message,message: "Error while deleting contact" });
    }
}