import React, {useState, useEffect} from 'react';
import fireDB from "../firebase";
import {Link} from "react-router-dom";
import "./Home.css";
import { toast } from 'react-toastify';

const Home = () => {
  //Define one state, with object
  const [data, setData] = useState({});

  //Use effect for making the firebase query
  useEffect(() => {
    //DataBase query, snapshot callback
    fireDB.child("gymProduct").on("value", (snapshot) => {
      //If it is not null, then we set the value
      if(snapshot.val()!==null){
        setData({...snapshot.val()})
      //If we dont have any data, then input object
      }else{
        setData({});
      }
    });
    //For return the data
    return () => {
      setData({})
    }
  }, []);

  /* For deleting products in the database */
  const onDelete = (id) => {
    if(window.confirm("Are you sure to delete this product?")){
      //.remove -> DELETE for deleting objects
      fireDB.child(`gymProduct/${id}`).remove((err) => {
        if(err) {
          toast.error(err);
        }else{
          toast.success("Product have been deleted")
        }
      })
    }
  }

  return (
    <div className="style">
      <h2>- Products available in our gym shop -</h2>
      <table className="styled-table">
        {/*Head of the table*/}
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Product Name</th>
            <th style={{ textAlign: "center" }}>Flavour</th>
            <th style={{ textAlign: "center" }}>Price</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        {/*Map the data which will be introduced*/}
        <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data[id].name}</td>
                  <td>{data[id].flavour}</td>
                  <td>{data[id].price}</td>
                  
                  <td>
                    <Link to={`/update/${id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>

                    <button className="btn btn-delete" onClick={() => onDelete(id)}>Delete</button>
                   
                    <Link to={`/view/${id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
    </div>
  )
}

export default Home