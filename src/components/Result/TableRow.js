import React from 'react';


const TableRow = (props) =>{

	return(
		    <tr>
		      <th scope="row">{props.record.question_no}</th>
		      <td>{props.record.given_number}</td>
		      <td>{props.record.transcribe}</td>
		      <td>
				<audio src={props.blobURL} controls/>
			  </td>
			  <td>{props.record.is_correct}</td>
		    </tr>
	)
}



export default TableRow;