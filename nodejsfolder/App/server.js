var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('Facility_DB',['Facility']);
var bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.get('/Facility_DB',function(req, res){
	console.log("I have received the GET request.")
	db.Facility.find(function(err, docs){
		console.log(docs)
		res.json(docs)
	})
	
})
app.post('/Facility_DB',function(req, res){
	console.log(req.body) //Body not in blue
	db.Facility.insert(req.body, function(err, doc){
		res.json(doc);
	});
});
app.delete('/Facility_DB/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.Facility.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});
//For Edit
app.get('/Facility_DB/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.Facility.find({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
		console.log(res.json(doc));
	});
})
app.put('/Facility_DB/:id', function(req, res){
	var id =  req.params.id;
	console.log(req.body.name);
	db.Facility.findAndModify(
		{query:{_id:mongojs.ObjectId(id)}, 
		update: {$set:{Facility_Name:req.body.Facility_Name, Facility_Contact: req.body.Facility_Contact, Facility_Street: req.body.Facility_Street,
			Facility_City:req.body.Facility_City, Facility_State:req.body.Facility_State, Facility_Zipcode: req.body.Facility_Zipcode}}, 
		new: true}, function(err, doc){
			res.json(doc)
		});
});
app.listen(3000);
console.log("server running on port 3000");