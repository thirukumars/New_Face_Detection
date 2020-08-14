const connection = require('../database');
const mysql = require('mysql')

nameArray = [];
module.exports.nameArrayController=(req,res)=>{
	
	console.log("this is the body data"+req.body.name);
	// for (let i = 0; i < nameArray.length; i++) {
		var query = "INSERT INTO name_array (`name`) VALUES (?)";
		let values = req.body.name
		console.log("the value of names"+values)
		connection.query(query, values, (err, result) => {
			if (err) {
				console.log(err);
			} else {
				console.log(
					"total number of rows affected in namearray" + result.affectedRows
				);
			}
		});
	// }
}

module.exports.getNameArrayController =(req, res) =>{
	var names;
	connection.query("SELECT * FROM name_array", (error, row, fields) => {
		if (!!error) {
			console.log("Error in the query");
		} else {
			console.log("seccessful query");
			console.log(row.length);
			res.send(row);
			for (let i in row) {
				console.log(row[i].name);
			}
		}
	});
	// res.json(names);
}
