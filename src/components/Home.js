import React from 'react';
import ReactDOM from 'react-dom/client';
import Introduction from "./Introduction/Introduction.js";
import Challenge from "./Challenge/Challenge.js";
import Result from "./Result/Result.js";


class Home extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			quizeStatus:"notStart", //notStart(default) / inProgress/ quizEnd
			userName:'',
			challengeIDForSearching:"" //will be passing to the Result.js component to search the records from DB
		}
	}




	onQuizeStatusChange = (status)=>{
		this.setState({quizeStatus:status});
	}


	//for Challenge.js to pass challengeID to Result.js. 
	searchRecords =(id)=>{
		this.setState({challengeIDForSearching:id});
	}


	render(){

		return(
			<>
				{this.state.quizeStatus == "notStart" 
					? <Introduction onQuizeStatusChange={this.onQuizeStatusChange}/> 
					: (this.state.quizeStatus=="inProgress"
						? <Challenge userID={this.props.userID} onQuizeStatusChange={this.onQuizeStatusChange} searchRecords={this.searchRecords}/> 
						: <Result theChallengeID={this.state.challengeIDForSearching} onQuizeStatusChange={this.onQuizeStatusChange}/>
					   )
				}
			</>
		)
	}


}

export default Home;