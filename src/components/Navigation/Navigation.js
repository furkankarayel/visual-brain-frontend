import React from "react";


const Navigation = ({onRouteChange, isSignedIn }) => {

        if(isSignedIn){
            return (
                <nav className="ml-auto"> 
                    <div className="tr pa4">
                    <p className="f4 pa3 fw4 hover-white no-underline bg-white-80 black b--black br2 dib ml2 pv2 ph3 ba pointer" onClick={() => onRouteChange('signout')} >Sign out</p> 
                    </div>
                </nav> 

            );
            } else {
                return (
                <nav className="ml-auto"> 
                    <div className="tr pa3">
                        <p className="f4 pa3 ma3 fw4 hover-white no-underline bg-white-80 black b--black br2 dib ba pointer" onClick={() => onRouteChange('login')} >Login</p> 
                        <p className="f4 pa3 ma3 fw4 hover-white no-underline bg-white-80 black b--black br2 dib ba pointer" onClick={() => onRouteChange('register')} >Register</p> 
                    </div>
                </nav>
      
                );
            }
    
}

export default Navigation;