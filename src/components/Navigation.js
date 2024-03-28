import React from 'react';
import './Navigation.css';
import logo from './logo.png';

const Navigation = (props)=>{

		if(!props.isLogIn){
			return(
				// <nav className="container">
				// 		<div className = "col-sm-10" >
				// 		    <a className="navbar-brand" href="#">
				// 		    	<img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
				// 		    </a>
				// 	    </div>
				// 	    <ul className = "col-sm-2" >
				// 			<li onClick={()=>props.onRouteChange("signIn")} > Sign in</li>
				// 			<li onClick={()=>props.onRouteChange("signUp")} > Sign up</li> 
				// 		</ul>  
				// </nav>

				<div className="navbar">
					<a href="#" className="navbar-brand"><img src={logo} alt="Logo"/></a>
					<div className="navbar-right">
						<a href="#" onClick={()=>props.onRouteChange("signIn")} >Sign In</a>
						<a href="#" onClick={()=>props.onRouteChange("signUp")} >Sign Up</a>
					</div>
				</div>
			)
		}else{
			return(
				// <nav className="container">
				// 		<div className = "col-sm-10" >
				// 		    <a className="navbar-brand" href="#">
				// 		    	<img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
				// 		    </a>
				// 	    </div>
				// 	    <ul className = "col-sm-2">
				// 			<li >{props.username+""}</li>
				// 			<li onClick={()=>props.onRouteChange("signIn")} >signout</li> 
				// 		</ul>       
				// </nav>
				<div className="navbar">
					<a href="#" className="navbar-brand"><img src={logo} alt="Logo"/></a>
					<div className="navbar-right">
						<a href="#">{props.username+""}</a>
						<a href="#" onClick={()=>props.onRouteChange("signIn")}>Sign Out</a>
					</div>
				</div>
			)
		}




}




export default Navigation;