const axios = require("axios");

async function readTags(tags) {
    try {
        const payload = JSON.stringify(tags);

        const response = await axios.post(
            "http://192.168.102.75:9202/RTDB/WebAPI/GetTags",
            payload,
            { headers: { "Content-Type": "application/json" } }
        );

        return response.data;
    } catch (error) {
        console.error("Error reading tags:", error.message);
        return { error: error.message };
    }
}

module.exports = readTags;
