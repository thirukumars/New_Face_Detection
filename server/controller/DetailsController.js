var connection = require('../database')
module.exports.DetailsController=(req,res) =>{
    detail_data = req.body;
    console.log(detail_data)
    var query =
                "INSERT INTO details (`staff_name`, `subject`, `department`,`batch`) VALUES (?)";
            var values = [[detail_data.staff_name,detail_data.subject,detail_data.Deprt,detail_data.batch]];
            connection.query(query, values, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("total number of rows affected" + result.affectedRows);
                }
            });
};
module.exports.getDetailsController=(req,res) =>{
    detail_data = req.body;
    console.log(detail_data)
    // var query =
    //             "INSERT INTO details (`staff_name`, `subject`, `department`,`batch`) VALUES (?)";
                connection.query("SELECT * FROM details", (error, row, fields) => {
                    if (!!error) {
                        console.log("Error in the query");
                    } else {
                        console.log("seccessful query from detail");
                        console.log(row.length);
                        res.send(row);
                       
                    }
                });
};