import React from 'react';
import ReactDOM from 'react-dom/client';
import Introduction from "./Introduction.js";
import Challenge from "./Challenge.js";
import Result from "./Result.js";


class Home extends React.Component{
	constructor(){
		super();
		this.state = {
			quizeStatus:"notStart", //notStart(default) / inProgress/ quizEnd
			challenge_id :'', //grap from DB
			questionArray:[], //store questions for this round
			whichQuestion: 0, //0-9
			isSkip: false //default false 
		}
	}


	onQuizeStatusChange = (status)=>{
		this.setState({quizeStatus:status});
	}



	render(){

		return(
			<>
				{this.state.quizeStatus == "notStart" ? 
					<Introduction onQuizeStatusChange={this.state.onQuizeStatusChange}/> :
					(this.state.quizeStatus=="inProgress"? 
						<Challenge onQuizeStatusChange={this.state.onQuizeStatusChange}/> :
						<Result onQuizeStatusChange={this.state.onQuizeStatusChange}/>)
				}
			</>
		)
	}


}

export default Home;