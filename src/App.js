import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"

import './App.css';
import About from './pages/About';
import AddEdit from './pages/AddEdit';
import Home from './pages/Home';
import View from './pages/View';

/*React-Toastify allows you to add notifications to your app with ease*/
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Search from './pages/Search';
import Login from './pages/Login';

//Main app that display the main page with all components
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <ToastContainer posisition="top-center" />

        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/add" element={<AddEdit/>} />
          <Route path="/update/:id" element={<AddEdit/>} />
          <Route path="/view/:id" element={<View/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
