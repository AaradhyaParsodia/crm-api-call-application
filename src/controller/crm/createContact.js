import axios from "axios";

const API_KEY = process.env.FRESHWORK_API;
const DOMAIN = process.env.DOMAIN_URL;

export const createContact = async (req, res) => {
    
    const { first_name, last_name, email, mobile_number, data_store } = req.body;

    if (!req.body || !first_name || !last_name || !email || !mobile_number) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const url = `${DOMAIN}`;

    try {
        const response = await axios.post(url, {
                contact: {
                    first_name: first_name,
                    last_name: last_name,
                    mobile_number: mobile_number,
                    email: email
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
        console.error(error);
        res.status(500).json({ message: "Error while creating contact" });
    }
};
