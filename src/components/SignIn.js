import React from 'react';
// import ReactDOM from 'react-dom/client';
import './SignIn.css';


class SignIn extends React.Component {

	constructor(props) {
	    super(props);
	}

	//fetch user data from DB, if valid, rerender to home page, if not,stay in the login page.
	onSubmitSignIn = (event)=>{

		// this.props.onRouteChange("home");//for testing 
		// this.props.loadUser(1,"Hsin");//for testing 

		const email = event.target.email.value;
		const password = event.target.password.value;
		if(email!='' && password!=''){
			async function logIn(){
				const response =await fetch("http://localhost:3000/signin",{
					headers:{'Content-Type': 'application/json'},
					body:JSON.stringify({
						email:email,
						password:password
					}),
					method:'POST'
				});

				return response;

			}
			logIn()
			 .then(response => response.json())
			 .then(user =>{
			 	this.props.onRouteChange("home");
				this.props.loadUser(user.user_id,user.username);
			 })
			 .catch(()=>console.log("Wrong email or password"))
		}
	}

	render(){
		return(
			<div className="container">
				<main className="form-signin w-100 m-auto">
				  <form onSubmit={this.onSubmitSignIn} >
				    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
				    <div className="form-floating">
				      <input 
				      	type="email" className="form-control" 
				      	id="email" 
				      	placeholder="name@example.com" 
				      />
				     <label htmlFor="floatingInput">Email address</label>
				    </div>
				    <div className="form-floating">
				      <input 
				      	type="password" 
				      	className="form-control" 
				      	id="password" 
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