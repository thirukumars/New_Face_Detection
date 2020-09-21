import React, { Component } from "react";
// import { browserHistory } from "react-router";
import {withRouter} from 'react-router-dom'
import "./Detail.css";
import {
	Form,
	FormControl,
	FormGroup,
	ControlLabel,
	Button,
} from "react-bootstrap";
import Axios from "axios";
var class_Name = "";
export default class Detail extends Component {
	constructor(){
		super()
	    this.state={
			staff_name:"",
			subject:'',
			Deprt:'',
			batch:'',
			staff_name_error:"",
			subject_error:'',
			Deprt_error:'',
			batch_error:'',
		}
		this.events = this.events.bind(this);
		this.OnHome = this.OnHome.bind(this)
	}
	validate=()=>{
		let staff_name_error="";
		let subject_error="";
		let Deprt_error="";
		let batch_error="";	

		if(this.state.staff_name ==""){
			staff_name_error="* staff not entered";
			this.setState({staff_name_error});
			return false;
		}
		if(this.state.subject ==""){
			subject_error="* subject not entered";
			this.setState({subject_error});
			return false;
		}
		if(this.state.Deprt ==""){
			Deprt_error="* department not entered";
			this.setState({Deprt_error});
			return false;
		}
		if(this.state.batch ==""){
			batch_error="* batch not entered";
			this.setState({batch_error});
			return false;
		}
		return true;
	}
	OnHome(e) {
		// var AppUrl = "/#Home";
		// browserHistory.push(AppUrl);
		// window.location.reload();
			
		e.preventDefault();
		const validate = this.validate()
		if(validate){
		
				Axios.post('/detail',this.state)
				this.props.history.push('/capture')
		}

	
	};
	events(e) {
		// class_Name = e.target.value;
		// console.log(e.target.value);
		// console.log(class_Name);
		this.setState({
			[e.target.name]:e.target.value
		})
		console.log(this.state)
	}
	render() {
		return (
			<div className="main">
				<h1>EMOTIONAL DETECTION USING MACHINE LEARNING</h1>
				<div className="subContent">
					<Form >
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Staff Name</Form.Label>
							<Form.Control
								name="staff_name"
								type="text"
								placeholder="Staff Name"
								onChange={this.events}
							/>
						</Form.Group>
						<div style={{color:"red",fontSize:"15px"}}>
							{this.state.staff_name_error}
						</div>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Subject</Form.Label>
							<Form.Control type="text" placeholder="subject" name="subject"  onChange={this.events}/>
						</Form.Group>
						<div style={{color:"red",fontSize:"15px"}}>
							{this.state.subject_error}
						</div>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>Department</Form.Label>
							<Form.Control
								type="text"
								placeholder="Department"
								name="Deprt"
								onChange={this.events}
							/>
						</Form.Group>
						<div style={{color:"red",fontSize:"15px"}}>
							{this.state.Deprt_error}
						</div>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>Batch</Form.Label>
							<Form.Control type="text" placeholder="Batch" name="batch" onChange={this.events} />
						</Form.Group>
						<div style={{color:"red",fontSize:"15px"}}>
							{this.state.batch_error}
						</div>
						<Button variant="primary" type="submit" onClick={this.OnHome.bind(this)}>
							Submit
						</Button>
					</Form>
				</div>
			</div>
		);
	}
}
