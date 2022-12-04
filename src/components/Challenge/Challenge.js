import React from 'react';
import ReactDOM from 'react-dom/client';
import "./Challenge.css";


class Challenge extends React.Component {


	constructor(props){
		super(props);
		this.state = {
			challenge_id:0, //grap from DB
			questionArray:[], //store questions for this round
			whichQuestion: 0, //0-9
			isSkip: false //default false
		}
	}


	componentDidMount(){
		// Create a new challenge
		this.setState({challenge_id : this.state.challenge_id++});

		// Create 10 numbers for this challenge
		for(let i=0 ; i<10 ; i++){
			let opt = Math.floor(Math.random()*100);
			this.state.questionArray.push(opt);
		}
		console.log(this.state.questionArray);

	}


	skipAQuestion(){
		//TBD: stop recording 
		this.setState({isSkip:true});
		//TBD: insert a new record to DB

		if(this.state.whichQuestion == 9){
			//end the quiz
			this.props.onQuizeStatusChange("quizEnd");
		}else{
			this.setState({whichQuestion:this.state.whichQuestion+1})
		}


	}

	sendAnswer(){
		//TBD: stop recording 
		this.setState({isSkip:false});
		//TBD: insert a new record to DB
		
		if(this.state.whichQuestion == 9){
			//end the quiz
			this.props.onQuizeStatusChange("quizEnd");
		}else{
			this.setState({whichQuestion:this.state.whichQuestion+1})
		}

	}

	exitQuiz(){
		//TBD: stop recording 
		this.setState({isSkip:true});
		//TBD: insert records of the rest questions to DB
		this.props.onQuizeStatusChange("quizEnd");
	}




	render(){
		if(this.state.questionArray.length == 0 ){
			return(
				<div>preparing the text....</div>
			)
		}else{
			while(this.state.whichQuestion <10){
				return(
					<>
						<p>Quiz no.{this.state.whichQuestion+1}  (total 10 quizzes)</p>
						<div className="quizNumberDiv">
							<p>{this.state.questionArray[this.state.whichQuestion]}</p>
						</div>
						<img />
						<div className="center">
							<button className=" mainButton" onClick={()=>this.skipAQuestion()}  type="skip">Skip</button>
							<button className=" mainButton" onClick={()=>this.sendAnswer()}  type="send">Send</button>
							<button className=" mainButton" onClick={()=>this.exitQuiz()}  type="send">Exit</button>
						</div>
					</>
				)
			}	
		}

		

	}

}


export default Challenge;