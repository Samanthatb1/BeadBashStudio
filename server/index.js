// server
const express = require("express");
const axios = require('axios').default;
const path = require('path');

const PORT = process.env.PORT || 3001 ;

const app = express();

// environment variables
require('dotenv').config();

app.use(
  cors({
    origin: '*',
    credentials: true,
    exposedHeaders: ['set-cookie'],
  })
);

// endpoint to get all listings from etsy
app.get("/allListings", (req, res) => {
  let listings = [];

  // get request to Bead Bash Studio endpoint
  axios.get(process.env.ETSY_API_KEY)
  .then(listingResponse => {
    // handle success
    listingResponse.data.results.forEach(item => {
        listings.push({ // sorting data so its easy to access on the frontend
            title: item.title,
            description: item.description,
            price: item.price,
            currencyCode: item.currency_code,
            section: item.Section.title,
            tags: item.tags,
            materials: item.materials,
            url: item.url,
            image: item.Images[0].url_fullxfull
          })
    }); // looping is over

    // send data back
    res.json(listings) ;
  })
  .catch(error => {
    console.log(error);
  });
  });

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log("Server running on Port: " + PORT);
})
