import React from "react";
import {auth} from "../firebase_setup/firebase";
import { useNavigate } from "react-router-dom";
import {AuthorData} from "../controllers/AuthorRepository"; 
import {BookData, getBookData} from "../controllers/BookRepository"; 
import { UserData} from "../controllers/UserRepository";
import {ReviewData} from "../controllers/RatingRepository";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import "../css/ListeSide.css";

function Favoritter() {
    const navigate = useNavigate();

    const user = auth.currentUser;
    const { authors } = AuthorData();
    const { books } = BookData();
    const { users } = UserData(); 
    const { reviews } = ReviewData(); 

     // A function to map all books from favourite
    function getUserFavourites(userID) {
        const userToFind = users.find(user => user.id === userID);
        
        if (userToFind) {
          const myFavourites = userToFind.favourites; 

          if(myFavourites.length === 0) {
            return<> <h3> Ingen favoritter </h3> </>
          }
    
          const booksInFavourites = myFavourites.map((bookElement, index) => (
            <>
            <div onClick={()=>navigate("/book/{bookID}".replace("{bookID}", bookElement))} key={index}>{getBookData(bookElement, authors, books, reviews)}</div>
            </>
          ));
    
          return <> 
          {booksInFavourites}
          </>
    
        } else {
          // Did not find the list with the specified id
          // Sending error message to the user
          console.log(userID)
          return<> <h3> Ingen favoritter </h3> </>
        }
      }

    
    return (
        <>
        <div className="App">
        <Header />
        <Navbar />
        <div className="container">
          <h2 className="title"> Favoritter </h2>
          <div className="Listeramme">
            <div style={{overflowY:"scroll"}}> {getUserFavourites(user.uid)} </div>
          </div>
        </div> 
        <Footer />
    </div>
        
        </>
      );
  
};

export default Favoritter;