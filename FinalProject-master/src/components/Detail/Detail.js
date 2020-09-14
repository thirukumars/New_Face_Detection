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
			batch:''
		}
		this.events = this.events.bind(this);
		// this.OnHome = this.OnHome.bind(this)
	}
	OnHome(e) {
		// var AppUrl = "/#Home";
		// browserHistory.push(AppUrl);
		// window.location.reload();
		e.preventDefault();
		Axios.post('/detail',this.state)
		
		this.props.history.push('/capture')
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

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Subject</Form.Label>
							<Form.Control type="text" placeholder="subject" name="subject"  onChange={this.events}/>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Department</Form.Label>
							<Form.Control
								type="text"
								placeholder="Department"
								name="Deprt"
								onChange={this.events}
							/>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Batch</Form.Label>
							<Form.Control type="text" placeholder="Batch" name="batch" onChange={this.events} />
						</Form.Group>

						<Button variant="primary" type="submit" onClick={this.OnHome.bind(this)}>
							Submit
						</Button>
					</Form>
				</div>
			</div>
		);
	}
}
