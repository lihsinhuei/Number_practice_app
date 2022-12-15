import React from 'react';
import ReactDOM from 'react-dom/client';
import './SignUp.css';


const SignUp = (props)=>{


	const onSubmitSignUp = (event)=>{
		// this.setState=({signInEmail:event.target.floatingEmail.value});
		console.log(event.target.floatingUsername.value);
		props.onRouteChange("home");
		props.loadUser(event.target.floatingUsername.value);

	}

	return(
		<div className="container">
			<main className="form-signin w-100 m-auto">
			  <form onSubmit={onSubmitSignUp}>
			    <h1 className="h3 mb-3 fw-normal">Register</h1>
			    <div className="form-floating">
			      <input type="username" className="form-control" id="floatingUsername" placeholder="user name" />
			      <label htmlFor="floatingInput">Name</label>
			    </div>
			    <div className="form-floating">
			      <input type="signUpEmail" className="form-control" id="floatingEmail" placeholder="name@example.com" />
			      <label htmlFor="floatingInput">Email address</label>
			    </div>
			    <div className="form-floating">
			      <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
			      <label htmlFor="floatingPassword">Password</label>
			    </div>

			    <div className="checkbox mb-3">
			      <label>
			        <input type="checkbox" value="remember-me" /> Remember me
			      </label>
			    </div>
			    <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
			  </form>
			</main>
		</div>

	)

	
}




export default SignUp;