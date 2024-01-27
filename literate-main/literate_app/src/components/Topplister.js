import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import {Link} from "react-router-dom";
import {ListData, getListByID} from "../controllers/ListRepository";
import "../css/Topplister.css";

function Topplister() {
    const {lists} = ListData();

    // Function to generate the content from a list 
    const allLists = lists.map((list) => {
      return (
          <div key={list.id} >
          <p>
            <Link className="link" to={list.id}>{getListByID(list.id, lists)}</Link> 
          </p>
          </div>
      );
    });
    
   
  return (
    <div>
      <Header />
      <Navbar />
        <div className="listContainer">
          <h1 className="headline"> Topplister </h1>
          <div className="lists">{allLists}</div>
        </div> 
        <Footer />
    </div>
  );
};

export default Topplister;
