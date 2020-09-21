const connection = require('../database');
// const dateFormat = require('dateformat');

module.exports.finalExpressionController = (request,response)=>{
    
        var name_Array = request.body.user.names_Array;
        var expression_Array = request.body.user.expression_Array;
        var Average_expression = request.body.user.Average_expression;
        console.log(request.body.user.names_Array);
        console.log(request.body.user.expression_Array);
        for (let i = 0; i < name_Array.length; i++) {
            let date =new Date();
            let ldate =("0"+date.getDate()).slice(-2);
            let month = ("0"+(date.getMonth()+1)).slice(-2);
            let year = date.getFullYear();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds()
            let concat_date = year+"-"+month+"-"+ldate+" "+hours+":"+minutes+":"+seconds;
            console.log(year+"-"+month+"-"+date)
            var query =
                "INSERT INTO individual_result (`name`, `expression`,`date`) VALUES (?)";
            var values = [[name_Array[i], expression_Array[i],concat_date]];
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