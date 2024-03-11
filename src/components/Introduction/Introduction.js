import React from 'react';
import ReactDOM from 'react-dom/client';
import './Introduction.css';



const Introduction = (props)=>{

	return(
		<div className="nomalContainer">
			<h1>Number Challenge</h1>
				<p className="pLeft">	Learning a new language can be tough, right? Especially when it comes to numbers! <br />
					Even though we can count in English, reading numbers randomly can be tricky. That's where this app jumps in to help!<br />
					<br />
					<b> Here's how this app works:</b> <br />
					1. You'll face 10 numbers challenges, popping up one after another. <br />
					2. Your job? Speak each number clearly and hit the red button to send your voice.<br />
					3. repeat the last step until the challenge ends. <br />
					4. Review your results and listen to your recordings to improve your skills <br />
					<br />
					Just squeeze in some practice time whenever you can, and boom! You'll notice your speaking skills getting sharper day by day. Easy peasy!
				</p>
			<p className="pLeft">Ready to start the challenge?</p>
			<div className="center" >
				<button className=" mainButton" onClick={()=>props.onQuizeStatusChange("inProgress")}  type="start">start</button>
			</div>

		</div>
	)
}


export default Introduction;