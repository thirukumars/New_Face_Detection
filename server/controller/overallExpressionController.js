const connection = require('../database');
module.exports.overallExpressionController = (request, response)=> {
    var names;
	connection.query("SELECT * FROM overall_expression", (error, row, fields) => {
		if (!!error) {
			console.log("Error in the query");
		} else {
			console.log("seccessful query");
			console.log(row.length);
			console.log(row[row.length - 1]);
			response.send(row[row.length - 1]);
		}
    })
}