import React from "react";
const API_URL = process.env.REACT_APP_API_URL

class  Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }
  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }
  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onSubmitRegister = () => {
    fetch(`${API_URL}/register`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        this.props.loadUser(user)
        this.props.onRouteChange('home')
      }
    })
    
  }

  render() {
    const { onRouteChange } = this.props;
      return (
          <article className="mw6 center bg-white br3 pa3 pa4-ns mv3 ba shadow-5 b--black-10">
          <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 center">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="name" 
                  name="name"  
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email-address"  
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="password" 
                  name="password"  
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div>
              <input 
                  onClick={this.onSubmitRegister}
                  className="b br2 ph3 pv2 input-reset black ba b--black bg-transparent grow pointer f6 dib" 
                  type="submit" 
                  value="Register"
              />
            </div>
            <div className="f5 mt5">
              Are you registered already? 
              <p onClick={() => onRouteChange('login')} className="f5 link dim black underline pa1 pointer"> Login </p>
            </div>
            
          </div>
        </main>
        </article>
      );
  }
}

export default Register;