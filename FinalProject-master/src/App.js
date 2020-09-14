import React, { Component } from "react";
// import { browserHistory } from "react-router";
import Detail from './components/Detail/Detail'
import Nav from './components/nav/nav'
import Capture from './components/capture/capture'
import Detect from './components/camera/Camera'
import './App.css'

import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

var res;
class App extends Component {
	    // "babel-loader": "^8.0.6",

	constructor() {
		super();
		this.state = {
			value: "capture"
		};
	}

	// OnFirst = () => {
	// 	var AppUrl = "/#First";
	// 	browserHistory.push(AppUrl);
	// 	window.location.reload();
	// };
	// OnSecond = () => {
	// 	var AppUrl = "/#Second";
	// 	browserHistory.push(AppUrl);
	// 	window.location.reload();
	// };

	render() {
		return (
			<Router>
			<div>
				<Nav/>
				
					<Switch>
				<Route exact path='/'  component={Detail}/>
				<Route path='/capture' component={Capture}/>
				<Route path='/Detect' component={Detect}/>
				
				
				
				</Switch>
				
				{/* <button onClick={this.OnFirst}>CaptureImage</button>
				<button onClick={this.OnSecond}>Recognization</button> */}
			</div>
			</Router>
		);
	}
}

export default App;
