import React, {useState, useEffect} from 'react';
import fireDB from "../firebase";
import {useParams, Link} from "react-router-dom";
import "./View.css";


const View = () => {
  const [user, setUser] = useState({});
  //Grab the ID of the url using useParams
  const {id} = useParams();

  useEffect(() => {
    //.get -> GET for view the properties
    fireDB.child(`gymProduct/${id}`).get().then((snapshot) => {
      //If we have the data, then 
      if(snapshot.exists()) {
        setUser({...snapshot.val()})
      //If we dont have the data in our database
      } else{
        setUser({});
      }
    })
  }, [id])

  console.log("user", user);

  return (
    <div className="style">
      <h2>- All product attributes shown -</h2>
      <div className="card">
        <div className="card-header">
          <p>- Product Detail -</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{id}</span>

          <br />
          <br />

          <strong>Name: </strong>
          <span>{user.name}</span>

          <br />
          <br />

          <strong>Flavour: </strong>
          <span>{user.flavour}</span>

          <br />
          <br />

          <strong>Price: </strong>
          <span>{user.price}</span>

          <br />
          <br />

          <Link to="/">
            <button className="btn btn-edit">Return</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;