import React from "react";
import "../css/Home.css";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import {useNavigate} from "react-router-dom";
import {AuthorData} from "../controllers/AuthorRepository"; 
import {BookData, getBookData} from "../controllers/BookRepository"; 
import {ListData} from "../controllers/ListRepository";
import {ReviewData} from "../controllers/RatingRepository";

function Home() {
  const navigate = useNavigate();

  const { lists } = ListData();
  const { authors } = AuthorData();
  const { books } = BookData();
  const { reviews } = ReviewData();

  // A function to find a specific list with a listID
  function findingList(listID) {
 
    const listToFind = lists.find(list => list.id === listID);
    
    try {
      if (listToFind) {

        const booksInList = listToFind.Books.map((bookElement, index) => (
          index <3 &&
          <div onClick={() => navigate("/book/{bookID}".replace("{bookID}", bookElement))} key={index}>{getBookData(bookElement, authors, books, reviews)}</div>
          ));
  
        return <> 
        {booksInList}
        </>
      }
    }catch(error) {
      console.log(error)
    }
  } 

  return (
    <div className="App">
      <Header />
      <Navbar />
      <div className="Forsidefelt">
        <div>
          <h4> Nyheter</h4>
          {findingList("list-1")}
        </div>

        <div>
          <h4> GoodReads favoritter </h4>
          {findingList("list-2")}
        </div>

        <div>
          <h4> Topp i Norge</h4>
          {findingList("list-3")}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
