/////////////////backend-proxy-server///////////////////

//importing necessery modules
const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");

// load environment variables from the .env file
dotenv.config();

//inizialize a express application
const app = express();
//put the port based on the value from .env or default to port:8021
const port = process.env.BACKEND_PORT || 8021;

//middleware to parse json requests
app.use(express.json());

//handling from GET requests
app.get("/", async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: "https://api.thecatapi.com/v1/images/search",
      headers: {
        "x-api-key": process.env.API_KEY, //used the API_KEY from the .env file
        "Cache-Control": "no-cache",
      },

      //limit is importent for clean rendering
      params: {
        limit: 48,
      },
    };

    //perform the API-request and get the response
    const response = await axios.request(options);

    //send the data as json back
    res.json(response.data);
  } catch (error) {
    //error handling
    console.error("Error fetching images", error);
    res.status(500).send("Internal Servererror");
  }
});

//start the server an listned on the specified port
app.listen(port, () => {
  console.log(`Server runs on https://localhost:${port}`);
});
