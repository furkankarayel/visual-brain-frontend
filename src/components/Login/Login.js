import React from "react";
const API_URL = process.env.REACT_APP_API_URL

class Login extends React.Component {
  constructor() {
      super();
      this.state = {
        signInEmail: '',
        signInPassword: ''
      }
    }

    onEmailChange = (event) => {
      this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
      this.setState({signInPassword: event.target.value})
    }

    onSubmitLogin = () => {
      fetch(`${API_URL}/login`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.signInEmail,
          password: this.state.signInPassword
        })
      })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home')
        }
      })
      
    }

    render() {
      const { onRouteChange } = this.props;
      return (
      <div className="mw6 center bg-white br3 pa3 pa4-ns mv3 ba shadow-5 b--black-10">
      <main className="pa4 black-80">
      <div className="measure">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
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
        <div className="">
          <input 
              onClick={this.onSubmitLogin}
              className="b br2 ph3 pv2 input-reset black ba b--black bg-transparent grow pointer f6 dib" 
              type="submit" 
              value="Login"/>
        </div>
        <div className="f5 mt5">
              Oh.. You're not registered yet? 
              <p onClick={() => onRouteChange('register')} className="f5 link dim black underline pa1 pointer"> Register </p>
            </div>
      </div>
    </main>
    </div>
    );
    }
}

export default Login;