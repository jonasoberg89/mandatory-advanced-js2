import React from "react"
import { Link } from "react-router-dom"

const Navbar = () =>{

    return (
        <nav className ="nav-wrapper black">
            <div className="container">
                <Link to={"/"} className = "left brand-logo">Movies</Link>
                <ul className="right">
                    <li><Link to={"/"}>Home </Link> </li>
                    <li><Link to="/Add">Add</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar