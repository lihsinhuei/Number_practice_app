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
		    name: '',
		    email: ''
		}
	}


	onRouteChange = (change)=>{
		if(change === 'home'){
			//need to add user validation afterward
			this.setState({isLogIn:true});
		}else if(change === 'signOut'){
			this.setState({isLogIn:false});
		}
		this.setState({route:change});
	}


	loadUser =(signInEmail)=>{
		this.setState({email:signInEmail});
	}



	render(){
		return(
			<>
				<Navigation 
					isLogIn={this.state.isLogIn} 
					onRouteChange={this.onRouteChange} 
					email={this.state.email}
				/>
				{this.state.isLogIn 
					? 
					<Home 
						route={this.state.route} 
						isLogIn={this.state.isLogIn} 
						email={this.state.email}
					/> 
					: 
					(this.state.route == "signIn" 
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