import { useEffect, useState } from "react";
import {collection, getDocs} from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

import {getAuthorByID} from "../controllers/AuthorRepository"; 
import {getAverageRating} from "../controllers/RatingRepository";

// BookData: getting data from the collection, Books from Firestore
export function BookData() {
  const [books, setBooks] = useState([]);
  const bookCollectionRef = collection(firestore, "book");

  useEffect(() => {
    const getBooks = async () => {
      const data = await getDocs(bookCollectionRef);
      setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getBooks();
  }, []);

  return { books };
}

export function getBookByID(bookID, books) {
  return books.find((book) => book.id === bookID);
}

export function getBookPicture(bookID, books){
  const book = books.find((book) => book.id === bookID);
  return book ? book.Picture: "";
};

export function getBookTitle(bookID, books){
  const book = books.find((book) => book.id === bookID);
  return book ? book.Title : "";
};

// Getting book data without ratings
export function getBookData(bookID, authors, books, reviews) {
  const book = books.find((book) => book.id === bookID);
  const averageRating = getAverageRating(bookID, reviews);

  return (
    <>
      <img src={book.Picture} alt={book.Title} />
      <br />
      <div>
        <h5> {book.Title} </h5>
        <p>{getAuthorByID(book.Author, authors)}</p>
        <p>{book.Genre}</p>
        <span id ="starrating">
            <span className={averageRating >= 1 ? "star-filled" : "star-unfilled"}>★</span>
            <span className={averageRating >= 2 ? "star-filled" : "star-unfilled"}>★</span>
            <span className={averageRating >= 3 ? "star-filled" : "star-unfilled"}>★</span>
            <span className={averageRating>= 4 ? "star-filled" : "star-unfilled"}>★</span>
            <span className={averageRating >= 5 ? "star-filled" : "star-unfilled"}>★</span>
            </span>
      </div>
    </>
  )
}

