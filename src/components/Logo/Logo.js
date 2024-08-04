import React from "react";
import { Tilt } from "react-tilt";
import './Logo.css'
import logo from './logo.png'

const Logo = () => {
    return (
        <div className="ma4 mt5">
            <Tilt className="Tilt br2 shadow-2" options={{ max: 100 }} style={{ height: 100, width: 100 }}>
                <div className="f3"><img style={{ paddingTop: '5px' }} src={logo} alt='logo' />Visual Brain</div>
            </Tilt>
        </div>
    );
}

export default Logo;