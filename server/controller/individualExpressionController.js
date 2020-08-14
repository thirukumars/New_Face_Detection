const connection = require('../database');
module.exports.individualExpressionController = (request, response)=> {
        var names;
        connection.query("SELECT * FROM individual_result", (error, row, fields) => {
            if (!!error) {
                console.log("Error in the query");
            } else {
                console.log("seccessful query");
                console.log(row.length);
                response.send(row);
            }
        });
    }