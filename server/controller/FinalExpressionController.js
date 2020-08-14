const connection = require('../database')
module.exports.finalExpressionController = (request,response)=>{
    
        var name_Array = request.body.user.names_Array;
        var expression_Array = request.body.user.expression_Array;
        var Average_expression = request.body.user.Average_expression;
        console.log(request.body.user.names_Array);
        console.log(request.body.user.expression_Array);
        for (let i = 0; i < name_Array.length; i++) {
            var query =
                "INSERT INTO individual_result (`name`, `expression`) VALUES (?)";
            var values = [[name_Array[i], expression_Array[i]]];
            connection.query(query, values, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("total number of rows affected" + result.affectedRows);
                }
            });
        }
        var query1 = "INSERT INTO overall_expression (`expression`) VALUES (?)";
        var values1 = [[Average_expression]];
        connection.query(query1, values1, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(
                    "total number of rows affected in overall" + result.affectedRows
                );
            }
        });
    }