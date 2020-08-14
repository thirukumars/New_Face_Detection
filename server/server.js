const express = require("express");
const bodyParser = require('body-parser')
const axios = require("axios");
const path = require("path");
var Blob = require("blob");
var FileReader = require("fs");
const connection = require('../server/database');
const nameArrayRouter = require('./Router/nameArray')
const uploadImage = require('./Router/uploadRouter')
const FinalExpression = require('./Router/FinalExpressionRouter')
const individualExpression = require('./Router/individualExpression')
const DownloadRouter = require('./Router/DownloadRouter')
const overallExpression = require('./Router/overallExpression')
const ImageController  = require('./Router/ImageRouter')
const GetNameArray = require('./Router/nameArray')
const app = express();
const router = express.Router();

// Parse JSON bodies (as sent by API clients)
app.use(express.json({limit:"50mb"}));
app.use(
	bodyParser.urlencoded({
		limit:"50mb",
	  extended: true
	})
  );
var image_name = "";
app.use(express.static(__dirname + "../FinalProject-master/public"));
// app.use(express.static(__dirname + "../FinalProject-master/public"));

function name(val) {
	console.log("val" + val);
	image_name = val;
}

app.use('/upload',uploadImage)

app.get("/datas", (req, res) => {
	connection.query("SELECT * FROM individual_result", (error, row, fields) => {
		if (!!error) {
			console.log("Error in the query");
		} else {
			console.log("seccessful query");
			console.log(row);
		}
	});
	res.json("hello");
});
const outputfile = "output.png";

app.use('/image',ImageController)

// app.use(express.urlencoded());



app.use('/nameArray',nameArrayRouter)
// app.use('/nameArray',GetNameArray)
// app.use(express.urlencoded());

// Access the parse results as request.body

app.use('/finalExpression',FinalExpression)
app.use('/individualExpression',individualExpression)
app.use('/overallExpression',overallExpression)

app.post("/detail", function (req, res) {
	staffName = req.body;
	console.log(staffName);
});

app.get("/date", function (req, res) {
	let date1 = "09 - 03 - 2020";
	let date2 = "16 - 05 - 2020";
	connection.query(
		`SELECT * FROM individual_result WHERE time BETWEEN ${date1} and ${date2}`,
		(error, row, fields, data) => {
			if (!!error) {
				console.log("Error in the query");
			} else {
				console.log("seccessful query");
				console.log(row);
				console.log(data);
				res.send(row);
			}
		}
	);
});

// app.post('/download',(req,res)=>{
	
// 	let image = req.body.tempImage.replace(/^data:image\/png;base64,/, "");
// 	let nameOfImage = req.body.name;
// 	// console.log(nameOfImage)
// 	FileReader.writeFile(`../FinalProject-master/public/img/${nameOfImage}.png`,image,'base64',function(err){
// 		if(err){
// 			console.log(err);
// 		}
// 	})
app.use('/download',DownloadRouter)
	// ../../FinalProject-master/public/img/local.png
	// console.log(image)
	// var buf = new Buffer.from(image, 'base64');
	// writeFileToSystem(buf)
	// console.log(image)

	// var data =  image.replace(/^data:image\/\w+;base64,/, "");
	// var buf = new Buffer(data, 'base64');
	// fs.writeFile('image.png', buf);
	// console.log(buf)

// 	function writeFileToSystem(buf){
		
// 		FileReader.writeFile("images/imag.png",buf,function(err){
// 			console.log('file saved')
// 		})
// 	}
// })

const port = 5000;
app.listen(port, () => {
	console.log("server started on port " + port);
});
