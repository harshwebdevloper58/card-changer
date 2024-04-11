const mongoose = require('mongoose');
const express= require('express');
const session = require('express-session');
const bodyParser=require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const fs = require('fs');
const { JSDOM } = require('jsdom');
const userRoute = require("./routers/user");
const routs = require("./routers/staticrouter");
const app = express();
app.use(express.static(__dirname));
app.use(cookieParser());
dotenv.config();
// app.use(express.static('E-CARD'));
app.get('/script.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile('https://card-changer.onrender.com/' + '/HTML/script.js');
  });
// app.use("/purchase",restrictToLoggedinUserOnly,routs);
app.use("/",routs);
app.use("/register",userRoute);

const {fetchProfileDetails,fetchCardDetails, handleCardData,fetchProfileCardDetails, isExist} = require("./controllers/user")
// CORS middleware          it can be risky, i have to remove it later
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        // res.sendStatus(200);
    } else {
        next();
    }
});
app.post("/card-details",handleCardData);
app.get("/api/profile", async (req, res) => {
    try {
        // fetches profile details
        const data = await fetchProfileDetails(req,res);
        res.json(data);
    }catch (error) {
        console.error("Error fetching profile details:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
let otp;
const {otpGenerator} = require('./service/otp')
app.get('/userExist',async (req,res)=>{
    let {exists} = require('./routers/staticrouter');
    res.json(exists);
})
app.get('/otp',async (req,res)=>{
    otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    otpGenerator(otp);
    res.json(otp);
    module.exports = {
        otp,
    }
    
})
app.get("/isLoggedIn",async (req,res)=>{
    if (req.session && req.session.isLoggedIn) {
        return res.json({ status: "true" });
    }
    return res.json({ status: "false" });


})

app.get("/api/logout",async (req,res)=>{
    req.session.destroy(err => {
        if (err) {
          console.error('Error destroying session:', err);
          res.status(500).send('Error destroying session');
        } else {
         
           
          res.json({response:"true"});
        }
      })
})
app.get("/api/card-details", async (req,res)=>{
    try{
        const data=await cardDetails.find({});
        // console.log("the data is",data);
        // const jsonData =JSON.stringify(data);
        res.status(200).send(data);
    }catch(error){
        console.log("error in fetching profile details:",error);
        res.status(500).json({error:'Internal Server Error'});
    }
})
app.get("/api/profile/card-details", async (req,res)=>{
    try{
        const details = await cardDetails.find({});
        console.log(details);
        if(!details){
            console.log("Nothing in details")
        }
        res.status(200).send(details);
    }
    catch(err){
res.status(200).send("Internal server error")
    }
})
// payment integration
require("dotenv").config();

var http = require('http').Server(app);

// const paymentRoute = require('./routers/paymentRoute');
const { cardDetails } = require('./models/user');

// app.use('/',paymentRoute);

// payment gateway ends here
mongoose.connect('mongodb+srv://harshshrivastava599:ZDvMNYmnHcTxLIG6@card-changer.eez0w8r.mongodb.net/');
const port = process.env.PORT || 10000;

app.listen(port,()=>{
    console.log(`server successfully at port ${port}`);
})