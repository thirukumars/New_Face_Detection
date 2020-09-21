const connection = require('../database');
const dateFormat = require('dateformat')
module.exports.individualExpressionController = (request, response)=> {
        let date =new Date();
            let ldate =("0"+date.getDate()).slice(-2);
            let month = ("0"+(date.getMonth()+1)).slice(-2);
            let year = date.getFullYear();
            let concat_date = year+"-"+month+"-"+ldate+" "+"00:00:00";
            console.log(concat_date)
    connection.query(`SELECT * FROM individual_result WHERE date >= "${concat_date}"`, (error, row, fields) => {
            if (!!error) {
                console.log("Error in the query");
            } else {
                console.log("seccessful query came");
                console.log(row.length);
                response.send(row);
            }
        });
    }
   
    // your date-column < '2013-12-13' and your date-column >= '2013-12-12'
    // cast (datediff (day, 0, yourdate) as datetime) = '2012-12-12'
    // date < '2020-09-30' and date >= ${date}

    