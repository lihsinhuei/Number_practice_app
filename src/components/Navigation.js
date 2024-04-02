import React from 'react';
import './Navigation.css';
import logo from './logo.png';

const Navigation = (props)=>{


	const clearSessionAndSignOut = () =>{
		async function logOut(){
			const response = await fetch("http://localhost:8080/logout",{
				headers:{'Content-Type': 'application/json'},
				credentials: 'include',
				method:'POST'
			});
			return response;
		}
		
		logOut()
		 .then(response =>{
			if(response.ok)
				props.onRouteChange("signIn");
			else
				throw new Error('log out api failed');
		 })
		 .catch((err)=>console.log("clearSessionAndSignOut failed:",err))

	}
		

		if(!props.isLogIn){
			return(

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
				<div className="navbar">
					<a href="#" className="navbar-brand"><img src={logo} alt="Logo"/></a>
					<div className="navbar-right">
						<a href="#">{props.username+""}</a>
						<a href="#" onClick={()=>clearSessionAndSignOut()}>Sign Out</a>
					</div>
				</div>
			)
		}




}




export default Navigation;