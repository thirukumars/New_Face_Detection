const connection = require('../database')
const FileReader = require('fs')
module.exports.DownloadController = (req,res)=>{
	
        let image = req.body.tempImage.replace(/^data:image\/png;base64,/, "");
        let nameOfImage = req.body.name;
        // console.log(nameOfImage)
        FileReader.writeFile(`../FinalProject-master/public/img/${nameOfImage}.png`,image,'base64',function(err){
            if(err){
                console.log(err);
            }
        })
}