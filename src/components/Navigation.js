import React from 'react';
import ReactDOM from 'react-dom/client';
import './Navigation.css';
import logo from './logo.png';

const Navigation = (props)=>{

		if(!props.isLogIn){
			return(
				<nav className="navbar bg-light">
					<div className="container">
						<div className = "col-sm-10" >
						    <a className="navbar-brand" href="#">
						    	<img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
						    </a>
					    </div>
					    <ul className = "col-sm-2" >
							<li onClick={()=>props.onRouteChange("signIn")} > sign in</li>
							<li onClick={()=>props.onRouteChange("signUp")} > Sign up</li> 
						</ul>  
					</div>  
				</nav>
			)
		}else{
			return(
				<nav className="navbar bg-light">
					<div className="container">
						<div className = "col-sm-10" >
						    <a className="navbar-brand" href="#">
						    	<img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
						    </a>
					    </div>
					    <ul className = "col-sm-2">
							<li >{props.username+""}</li>
							<li onClick={()=>props.onRouteChange("signIn")} >signout</li> 
						</ul>       
					</div>  
				</nav>
				

			)
		}




}




export default Navigation;