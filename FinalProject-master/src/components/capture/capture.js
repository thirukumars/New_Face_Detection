import React, { Component } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
// import { browserHistory } from "react-router";

import axios from "axios";
// const MODEL_URL = "/models";

var name = "";
var nameArray = [];
var tempimage =""

const videoConstraints = {
	width: 350,
	height: 350,
	facingMode: "user",
};

class WebCamPicure extends Component {
	constructor() {
		super();
		this.state = {
			takingPicture: false,
			selectedFile: null,
			name: [""],
			named:""
		};
		this.image = null;
		this.webcam = React.createRef();
		this.canvas = React.createRef();
		this.canvasPicWebCam = React.createRef();
		this.fileUploadHandler = this.fileUploadHandler.bind(this);
		this.download = this.download.bind(this);
	}
	// componentDidMount() {
	// 	this.loadModels();
	// }
	// loadModels() {
	// 	// faceapi.loadFaceDetectionModel(MODEL_URL);
	// 	faceapi.loadSsdMobilenetv1Model(MODEL_URL);
	// }
	// OnSecond = () => {
	// 	var AppUrl = "/#Second";
	// 	browserHistory.push(AppUrl);
	// 	window.location.reload();
	// };

	capture = () => {
		const imageSrc = this.webcam.current.getScreenshot();
		//console.log("Take Picture");
		this.landmarkWebCamPicture(imageSrc);
	};
	//   drawDescription = (canvas) => {
	//     faceapi.draw.drawFaceLandmarks(canvas)
	//   }
	landmarkWebCamPicture = (picture) => {
		const ctx = this.canvasPicWebCam.current.getContext("2d");
		// const temp = ctx.toDataURL();
		// console.log("dtat url "+temp+"temp of dataUrl")
		var image = new Image();
		image.onload = async () => {
			ctx.drawImage(image, 0, 0);
			// await faceapi.getFullFaceDescription(this.canvasPicWebCam.current);
			// await faceapi
			// 	.detectAllFaces(this.canvasPicWebCam.current)
			// 	.withFaceLandmarks();

			//   this.drawDescription(this.canvasPicWebCam.current);
		};
		image.src = picture;
		tempimage = document
			.getElementById("canvas")
			.toDataURL("image/png")
			console.log(tempimage)

	};
	download() {
		
		name = prompt("Enter the name:");
		// console.log("download");
		// var download = document.getElementById("download");
		// download.setAttribute("download", name + ".png");
		// var image = document
		// 	.getElementById("canvas")
		// 	.toDataURL("image/png")
		// 	.replace("image/png", "image/octet-stream");
		// download.setAttribute("href", image);
		// // filename.setAttribute("download","file"+"praveen"+".png");
		// // console.log(filename)
		if(name!=null){
		var str = "";
		for (let i of name) {
			if (i != ".") {
				str += i;
			} else {
				break;
			}
		}
		// nameArray.push(str);
		console.log(str)
		this.setState({
			named: str,
		});
		const dummyTO = {
			name:str,
		}
		axios
		.post("/nameArray", dummyTO)
		.then((res) => {
			console.log("uploaded succesfully");
		})
		.catch((err) => {
			console.log(err);
		});
		const data = {
			name:name,
			tempImage:tempimage,
		}
		axios.post('/download',data).then(()=>
			console.log('success')).catch((error)=>console.log(error))
	}
		
	}

	fileSelectedHandler = (event) => {
		console.log(event.target.files[0].name);

		var temp = event.target.files[0].name;
		console.log(temp);
		var str = "";
		for (let i of temp) {
			if (i != ".") {
				str += i;
			} else {
				break;
			}
		}
		nameArray.push(str);
		this.setState({
			selectedFile: event.target.files[0],
			name: nameArray,
		});
	};
	fileUploadHandler = (e) => {
		console.log(this.state.name);
		e.preventDefault();
		const fd = new FormData();
		fd.append("myImage", this.state.selectedFile);
		// fetch("http://localhost:5000/upload", {
		// 	method: "POST",
		// 	headers: { "Content-Type": "multipart/form-data" },
		// 	mode: "no-cors",
		// 	body: fd
		// });
		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};
		axios
			.post("/upload", fd, config)
			.then((response) => {
				alert("The file is successfully uploaded");
			})
			.catch((error) => {});

		// const fd = new FormData();
		// fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
		// // console.log("+");
		// axios
		// 	.post("http://localhost:5000/upload", fd, {
		// 		onUploadProgress: (ProgressEvent) => {
		// 			console.log(
		// 				"upload" +
		// 					Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
		// 					"%"
		// 			);
		// 		}
		// 	})
		// 	.then((res) => {
		// 		console.log(res);
		// 	});
		axios
			.post("/nameArray", this.state.name)
			.then((res) => {
				console.log("uploaded succesfully");
			})
			.catch((err) => {
				console.log(err);
			});
			console.log(this.state.name);
	};

	render() {
		return (
			<div
				className="App" style={{backgroundColor:"rgb(0, 204, 255)",height:"100vh" }}
			
			>
				<div 
					style={{
						margin:"0px",
						display: "flex",
						flexDirection: "row",
						justifyContent:"center",
						alignItems: "center",
					}}>
				<Webcam
					audio={false}
					height={350}
					ref={this.webcam}
					screenshotFormat="image/jpeg"
					width={350}
					videoConstraints={videoConstraints}
				/>
				<img
					src="/img/cameraIcon.png"
					alt="Take Pic"
					height={100}
					onClick={this.capture}
				/>
				<canvas
					id="canvas"
					ref={this.canvasPicWebCam}
					width={350}
					height={350}
				/>
				</div>
				<div style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent:"center",
						margin:"100px",
						
					}}>
									<a id="download">
					<button type="button" onClick={this.download}>
						Capture
					</button>
				</a>
				{/* <button onClick={this.OnSecond}>Recognization</button> */}
				{/* <div class="upload">
					<form onSubmit={this.fileUploadHandler} encType="multipart">
						<input
							type="file"
							name="myImage"
							accept="image/*"
							onChange={this.fileSelectedHandler}
						/>
						<button type="submit">upload</button>
					</form>
					</div> */}
				</div>
			</div>
		);
	}
}
export default WebCamPicure;
