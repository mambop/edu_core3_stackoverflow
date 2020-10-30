import { Link } from 'react-router-dom'
import React from 'react'
import NavLinks from './NavLinks';


function Navbar() {
    return (
        <header className='nav-wrap'>
            <Link to='/'><h1 className='logo'>Stackover Flow</h1></Link>
            <NavLinks />
        </header>
    )
}

export default Navbar
