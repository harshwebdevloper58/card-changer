const express = require("express");
const app = express();
const port = 5000;

require("dotenv").config();


const bodyParser = require('body-parser');

// Parse JSON and URL-encoded form data



//Razorpay Route

app.use("/api", phonepeRoute);

// Starting Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
