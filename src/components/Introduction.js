import React from 'react';
import ReactDOM from 'react-dom/client';


const Introduction = (props)=>{
	return(
		<>
			<div className="container">
				<div>
					<p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
						proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</div>
				<div>
					<button onClick={()=>props.onQuizeStatusChange("inProgress")} className="w-100 btn btn-lg btn-primary" type="start">start</button>
				</div>
			</div>
		</>
	)
}


export default Introduction;