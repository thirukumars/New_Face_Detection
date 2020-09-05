import React from  'react';
import './nav.css'
import {Link} from 'react-router-dom'
function Nav(){
    return(
        <nav className="nav-class">
            
            <ul className="nav-link">
                <Link to="/capture"><li>Capture</li></Link>
                <Link to="/Detect"><li>Detect</li></Link>
            </ul>
        </nav>
    )
}
export default Nav;