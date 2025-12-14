const axios = require("axios");
async function readShift(shift) {
    try{
        const payload = JSON.stringify(shift);

        const response = await axios.post(
            "apiurl",
            payload,
            { headers: { "Content-Type": "application/json" } }
        );

        return response.data;
    } catch (error) {
        console.error("Error reading tags:", error.message);
        return { error: error.message };
    }
 
}module.exports = readShift