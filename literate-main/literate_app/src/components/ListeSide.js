import React from "react";
import "../css/ListeSide.css";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom";
import {AuthorData} from "../controllers/AuthorRepository"; 
import {BookData, getBookData} from "../controllers/BookRepository"; 
import {ListData, getListName} from "../controllers/ListRepository";
import {ReviewData} from "../controllers/RatingRepository";

function ListeSide() {
  const navigate = useNavigate();

  const { lists } = ListData();
  const { authors } = AuthorData();
  const { books } = BookData();
  const { reviews } = ReviewData();

  const params = useParams();
  const listID = params.listID;

  
  // A function to find a specific list with a listID
  function findingList(listID) {
    const listToFind = lists.find(list => list.id === listID);
    
    if (listToFind) {
      // Found the list with the specified id
      const bookList = listToFind.Books; 
      
      // Handle this in a different way!!
      if(bookList.length === 0) {
        return null;
      }
    
      const booksInList = bookList.map((bookElement, index) => (
        <div key={index} onClick={()=>navigate("/book/{bookID}".replace("{bookID}", bookElement))}>{books.length > 0 ? getBookData(bookElement, authors, books, reviews):"Henter info..."}</div>
      ));

      return <> 
      {booksInList}
      </>

    }
  }

  return (
    <div className="App">
      <Header />
      <Navbar />
      <div className="container">
        <h2 className="title"> {getListName(listID, lists)}</h2>
        <div className="Listeramme">
          <div style={{overflowY:"scroll"}}> {findingList(listID)} </div>
        </div>
      </div> 
      <Footer />
  </div>
   
  );
};

export default ListeSide;
