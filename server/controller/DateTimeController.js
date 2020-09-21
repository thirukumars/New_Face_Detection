const connection = require('../database')
module.exports.DateTimeController = (request, response)=> {
    // let date = "2020-09-29"
    // console.log(request.params.date+"params")
    // let date =new Date();
    //         let ldate =("0"+date.getDate()).slice(-2);
    //         let month = ("0"+(date.getMonth()+1)).slice(-2);
    //         let year = date.getFullYear();
    //         let hours = date.getHours();
    //         let minutes = date.getMinutes();
    //         let seconds = date.getSeconds()
    //         let concat_date = year+"-"+month+"-"+ldate+" "+hours+":"+minutes+":"+seconds;
    //         let concat_date1 = year+"-"+month+"-"+ldate;

            // console.log(concat_date+"conct")
    connection.query(`SELECT * FROM datetime`, (error, row, fields) => {
        if (!!error) {
            console.log("Error in the query rest");
        } else {
            console.log("seccessful query vanthucha");
            console.log(row.length);
            response.send(row);
            

        }
    });
}