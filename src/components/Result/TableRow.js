import React from 'react';
import ReactDOM from 'react-dom/client';


const TableRow = (props) =>{
	console.log(props);



	return(
		    <tr>
		      <th scope="row">{props.record.no}</th>
		      <td>{props.record.number}</td>
		      <td>play</td>
		      <td>{props.record.yourAnser}</td>
			  <td>{props.record.status}</td>
		    </tr>
	)
}



export default TableRow;