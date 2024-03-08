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
			blobURLs:[],
			challengeIDForSearching:"" //will be passing to the Result.js component to search the records from DB
		}
	}




	onQuizeStatusChange = (status)=>{
		this.setState({quizeStatus:status});
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
					? <Introduction onQuizeStatusChange={this.onQuizeStatusChange}/> 
					: (this.state.quizeStatus=="inProgress"
						? <Challenge userID={this.props.userID} onQuizeStatusChange={this.onQuizeStatusChange} saveBlobs={this.saveBlobs} searchRecords={this.searchRecords}/> 
						: <Result theChallengeID={this.state.challengeIDForSearching} blobURLs={this.state.blobURLs} onQuizeStatusChange={this.onQuizeStatusChange} />
					   )
				}
			</>
		)
	}


}

export default Home;