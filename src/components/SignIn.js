import React from 'react';
import ReactDOM from 'react-dom/client';
import './SignIn.css';


class SignIn extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      signInEmail: '',
	      signInPassword: ''
	    }
	}

	// onEmailChange = (event)=>{
	// 	this.setState({signInEmail : event.target.value})
	// 	console.log(event.target.value);
	// }

	// onPasswordChange = (event) =>{
	// 	this.setState({signInPassword : event.target.value})
	// 	console.log(event.target.value);
	// }

	onSubmitSignIn = (event)=>{
		// this.setState=({signInEmail:event.target.floatingEmail.value});
		// this.setState=({signInPassword:event.target.floatingPassword.value});
		this.props.onRouteChange("home");
		this.props.loadUser(event.target.floatingEmail.value);

	}

	render(){
		return(
			<div className="container">
				<main className="form-signin w-100 m-auto">
				  <form onSubmit={this.onSubmitSignIn} >
				    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
				    <div className="form-floating">
				      <input 
				      	// onChange={(event)=>this.onEmailChange(event)} 
				      	type="email" className="form-control" 
				      	id="floatingEmail" 
				      	placeholder="name@example.com" 
				      />
				     <label htmlFor="floatingInput">Email address</label>
				    </div>
				    <div className="form-floating">
				      <input 
				      	// onChange={(event)=>this.onPasswordChange(event)} 
				      	type="password" 
				      	className="form-control" 
				      	id="floatingPassword" 
				      	placeholder="Password" 
				      />
				      <label htmlFor="floatingPassword">Password</label>
				    </div>

				    <div className="checkbox mb-3">
				      <label>
				        <input type="checkbox" value="remember-me" /> Remember me
				      </label>
				    </div>
				    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
				  </form>
				</main>
			</div>
		)
	}


	
}




export default SignIn;