import React from 'react'

import { useRef, useState } from "react";

import { signup, login, logout, useAuth } from "../firebase";
import { toast } from "react-toastify";

import "./Login.css";

//For profile picture
import Profile from "./Profile";

const Login = () => {
  const [ loading, setLoading ] = useState(false);

  //Current user logged
  const currentUser = useAuth();

  //PErsist values between renders
  const emailRef = useRef();
  const passwordRef = useRef();

  //For register, setLoading is for no spam signup or other buttoms
  async function handleSignup() {
    setLoading(true);
    try{
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      toast.error("Error");
    }
    setLoading(false);
  }

  //For Log in
  async function handleLogin() {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      toast.error("Error");
    }
    setLoading(false);
  }

  //For Log out
  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
    } catch {
        toast.error("Error");
    }
    setLoading(false);
  }

  //Form for login
  return (
    <div className="style">
      <h2>- You can log in into our shop -</h2>
      <h3 className='user'>Currently logged in as: { currentUser?.email } </h3>
      
      {/* If the use is not logged */}
      {!currentUser && 
        <>
          <div className='boxStyle'>
            <form className='formStyle'>
                <label htmlFor="name">Email: </label>
                <input type="text" ref={emailRef} placeholder="Enter"/>
                
                <label htmlFor="flavour">Password: </label>
                <input ref={passwordRef} type="password" placeholder="Password"/>
            </form>
          </div>

          <button className="btn btn-edit" disabled={ loading || currentUser } onClick={handleSignup}>Sign Up</button>
          <button className="btn btn-delete" disabled={ loading || currentUser } onClick={handleLogin}>Log In</button>
        </>
      }

      {/* If the use is logged */}
      {currentUser && 
        <>
          <Profile />
          <button className="btn btn-view" disabled={ loading || !currentUser } onClick={handleLogout}>Log Out</button>
        </>
      }
    </div>
  );
};

export default Login