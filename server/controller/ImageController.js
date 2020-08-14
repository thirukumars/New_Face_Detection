const connection = require('../database')
module.exports.ImageController = (req,res)=>{
        var imageArray = [];
        connection.query("SELECT * FROM images", (error, result, fields,data) => {
            if (!!error) {
                console.log("Error in the query");
            } else {
                console.log("seccessful query");
                // console.log(row[0].name+"id");
                // console.log(result);
                // console.log(data);
                // var img = <img src={"data:image/jpeg;" + bufferBase64} />;
                // var reader = FileReader();
                // FileReader.readAsDataURL(row[0].image);  /// error in this line
                // FileReader.onloadend = function () {
                // 	var base64data = reader.result;
                // 	console.log(base64data);
                // };
    
                // var imageBuffer = row[0].image.buffer;
                // var imageName = "public/images/map.png";
    
                // fs.createWriteStream(imageName).write(imageBuffer);
                // var BlOBImage = row[0].image;
                // res.send(BlOBImage);
                var buffer = new Buffer(result[2].image, "binary");
                var bufferBase64 = buffer.toString("base64");
                // const imageDisplay = ({ bufferBase64 }) => (
                // 	<img src={`data:image/jpeg;base64,${bufferBase64}`} />
                // );
                res.send(bufferBase64);
                // res.sendFile(path.resolve(__dirname, "./public/uploads/boobal.jpg")); //it will display the image in path
                // res.send(imageDisplay);
    
                // res.send(row[0].image);
                // imageArray = imageArray.push(bufferBase64);
            }
        });

}