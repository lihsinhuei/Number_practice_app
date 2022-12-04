import React from 'react';
import ReactDOM from 'react-dom/client';
import './Introduction.css';



const Introduction = (props)=>{
	console.log(props);

	return(
		<div className="nomalContainer">
				<p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
						proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</p>
			<p >Ready to start the challenge?</p>
			<div className="center" >
				<button className=" mainButton" onClick={()=>props.onQuizeStatusChange("inProgress")}  type="start">start</button>
			</div>

		</div>
	)
}


export default Introduction;