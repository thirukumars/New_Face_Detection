import React from  'react';
import './nav.css'
import {Link} from 'react-router-dom'
function Nav(){
    return(
        <nav className="nav-class">
            
            <ul className="nav-link">
                <Link to="/" style={{"TextDecoration":"none" ,}}><li className="items">Home</li></Link>
                <Link to="/capture" style={{"TextDecoration":"none"}}><li className="items">Capture</li></Link>
                <Link to="/Detect" style={{"TextDecoration":"none"}}><li className="items">Detect</li></Link>
                

            </ul>
        </nav>
    )
}
export default Nav;