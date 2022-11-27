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
			user:{ 
				ID: null,
			}
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



	render(){
		return(
			<>
				<Navigation isLogIn={this.state.isLogIn} onRouteChange={this.onRouteChange} />
				{this.state.isLogIn 
					? 
					<Home route={this.state.route} isLogIn={this.state.isLogIn} /> 
					: 
					(this.state.route == "signIn" 
						? 
						<SignIn onRouteChange={this.onRouteChange}/> 
						: 
						<SignUp onRouteChange={this.onRouteChange}/> 
					)
				}
		
			</>
		)
		
	}

}

export default App;