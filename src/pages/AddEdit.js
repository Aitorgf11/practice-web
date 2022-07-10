import React,{useState, useEffect} from 'react';
import { useNavigate, useParams} from "react-router-dom";
import './AddEdit.css';
import fireDB from "../firebase";
import { toast } from "react-toastify";

//Properties of our gym shop object
const initialState = {
    name: "",
    flavour: "",
    price: ""
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const {name, flavour, price} = state;

  const history = useNavigate();

  /******************************/
  /*For edit button on the table*/
  const {id} = useParams();

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
  //Only if we have id
  }, [id]);

  useEffect(() => {
    //If we have id property
    if(id) {
        setState({...data[id]})
    } else{
        setState({...initialState})
    }

    return() => {
        setState({...initialState})
    };
  //Only if we have id along with the data
  }, [id, data])
  /******************************/
  

  //Function that reacts to event and change the values
  const handleInputChange = (e) => {
      const {name, value} = e.target;
      setState({...state, [name]: value});
  };

  //When we submit the form, event in handled
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !flavour || !price) {
        toast.error("No empty inputs are valid");
    }else{
        //If we dont have ID, that means user is adding new product
        if(!id){
            //.push -> POST add the object
            fireDB.child("gymProduct").push(state, (err) =>{
                if(err){
                    toast.error(err);
                }else{
                    toast.success("Product added succesfully");
                }
            });
        //We have id, that means that user is updating existing product
        } else{
            //.set -> PUT update the object
            fireDB.child(`gymProduct/${id}`).set(state, (err) =>{
                if(err){
                    toast.error(err);
                }else{
                    toast.success("Product updated succesfully");
                }
            });
        }
        //We change the page once the form is submitted
        setTimeout(() => history("/"), 500);
    }
  };

  //Form
  return (
    <div style={{marginTop: "100px"}}>
      <h2>- You can add products to our shop -</h2>
      <div className='boxStyle'>
        <form className='formStyle' onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="name" placeHolder="Enter the product name" value={name || ""} onChange = {handleInputChange}/>
            
            <label htmlFor="flavour">Flavour: </label>
            <input type="text" id="flavour" name="flavour" placeHolder="Enter the product flavour" value={flavour || ""} onChange = {handleInputChange}/>
            
            <label htmlFor="price">Price: </label>
            <input type="number" id="price" name="price" placeHolder="Enter the product price" value={price || ""} onChange = {handleInputChange}/>
        
            <input type="submit" value={id ? "Update" : "Save"} />
        </form>
      </div>
    </div>
  );
};

export default AddEdit;
