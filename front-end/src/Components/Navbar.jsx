import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {RiShoppingBag3Fill} from 'react-icons/ri'
import { TiThMenu } from 'react-icons/ti'
import '../style/Navbar.css'


function Navbar() {
  const auth = localStorage.getItem("user")
  const navigate = useNavigate()
  const [isActive, setisActive] = React.useState(false);

  const toggleAction = () => {
    setisActive(!isActive)
  } 

  const logOut = () => {
    localStorage.clear()
    navigate("/signup")
  }

  return (
    <div className="navbar">
      <RiShoppingBag3Fill id="logo" onClick={()=>navigate('/')} />
      {/* <TiThMenu id="handburger" onClick={toggleAction} /> */}
      {auth ? 
        <ul className={isActive ? 'active': ""}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/product">Product List</Link></li>
          <li><Link to="/add-product">Add Product</Link></li>
          <li id="logout"><Link onClick={logOut} to="/login">Logout</Link></li>
          {/* <li id="name">-{JSON.parse(auth).name}</li> */}
        </ul>
       : 
        <ul id="login-signup" className={isActive ? 'active': ""}>
          <li><Link to="/signup">Sign up</Link></li>
          <li id="login"><Link to="/login">Login</Link></li>
        </ul>
      }
    </div>
  );
}

export default Navbar;