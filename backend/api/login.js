const axios = require("axios");
const BASE_URL = "http://localhost:9010/RTDB/WebAPI";

async function login(username, password) {
  try {
    const res = await axios.post(`${BASE_URL}/Login`, {
      Name: username,
      Password: password
    });

    return res.data.message.access_token;
  } catch (err) {
    console.error("Login Error:", err.message);
    return null;
  }
}

module.exports = login;
