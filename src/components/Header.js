import { logDOM } from '@testing-library/react';
import React, {useEffect,useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import "./Header.css"

// image import
import CartIcon from '../images/logo.png';

const Header = () => {
  //The first value, is our current state
  //The second value, is the function that is used to update our state.
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();

  //Search
  const [search, setSearch] = useState("");
  const history = useNavigate();

  //Runs only on the first render
  //And any time any dependency value changes [location]
  useEffect(() => {
    if(location.pathname === "/"){
        setActiveTab("Home")
    }else if(location.pathname === "/add"){
        setActiveTab("AddProduct")
    }else if(location.pathname === "/about"){
        setActiveTab("About")
    }
    else if(location.pathname === "/login"){
        setActiveTab("Login")
    }

  }, [location]);

  //Event for search funcionality
  const handleSubmit = (e) => {
      e.preventDefault();
      history(`/search?name=${search}`)
      setSearch("");
  }
 
  return (
    <div class="header">
        <img className="fatiga" src={CartIcon}/>
        <div className="header-right">
            {/*Seach */}
            <form onSubmit={handleSubmit} style={{display: "inline"}}>
                <input type="text" className="inputField" placeHolder="Search product" onChange={(e) => setSearch(e.target.value)} value={search} />
            </form> 
            {/*Seach */}

            <Link to="/">
                <p className={`${activeTab === "Home" ? "active" : ""}`} onClick={() => setActiveTab("Home")}>
                    Home
                </p>
            </Link>
            <Link to="/add">
                <p className={`${activeTab === "AddProduct" ? "active" : ""}`} onClick={() => setActiveTab("AddProduct")}>
                    Add Product
                </p>
            </Link>
            <Link to="/about">
                <p className={`${activeTab === "About" ? "active" : ""}`} onClick={() => setActiveTab("About")}>
                    About
                </p>
            </Link>
            <Link to="/login">
                <p className={`${activeTab === "Login" ? "active" : ""}`} onClick={() => setActiveTab("Login")}>
                    Login
                </p>
            </Link>
        </div>
    </div>
  )
}

export default Header