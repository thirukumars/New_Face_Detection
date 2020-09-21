const express = require("express");
const bodyParser = require('body-parser')
const axios = require("axios");
const path = require("path");
const cors = require('cors')
// var Blob = require("blob");
// var FileReader = require("fs");
const connection = require('../server/database');
const nameArrayRouter = require('./Router/nameArray')
const uploadImage = require('./Router/uploadRouter')
const FinalExpression = require('./Router/FinalExpressionRouter')
const individualExpression = require('./Router/individualExpression')
const DownloadRouter = require('./Router/DownloadRouter')
const overallExpression = require('./Router/overallExpression')
const ImageController  = require('./Router/ImageRouter')
const DetailsRouter = require('./Router/DetailsRouter')
const GetNameArray = require('./Router/nameArray')
const DateRouter = require('./Router/Date')
const DateTimeRouter = require('./Router/DateTimeRouter')
const app = express();
const router = express.Router();


app.use(cors());
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

// Access the parse results as request.body

app.use('/finalExpression',FinalExpression)
app.use('/individualExpression',individualExpression)
app.use('/overallExpression',overallExpression)
app.use('/detail',DetailsRouter)
app.use('/date',DateRouter)
app.use('/dateTime',DateTimeRouter)
// app.get("/date", function (req, res) {
// 	let date1 = "09 - 03 - 2020";
// 	let date2 = "16 - 05 - 2020";
// 	connection.query(
// 		`SELECT * FROM individual_result WHERE time BETWEEN ${date1} and ${date2}`,
// 		(error, row, fields, data) => {
// 			if (!!error) {
// 				console.log("Error in the query");
// 			} else {
// 				console.log("seccessful query");
// 				console.log(row);
// 				console.log(data);
// 				res.send(row);
// 			}
// 		}
// 	);
// });


app.use('/download',DownloadRouter)

const port = 5000;
app.listen(port, () => {
	console.log("server started on port " + port);
});
