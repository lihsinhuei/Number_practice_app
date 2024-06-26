import React from 'react';
import TableRow from "./TableRow";
import "./Result.css";



class Result extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			records:[]
		}
	}

	componentDidMount(){
		//fetch records from DB
		console.log("Challenge ID:",this.props.theChallengeID);
		fetch(process.env.REACT_APP_API_DOMAIN+'getRecord',{
			headers:{'Content-Type': 'application/json'},
			body:JSON.stringify({
				challengeID:this.props.theChallengeID
			}),
			method: "POST"
		})
		.then(respones => respones.json()) //response is a readableStream, so using .json() to formate it.
		.then(data => {
			console.log("records from DB:",data);
			this.setState({records:data});
		})
		.catch(error=>{
			console.log("failed to fetch result data",error)
		})

	}


	render(){

		if(this.state.records.length == 0){
			return (<div>loading</div>);
		}else{
			const rows = [];
			for (let i = 0; i < this.state.records.length; i++) {
				rows.push(<TableRow record={this.state.records[i]} key={this.state.records[i].question_no} blobURL={this.props.blobURLs[i]} />);
			}

			return(
				<>

					<p><button className=" mainButton" onClick={()=>this.props.onQuizeStatusChange("notStart")}  type="tryAgain">Try again</button> </p> 

					<p>Let's review it </p>
					<div className="tableDiv">
						<table className="table">
						  <thead className="thead-dark">
						    <tr>
						      <th scope="col">#</th>
						      <th scope="col">Number</th>
							  <th scope="col">What you said</th>
						      <th scope="col">Recording</th>
							  <th scope="col">check</th>			
						    </tr>
						  </thead>
						  <tbody>{rows}</tbody>
						</table>
					</div>

				</>
			)

		}



	}


}


export default Result;