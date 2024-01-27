import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import "../css/ListeSide.css";
import { useNavigate } from "react-router-dom";
import {BookData, getBookData} from "../controllers/BookRepository"; 
import {AuthorData} from "../controllers/AuthorRepository"; 
import {getAverageRating, ReviewData} from "../controllers/RatingRepository";

function ToppRated() {
    const navigate = useNavigate();

    const {authors} = AuthorData();
    const {books} = BookData();
    const { reviews } = ReviewData();
    
 
 function AllBooks() {

    // Comparator of books
    const sortedBooks = books.sort((a, b) => {
      const aRating = getAverageRating(a.id, reviews);
      const bRating = getAverageRating(b.id, reviews);
    
      // If either book has no ratings, move it to the end of the list
      if (isNaN(aRating) || aRating === null) {
        return 1;
      } else if (isNaN(bRating) || bRating === null) {
        return -1;
      }

    if (bRating !== aRating) {
      return bRating - aRating;
    } else {
      // If two books have the same rating, sort them in alphabetical order by title
      if (a.title && b.title) {
        return a.title.localeCompare(b.title);
      } else {
        return 0;
      }
    }
    });
    
  
    const booksInList = sortedBooks.map((bookElement, index) => (
      <>
        {console.log(bookElement.id)}
        <div onClick={() => navigate(`/book/${bookElement.id}`)} key={index}>
        {getBookData(bookElement.id, authors, books, reviews)}
        </div>
      
      </>
    
    ));

    return <> 
    {booksInList}
    </>
  } 
    
    return (
        <>
        <div className="App">
        <Header />
        <Navbar />
        <div className="container">
          <h2 className="title"> Våre Favoritter </h2>
          <div className="Listeramme">
            <div style={{overflowY:"scroll"}}> {AllBooks()} </div>
          </div>
        </div> 
        <Footer />
    </div>
        
        </>
      );
  
};

export default ToppRated;