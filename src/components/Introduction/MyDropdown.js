import React from "react";
import Select from 'react-select'
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import 'bootstrap/dist/css/bootstrap.min.css';

const MyDropdown = (props)=>{

    return(
        <div>
            <Select onChange={props.handleSelect} options={props.options} defaultValue={props.options[0]} />
        </div>
    );
}

export default MyDropdown;