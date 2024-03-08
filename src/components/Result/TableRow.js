import React from 'react';
import ReactDOM from 'react-dom/client';


const TableRow = (props) =>{
	console.log("here",props);


	return(
		    <tr>
		      <th scope="row">{props.record.question_no}</th>
		      <td>{props.record.given_number}</td>
		      <td>{props.record.transcribe}</td>
		      <td>{props.record.file_name}</td>
			  <td>{props.record.is_correct}</td>
		    </tr>
	)
}



export default TableRow;