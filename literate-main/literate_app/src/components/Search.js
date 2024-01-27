import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate, useLocation } from "react-router-dom";
import {getBookData} from "../controllers/BookRepository";
import {AuthorData} from "../controllers/AuthorRepository"; 
import {ReviewData} from "../controllers/RatingRepository";
import { TextField, MenuItem} from "@mui/material";

import { useState } from "react";


function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const { authors } = AuthorData();
    const { reviews } = ReviewData();
    const booksMatchingSearch = location.state.booksToShow;
    const [filteredBooks, setFilteredBooks] = useState(booksMatchingSearch);
    
    function displayBooks() {
      if(filteredBooks.length===0){
        return(
          <h2>Fant ingen bøker...</h2>
        );
      }

      return filteredBooks.map((book) => (
        <div
          key={book.id}
          onClick={() => navigate(`/book/${book.id}`)}
        >
          {getBookData(book.id, authors, filteredBooks, reviews)}
        </div>
      ));
    }

    function handleFilter(genre){
      if (genre !== "Alle sjangre"){
        setFilteredBooks(booksMatchingSearch.filter(book => book.Genre === genre));
      }else{
        setFilteredBooks(booksMatchingSearch);
      }

      navigate("/Search", { state: { booksToShow: booksMatchingSearch } });
    }

    return (
        <div className="App">
          <Header />
          <Navbar />
          <div className="container">
          <div id="genreSelectDiv">
            <TextField
            className ="genreSelect"
            select
            onChange={event => handleFilter(event.target.value)}
            label="Sjanger"
            style = {{width: 180}}
            >
              {["Alle sjangre", "Barn", "Fantasy", "Krim", "Roman", "Romantisk", "Biografi"].map(genre => 
                <MenuItem key={genre} value={genre}>{genre}</MenuItem>
              )}    
            </TextField>
          </div>
            <div className="Listeramme">
              <div style={{overflowY:"scroll"}}> {displayBooks()}</div>
            </div>
          </div> 
          <Footer />
      </div>
       
      );
    };

export default Search;