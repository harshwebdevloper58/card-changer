const {MongoClient} = require('mongodb');
const express = require("express");
const bodyParser = require("body-parser");
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
var app=express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/action', function(req,res){
	var name = req.body.name;
	var email =req.body.email;
	var pass = req.body.password;
	var phone =req.body.phone;

	var data = {
		"name": name,
		"email":email,
		"password":pass,
		"phone":phone
	}
db.collection('Registration').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
		
	return res.redirect('signup_success.html');
})


app.get('/action',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('./index.html');
}).listen(3000)


console.log("server listening at port 3000");
