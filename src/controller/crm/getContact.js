import axios from "axios";

const API_KEY = process.env.FRESHWORK_API;
const DOMAIN = process.env.DOMAIN_URL;
// const DOMAIN2 = 'https://willcreateoneoneday.myfreshworks.com/crm/sales/api/contacts/view/402009928255'

export const getContact = async (req, res) => {

    if (!req.params || !req.params.id) {
        return res.status(400).json({ message: 'Contact ID is required' });
    }

    const { contactId } = req.params; // Assuming you're passing the contact ID as a route parameter
    const include = req.query.include; // Optional: include additional details

    const url = `${DOMAIN}/${contactId}`;
    // const url = `${DOMAIN2}`;
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
        console.error(error);
        res.status(500).json({ message: 'Error fetching contact' });
    }
}