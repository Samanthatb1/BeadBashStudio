// server
const express = require("express");
const axios = require('axios').default;
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001 ;

const app = express();

// app.use(express.static(path.resolve(__dirname, '../client/build')));

// environment variables
require('dotenv').config();

app.use(cors({
  origin: 'https://beadbashstudio.onrender.com', // or '*' to allow all origins (be cautious with this)
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type'
}));

// endpoint to get all listings from etsy
app.get("/allListings", async (req, res) => {
  const filePath = path.resolve(__dirname, 'sample_data.json');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error reading or parsing the json listing data:', err);
      return;
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData); // Process the JSON data
    } catch (err) {
      console.error('Error reading or parsing the json listing data:', err);
    }
  });
});

// All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });

app.listen(PORT, () => {
  console.log("Server running on Port: " + PORT);
})
