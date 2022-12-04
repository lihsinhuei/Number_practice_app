import React from 'react';
import ReactDOM from 'react-dom/client';
import TableRow from "./TableRow";
import "./Result.css";



class Result extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			records:[
				{
					no:1,
					number:111,
					record:"play",
					yourAnser:"111",
					status: "correct"
				},
				{
					no:2,
					number:222,
					record:"play",
					yourAnser:"123",
					status: "false"
				},				
				{
					no:3,
					number:333,
					record:"no record",
					yourAnser:"no record",
					status: "skipped"
				},
				{
					no:4,
					number:444,
					record:"play",
					yourAnser:"444",
					status: "correct"
				},
			]
		}
	}

	componentDidMount(){
		//TBD:fetch records from DB
	}


	render(){

		if(this.state.records.length == 0){
			return (<div>loading</div>);
		}else{
			const rows = [];
			for (let i = 0; i < this.state.records.length; i++) {
				rows.push(<TableRow record={this.state.records[i]} key={this.state.records[i].no}  />);
			}
			console.log(rows);
			return(
				<>
					<p>Good Job!</p>
					<p>Your score: 10 out of 10 <button className=" mainButton" onClick={()=>this.props.onQuizeStatusChange("notStart")}  type="tryAgain">Try again</button> </p> 

					<p>Review your works </p>
					<div className="tableDiv">
						<table className="table">
						  <thead className="thead-dark">
						    <tr>
						      <th scope="col">#</th>
						      <th scope="col">Quiz</th>
						      <th scope="col">Record</th>
						      <th scope="col">Your answer</th>
							  <th scope="col"> check</th>			
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