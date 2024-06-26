import React from 'react';
import "./Challenge.css";
import MicRecorder from 'mic-recorder-to-mp3';
import Countdown from "./Countdown.js";


//set the bit rate for the audio to be recorded to 128 bits
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Challenge extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			challenge_id:0, //grap from DB
			questionArray:[], //store questions for this round
			whichQuestion: 0, //0-9
			isSkip: false, //default false
			
			//states of mic-recorder-to-mp3 
			isRecording: false,
			blobURL: '',
			isBlocked: false,

			countdownMounted: true,//countdowntest

		}
	}

	//for sending to the display page
	blobURLs=[];

	componentDidMount(){

		// Create a new challenge
		fetch(process.env.REACT_APP_API_DOMAIN+'newChallenge',{
			headers:{'Content-Type': 'application/json'},
			body:JSON.stringify({
					userID:this.props.userID,
			}),
			method: "POST"
		})
		.then(response=>response.json())
		.then(data=>{
			this.setState({challenge_id : data.challenge_id});
		})
		.catch(error=>{
			console.log("failed to create a new challenge",error)
		})

		// Create quizs for this challenge
		for(let i=0 ; i<this.props.totalQuiz.value ; i++){
			let opt = Math.floor(Math.random()* Math.pow(10,this.props.maxDigit.value));
			this.state.questionArray.push(opt);
		}
		console.log("quizs array:",this.state.questionArray);


		// check if the permission for the microphone is allowed in the browser.
		navigator.getUserMedia({ audio: true },() => {
		    console.log('Permission Granted');
		    this.setState({ isBlocked: false });
		    this.start();
		  },
			  () => {
			    console.log('Permission Denied');
			    this.setState({ isBlocked: true })
			  },
		);
	}

	componentDidUpdate(){

	}


	sendAnswer(){
		this.setState({isSkip:false});

		console.log("whichQuesion:",this.state.whichQuestion);
		if(this.state.whichQuestion === this.props.totalQuiz.value-1){
			//sending the callenge id to Result.js(sibling) through Home.js(parent)
			this.props.searchRecords(this.state.challenge_id);
			
			//sending the audio urls to Result.js(sibling) through Home.js(parent)
			this.props.saveBlobs(this.blobURLs);

			//end the quiz
			this.props.onQuizeStatusChange("quizEnd");
			console.log("end quiz");
		}else{
			this.setState({whichQuestion:this.state.whichQuestion+1})
			this.start();
		}
	}


	//mic-recorder-to-mp3 audio recording 
	start = () => {
	if (this.state.isBlocked) {
	  console.log('Permission Denied');
	} else {
	  Mp3Recorder
	    .start()
	    .then(() => {
	      this.setState({ isRecording: true });
	    }).catch((e) => console.error(e));
	}
	};

	//mic-recorder-to-mp3 audio stop recording and then sending the answer. 
	stop = () => {
	console.log("in stop()");
	//to unmount the Countdown component
	this.setState({ countdownMounted: false }); 
	
	Mp3Recorder
	  .stop()
	  .getMp3()
	  .then(([buffer, blob]) => {

	    //create a blobURL,and push to the blobURLs array, which will be used in the display page, so users can play their recordings.
		const blobURL = URL.createObjectURL(blob)
		this.blobURLs.push(blobURL);

	    //using FormData to send the blob to server
	     var fd = new FormData();
		 const fileName = `${this.props.userID}_${this.state.challenge_id}_${this.state.whichQuestion}.mp3` 
		 console.log(fileName);
	     fd.append("blob",blob, fileName);
		 fd.append("challengeID",this.state.challenge_id);
		 fd.append("quizNo",this.state.whichQuestion);
		 fd.append("givenNumber",this.state.questionArray[this.state.whichQuestion]);
		 fd.append("isSkip",this.state.isSkip);


		async function processAudio(){
			const response = await fetch(process.env.REACT_APP_API_DOMAIN+'processUserRecording', {
				// while sending FormData object, the web AIP will automatically add the content-type as multipart/form-data. 
				method: "POST", 
				body: fd
			})
		}
		processAudio()
		.then(response=> {
			this.sendAnswer();
			this.setState({ blobURL:"", isRecording: false,countdownMounted:true });
		})
	    

	  })
	  	.catch((e) => console.log(e));
	  

	};

	render(){

		if(this.state.questionArray.length === 0 ){
			return(
				<div>preparing the text....</div>
			)
		}else{
			while(this.state.whichQuestion < this.props.totalQuiz.value){
				return(
					<>
						<p>Quiz no.{this.state.whichQuestion+1}  (total {this.props.totalQuiz.value} quizzes)</p>
						<div className="quizNumberDiv">
							<p>{this.state.questionArray[this.state.whichQuestion]}</p>
						</div>
						<img />


						{this.state.isRecording 
							?  
							<div >
								<div>
									{this.state.countdownMounted && <Countdown stop={this.stop} whichQuestion={this.state.whichQuestion}/>} 
								</div>
								<div>
									<p>Hit the red button to send your recording</p>
								</div>
								<div className="center">
									<button 
										onClick={()=> this.stop()}
										className="recordButton Rec" 
										id="recButton">
									</button>
								</div>
							</div>
							:
							<div className="center">
								<button 
									onClick={()=> this.start()}
									className="recordButton notRec" 
									id="recButton">
								</button>
							</div>
						}


						{/* <div className="center">
							<button className=" mainButton" onClick={()=>this.skipAQuestion()}  type="skip">Skip</button>
							<button className=" mainButton" onClick={()=>this.exitQuiz()}  type="send">Exit</button>
						</div> */}
					</>
				)
			}	
		}

		

	}

}


export default Challenge;