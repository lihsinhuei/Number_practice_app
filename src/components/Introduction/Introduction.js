import React from 'react';
import './Introduction.css';
import MyDropdown from './MyDropdown';

const Introduction = (props)=>{

	const totalQuizOptions=[
		{ value: 5, label: '5' },
		{ value: 10, label: '10' },
		{ value: 15, label: '15' },
		{ value: 20, label: '20' },
	]

	const digitOptions=[
		{ value: 2, label: '2' },
		{ value: 3, label: '3' },
		{ value: 4, label: '4' },
		{ value: 5, label: '5' },
	];

	var totalQuiz={ value: 5, label: '5' };
	var maxDigit={ value: 2, label: '2' };

	function setDigit(userSelected){
		maxDigit=userSelected;
	}

	function setTotalQuiz(userSelected){
		totalQuiz=userSelected;
	}

	return(
		<div className="nomalContainer">
			<h1>Number Challenge</h1>
				<p className="pLeft">	Learning a new language can be tough, right? Especially when it comes to numbers! Even though we can count in English, reading numbers randomly can be tricky. That's where this app jumps in to help!<br />
					<br />
					<b> Here's how this app works:</b> <br />
					1. You'll face 10 numbers challenges, popping up one after another. <br />
					2. Your job? Speak each number clearly and hit the red button to send your voice.<br />
					3. repeat the last step until the challenge ends. <br />
					4. Review your results and listen to your recordings to improve your skills <br />
				</p>
			<p className="pLeft">Ready to start the challenge?</p>
			<div>
				<b className="pLeft">How many quizs:</b>
				<MyDropdown handleSelect={setTotalQuiz} options={totalQuizOptions} dropdownTitle={"How many quizs"}/>		
			</div>
			<div>
				<b className="pLeft">Select the maximum number of digits:</b>
				<MyDropdown handleSelect={setDigit} options={digitOptions} dropdownTitle={"select the maximum digit"}/>
			</div>
			<div className="center" >
				<button className=" mainButton" onClick={()=>props.onQuizeStatusChangeFromIntro("inProgress",maxDigit,totalQuiz)}  type="start">start</button>
			</div>

		</div>
	)
}


export default Introduction;