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
			route: "signIn", //signIn/signUp/home/logOut
			isLogIn: false,
		    id: '',
		    username: '',
		    email: ''
		}
	}
	
	//important function! it changes the state and trigger re-rendering. 
	onRouteChange = (change)=>{
		if(change === 'home'){
			//need to add user validation afterward
			this.setState({isLogIn:true});
		}else if(change === 'signIn'){
			this.setState({isLogIn:false});
		}
		this.setState({route:change});
	}


	loadUser =(id,username)=>{
		this.setState({
			id:id,
			username:username
		});
	}


	render(){
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

export default App;