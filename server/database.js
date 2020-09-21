const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "expression_detection",
	timezone:"utc"
});

connection.connect((err) => {
	if (!!err) {
		console.log("error");
	} else {
		console.log("connected");
	}
});
module.exports=connection
