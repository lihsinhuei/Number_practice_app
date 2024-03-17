import React from "react";
import Select from 'react-select'
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import 'bootstrap/dist/css/bootstrap.min.css';

const MyDropdown = (props)=>{

    return(
        <div>
            {/* <select onChange={props.handleSelect}> 
                {options.map((data)=>(
                    <option title={data.value} key={data.lable}>{data.value}</option>
                ))}
            </select> */}
            <Select onChange={props.handleSelect} options={props.options} defaultValue={props.options[0]} />
                {/* <DropdownButton id="dropdown-basic-button" title={props.dropdownTitle}>
                {listArray.map(data=>(
                     <Dropdown.Item title={data} onChange={this.handleSelect}>{data}</Dropdown.Item>
                ))}
                </DropdownButton> */}

        </div>
    );


}



export default MyDropdown;