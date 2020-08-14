const connection =  require('../database');
// const connection =  require('../../FinalProject-master/public/img/');

const multer = require("multer");
var fs = require("fs");
module.exports.uploadController = (req,res)=>{

    upload(req, res, function (err) {
        image_name = req.file.filename;
                // image_name = "Gokul.png";

        console.log("Request ---", req.body);
        console.log("Request file ---", req.file); //Here you get file.
        console.log("Request file ---", req.file.filename);
        uploadImage();

        /*Now do where ever you want to do*/
        if (!err) {
            return res.sendStatus(200).end();
        }
    });
}

    const storage = multer.diskStorage({
        destination: "./public/uploads/",
        // destination: "../../FinalProject-master/public/img/",
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
    });
    const upload = multer({
        storage: storage,
        limits: { fileSize: 1000000 },
    }).single("myImage");
    // const router = express.Router();
    
    
      
    
        function uploadImage() {
            console.log("name" + image_name);
            var praveen = {
                // image: fs.readFileSync(`../../FinalProject-master/public/img/${image_name}`),
                                image: fs.readFileSync(`./public/uploads/${image_name}`),
                name: image_name,
            };
            connection.query("INSERT INTO images SET ? ", praveen, function (
                err,
                result
            ) {
                console.log(result);
            });
        }
    