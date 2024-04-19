import React from 'react';
import ReactDOM from 'react-dom/client';
import Navigation from "./components/Navigation.js";
import SignIn from "./components/SignIn.js";
import SignUp from "./components/SignUp.js";
import Home from "./components/Home.js";



class App extends React.Component{

	constructor(){
		super();
		this.state = {
			authUser:false, // if the user's authetication has been checked. 
			route: "signIn", //signIn/signUp/home/logOut
			isLogIn: false,
		    id: '',
		    username: '',
		    email: ''
		}
	}
	
	//important function! it changes the state and trigger re-rendering. 
	onRouteChange = (change)=>{
		console.log("in onRouteChange");
		if(change === 'home'){
			//need to add user validation afterward
			this.setState({isLogIn:true});
		}else if(change === 'signIn'){ //signout
			this.setState({
				authUser:true,
				route: "signIn", //signIn/signUp/home/logOut
				isLogIn: false,
				id: '',
				username: '',
				email: ''
			});
		}
		this.setState({route:change});
	}


	loadUser =(id,username)=>{
		console.log("in loaduser");
		this.setState({
			id:id,
			username:username
		});
	}

	//check authentication(session and cookies)
	componentDidMount(){ 
		console.log("REACT_APP_API_DOMAIN:",process.env.REACT_APP_API_DOMAIN);
		if(!this.state.authUser){
			async function checkSession(){
				const response = await fetch(process.env.REACT_APP_API_DOMAIN,{
					credentials: "include",
					method:'GET'
				});
				return response;
			}

			checkSession()
			.then(response => {
				if (response.status == 200) {
					return response.json();
				} 
				return null;
			})
			.then(data => {
				if(data!=null){
					console.log('this user has logged in before');
					this.setState({
						authUser:true,
						isLogIn:true,
						route:'home',
						username:data.username,
						id:data.user_id,
						email:data.email,
					});
				}else{
					console.log('this user has not logged in before');
					this.setState({authUser:true})
				}
					
			})
			.catch(error => {
				console.error('Error checking session:', error);
			});
		}
    } 


	render(){
		if(!this.state.authUser){
			return <div>loading...</div>
		}else{
			return(
				<>
					<Navigation 
						isLogIn={this.state.isLogIn} 
						onRouteChange={this.onRouteChange} 
						username={this.state.username}
					/>
					{this.state.isLogIn 
						? 
						<Home 
							route={this.state.route} 
							isLogIn={this.state.isLogIn} 
							email={this.state.email}
							userID={this.state.id}
						/> 
						: 
						(this.state.route === "signIn" 
							? 
							<SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> 
							: 
							<SignUp onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> 
						)
					}
			
				</>
			)
		}
		
	}

}

export default App;