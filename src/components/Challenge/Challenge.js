import React from 'react';
import ReactDOM from 'react-dom/client';
import "./Challenge.css";
import MicRecorder from 'mic-recorder-to-mp3';


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
		}
	}

	

	componentDidMount(){
		// Create a new challenge
		this.setState({challenge_id : this.state.challenge_id+1});

		// Create 10 numbers for this challenge
		for(let i=0 ; i<10 ; i++){
			let opt = Math.floor(Math.random()*100);
			this.state.questionArray.push(opt);
		}
		console.log(this.state.questionArray);


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


	skipAQuestion(){
		//TBD: stop recording 
		this.setState({isSkip:true});
		//TBD: insert a new record to DB

		if(this.state.whichQuestion === 9){
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
		
		if(this.state.whichQuestion === 9){
			//end the quiz
			this.props.onQuizeStatusChange("quizEnd");
		}else{
			this.setState({whichQuestion:this.state.whichQuestion+1})
			this.start();
		}

	}

	exitQuiz(){
		//TBD: stop recording 
		this.setState({isSkip:true});
		//TBD: insert records of the rest questions to DB
		this.props.onQuizeStatusChange("quizEnd");
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
	Mp3Recorder
	  .stop()
	  .getMp3()
	  .then(([buffer, blob]) => {

	    const blobURL = URL.createObjectURL(blob)

	    //using FormData to send the blob to server
	     var fd = new FormData();
		 const fileName = `${this.state.challenge_id}_${this.state.whichQuestion}.mp3` 
		 console.log(fileName);
	     fd.append("blob",blob, fileName);

		fetch('http://localhost:3000/processUserRecording', {
		    // headers: {'Content-Type': 'multipart/form-data; boundary=WebAppBoundary'},
		    // while sending FormData object, the web AIP will automatically add the content-type as multipart/form-data. 
		    method: "POST", 
		    body: fd
		});

	    this.setState({ blobURL, isRecording: false });
	  }).catch((e) => console.log(e));
	  

	  this.sendAnswer();

	};

	render(){

		if(this.state.questionArray.length === 0 ){
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

						<p>Click the button to stop recording and send</p>
						
						{this.state.isRecording 
							?  
							<div className="center"><button 
								onClick={()=> this.stop()}
								className="recordButton Rec" 
								id="recButton">
							</button></div>
							:
							<div className="center"><button 
								onClick={()=> this.start()}
								className="recordButton notRec" 
								id="recButton">
							</button></div>
						}

{/*						<button onClick={this.start} disabled={this.state.isRecording}>
						  Record
						</button>
						<button onClick={this.stop} disabled={!this.state.isRecording}>
						  Stop
						</button>
						<audio src={this.state.blobURL} controls="controls" />*/}



						<div className="center">
							<button className=" mainButton" onClick={()=>this.skipAQuestion()}  type="skip">Skip</button>
							<button className=" mainButton" onClick={()=>this.exitQuiz()}  type="send">Exit</button>
						</div>
					</>
				)
			}	
		}

		

	}

}


export default Challenge;