import React from 'react'
import "./About.css";

const About = () => {
  return (
    <div className="style">
      <h2>
        {" "}
        This is React Gym Shop Application with Routing using Firebase
      </h2>
      <br></br>
      <p>
        In this application, you can see the products that are in a database created with firebase.
      </p>
      <br></br>
      <p>
        You can add products to the database, and have them displayed in a table.
      </p>
      <br></br>
      <p>
        You can search by product name.
      </p>
      <br></br>
      <p>
        You can also log in users to firebase
      </p>
    </div>
  )
}

export default About