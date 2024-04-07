import React from 'react';
import './SignIn.css';


class SignIn extends React.Component {

	constructor(props) {
	    super(props);
		this.state = {
		    flashMessage: null,
		}
	}

	//fetch user data from DB, if valid, rerender to home page, if not,stay in the login page.
	onSubmitSignIn = (event)=>{

		const email = event.target.email.value;
		const password = event.target.password.value;
		if(email!='' && password!=''){
			async function logIn(){
				const response =await fetch("http://localhost:8080/signin",{
					headers:{'Content-Type': 'application/json'},
					body:JSON.stringify({
						email:email,
						password:password
					}),
					credentials: "include",
					method:'POST'
				});

				return response;

			}
			logIn()
			.then(response => Promise.all([response.status,response.json()]))
			.then(([httpStatus,user]) => {
			   if(httpStatus==200){
				   console.log("gonna change route");
				   this.props.onRouteChange("home");
				  this.props.loadUser(user.user_id,user.username);	
			   }else{
				   this.setState({flashMessage:user.message});
			   }
	   
			})
			.catch(()=>console.log("something went wrong while logging in"))

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
					<div>
						{this.state.flashMessage != null && 
							<div className="flashMessage">{this.state.flashMessage}</div> }
					</div>

				    {/* <div className="checkbox mb-3">
				      <label>
				        <input type="checkbox" value="remember-me" /> Remember me
				      </label>
				    </div> */}
				    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
				  </form>
				</main>
			</div>
		)
	}
	
}

export default SignIn;