import React from 'react';
import './SignUp.css';


class SignUp extends React.Component{

	constructor(props){
		super(props);
		this.state = {
		    flashMessage: null,
		}

	}


	onSubmitSignUp = (event) =>{
		const username = event.target.username.value;
		const email = event.target.email.value;
		const password = event.target.password.value;
		if(username!='' && email!='' && password!=''){
			console.log("before call signup");

			async function signup(){
				const response = await fetch('http://localhost:8080/signup', {
					headers:{'Content-Type': 'application/json'},
					method:"POST",
					body:JSON.stringify({
						username:username,
						email:email,
						password:password
					}),
					credentials: "include"
				})

				return response;
			}
			
			signup()
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
			  .catch(()=>console.log("something went wrong while signing up"))

		}else{
			console.log("please fill out all field");
		}

	}




	render(){
		return(
			<div className="container">
				<main className="form-signin w-100 m-auto">
				  <form onSubmit={this.onSubmitSignUp}>
				    <h1 className="h3 mb-3 fw-normal">Register</h1>
				    <div className="form-floating">
				      <input type="username" className="form-control" id="username" placeholder="user name" />
				      <label htmlFor="floatingInput">Name</label>
				    </div>
				    <div className="form-floating">
				      <input type="email" className="form-control" id="email" placeholder="name@example.com" />
				      <label htmlFor="floatingInput">Email address</label>
				    </div>
				    <div className="form-floating">
				      <input type="password" className="form-control" id="password" placeholder="Password" />
				      <label htmlFor="floatingPassword">Password</label>
				    </div>
					{/* <div>eee</div> */}
					<div>
						{this.state.flashMessage != null && 
							<div className="flashMessage">{this.state.flashMessage}</div> }
					</div>
{/* 
					<div>
						{this.message.length >0 && this.message}
					</div> */}

				    {/* <div className="checkbox mb-3">
				      <label>
				        <input type="checkbox" value="remember-me" /> Remember me
				      </label>
				    </div> */}
				    <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
				  </form>
				</main>
			</div>
		)


	}


}



	





export default SignUp;