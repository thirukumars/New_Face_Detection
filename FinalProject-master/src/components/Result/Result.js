import React, { Component } from "react";
import Axios from "../../../../server/node_modules/axios";
import MappingResult from "./mappingResult";
import "./result.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
var temp;
var temp1 = null;
var name = [];
var expression = [];
var table;
var staff_name="";
var date_json;
var dateNew="";
var timeNew="";
export default class Result extends Component {
	constructor() {
		super();
		this.state = {
			data: null,
			time:null,
			overall: "",
			staff_name:"",
			subject:"",
			department:"",
			batch:"",
			startDate:new Date()
		};
		this.final = this.final.bind(this);
		this.handleChange = this.handleChange.bind(this)
		this.handleChangeDate = this.handleChangeDate.bind(this)
	}
	componentDidMount() {
		Axios.get("/individualExpression").then((res) => {
			if (res.data != null) {
				temp = res.data;
			}
			// console.log(res.data);

			for (let i in temp) {
				name[i] = temp[i].name;
				expression[i] = temp[i].expression;
			}
			this.setState({
				data: res.data,
				
			});
		});

		Axios.get("/overallExpression").then((res) => {
			if (res.data != null) {
				temp1 = res.data;
			}
			// console.log(res.data);

			this.setState({
				overall: res.data.expression,
			});
		});
		var details=null;
		
		Axios.get("/detail").then((response) => {
			if (response.data != null) {
				 details = response.data;
			}
			for(let i = 0;i < details.length;i++){
				staff_name=details[i].staff_name;
				this.setState({
					staff_name:details[i].staff_name,
					subject:details[i].subject,
					department:details[i].department,
					batch:details[i].batch
				})
			// console.log(details[i].staff_name+"  "+details[i].subject+"  "+details[i].department+"  "+details[i].batch);
			//  console.log(details[0].staff_name)
			}
			
		});


		Axios.get('/date').then(res =>console.log(res.data)).catch(err => console.log(err))

		// console.log(Object.keys(temp[0]));
		// console.log(this.state.data);
	}
	final() {
		table = <MappingResult data={this.state.data} />;
	}
	handleChange =  (date) =>{
		console.log(this.state.startDate)
		this.setState({
			startDate:date
		})
	}
	handleChangeDate =  (time) =>{
		// console.log(time.target.value+"it is called time baby");
		this.setState({
			startTime:time.target.value
		},()=>{
			console.log(this.state.startTime)
			this.postData()
		})
	}
	postData(){
		date_json = {
			date:this.state.startDate,
			time:this.state.startTime
		}
		const post = Axios.post(`/date`,date_json).then(()=>
		console.log('success')).catch((error)=>console.log(error))
	}
	sendData = ()=>{
		Axios.get('/dateTime').then((res)=>{
			// console.log(res.data+"success");
			var dateAndTime = res.data;
			let length = dateAndTime.length;
			// for(let i = 0; i < dateAndTime.length;i++){
				// console.log(dateAndTime[i].date.split('T')[0]);
				// console.log(dateAndTime[i].time);
				dateNew=dateAndTime[length-1].date.split('T')[0];
				timeNew=dateAndTime[length-1].time;
				console.log(dateNew+"ha"+timeNew)
				// console.log(dateAndTime[length-1].date.split('T')[0]+"T"+dateAndTime[length-1].time+".000Z");
				// 2020-09-21T19:45:46.000Z

			// }
		}).catch(err => console.log(err))
		const filtered = temp.filter((data)=>{
			if(data.date.split("T")[0].includes(dateNew)&&data.date.split("T")[1].split('.')[0]>=(timeNew)){
				return data   
				//filtered data based on the time and date
				//need to do end time after 45 mins
				//and also individual and overall based on the date and time specified
			}
			// data.date.split("T")[0].includes(dateNew)
			// console.log(data.date.split("T")[0]+" what is this do you know"+data.date.split("T")[1].split('.')[0])
		})
		console.log(filtered)
		// console.log(date_json)
		
	}

	render() {
		// var dummy = temp[0].map((value) => {
		// 	console.log(value.name);
		// });
		// var list = name.map((name) => {
		// 	<tr>{name}</tr>;
		// });
		if (name.length > 1 && temp1 != null) {
			console.log("hi");
			// this.setState({
			// 	data: temp,
			// });
			// console.log(this.state.data);
			// console.log(temp);
			// console.log(name);
			// console.log(expression);
			this.final();
		}

		return (
			<div>
			<div className="main_result">
				<div className="sub1_result">
					{/* <MappingResult data={this.state.data} /> */}
					<h1>INDIVIDUAL EXPRESSION</h1>
					{table}
				</div>
				<div className="sub2_result">
					<h1>Overall Expression</h1>
					<h3>{this.state.overall}</h3>
				</div>
			</div>

			<div>
					<h3>{ "Staff :"+this.state.staff_name}</h3>
					<h3>{ "Subject :"+this.state.subject}</h3>
					<h3>{ "Department :"+this.state.department}</h3>
					<h3>{ "Batch :"+this.state.batch}</h3>
					<div style={{display:"flex",justifyContent:"center"}}>
					<DatePicker  
					
					selected={this.state.startDate}
					onChange={this.handleChange}
					// calendarContainer={}
					/>
					<input type="time"  min="09:00" max="16:00" onChange={(e)=>{this.handleChangeDate(e)}}  pattern="([1]?[0-9]|2[0-3]):[0-5][0-9]"/>
					<input type="button" style={{backgroundColor:"skyblue",}} onClick={this.sendData} value="OK"/>
					</div>
				
			</div>
			</div>
		);
	}
}
