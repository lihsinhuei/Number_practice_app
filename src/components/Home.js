import React from 'react';
import Introduction from "./Introduction/Introduction.js";
import Challenge from "./Challenge/Challenge.js";
import Result from "./Result/Result.js";


class Home extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			quizeStatus:"notStart", //notStart(default) / inProgress/ quizEnd
			userName:'',
			maxDigit:2,	//defualt max number is 99
			totalQuiz:5, //defual 5 questions for each challenge
			blobURLs:[],
			challengeIDForSearching:"" //will be passing to the Result.js component to search the records from DB
		}
	}




	onQuizeStatusChange = (status)=>{
		this.setState({quizeStatus:status});
	}

	onQuizeStatusChangeFromIntro = (status, maxDigit,totalQuiz )=>{
		this.setState({
			quizeStatus:status,
			maxDigit:maxDigit,
			totalQuiz:totalQuiz
		});
	}


	saveBlobs = (audioURLs)=>{
		this.setState({blobURLs:audioURLs});
	}

	//for Challenge.js to pass challengeID to Result.js. 
	searchRecords =(id)=>{
		this.setState({challengeIDForSearching:id});
	}




	render(){

		return(
			<>
				{this.state.quizeStatus == "notStart" 
					? <Introduction onQuizeStatusChangeFromIntro={this.onQuizeStatusChangeFromIntro}/> 
					: (this.state.quizeStatus=="inProgress"
						? <Challenge userID={this.props.userID} totalQuiz={this.state.totalQuiz} maxDigit={this.state.maxDigit} onQuizeStatusChange={this.onQuizeStatusChange} saveBlobs={this.saveBlobs} searchRecords={this.searchRecords}/> 
						: <Result theChallengeID={this.state.challengeIDForSearching} blobURLs={this.state.blobURLs} onQuizeStatusChange={this.onQuizeStatusChange} />
					   )
				}
			</>
		)
	}


}

export default Home;