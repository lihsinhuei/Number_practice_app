import React from 'react';
import ReactDOM from 'react-dom/client';
import './SignIn.css';


const SignIn = (props)=>{

	return(
		<div className="container">
			<main className="form-signin w-100 m-auto">
			  <form>
			    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

			    <div className="form-floating">
			      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
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
			    <button onClick={()=>props.onRouteChange("home")} className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
			  </form>
			</main>
		</div>

	)

	
}




export default SignIn;