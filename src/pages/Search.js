import React, {useState, useEffect} from 'react';
import { useLocation, Link} from 'react-router-dom';
import fireDB from "../firebase";
import "./Search.css";


const Search = () => {
  //Setting data
  const [data, setData] = useState({});


  const useQuery = () => {
    //For extract the value of the name in the URL
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();

  //We extract name value
  let search = query.get("name");

  console.log("search", search)

  //When is any change it changes the data
  useEffect(() => {
    searchData();
  }, [search])

  //Search in the database by the name
  const searchData = () => {
    fireDB.child("gymProduct").orderByChild("name").equalTo(search).on("value", (snapshot) => {
      if(snapshot.val()) {
        const data = snapshot.val();
        setData(data);
      }
    })
  }

  return (
    <>
      <div className="style">
        {/*If the object search name is not found */}
        {Object.keys(data).length === 0 ? (
          <h2>There are no products with this name in the shop, please try again</h2>
        ):  (
          <table className="styled-table">
          {/*Head of the table*/}
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>ID</th>
              <th style={{ textAlign: "center" }}>Product Name</th>
              <th style={{ textAlign: "center" }}>Flavour</th>
              <th style={{ textAlign: "center" }}>Price</th>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <Link to="/">
          <button className="btn btn-edit">Return</button>
        </Link>
      </div>
    </>
  )
}

export default Search