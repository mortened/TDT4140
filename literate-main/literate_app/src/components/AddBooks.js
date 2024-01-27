import React, { useState } from "react";
import "../css/LeggTilBok.css";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import {firestore} from "../firebase_setup/firebase";
import { useNavigate } from "react-router-dom";
import {collection, doc, setDoc, getDocs} from "firebase/firestore";
import { TextField, MenuItem} from "@mui/material";
import { AuthorData, sortingAuthors, getAuthorName } from "../controllers/AuthorRepository";
import { ToastMessage, showToast } from './ToastMessage';
import { BookData } from "../controllers/BookRepository";

function AddBooks() {
  const navigate = useNavigate();
  const {authors} = AuthorData();
  const sortedAuthors = sortingAuthors(authors); 
  const {books} = BookData();
  const [authorSelected, setAuthorSelected] = useState('');
  const [authorID, setAuthorID] = useState('');
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre : "",
    summary: "",
    picture: ""
  });
  const [isNewAuthor, setIsNewAuthor] = useState(false);
  // Function to handle user input  
  const handleBookData = (event) => {
    const { name, value } = event.target;
    setBook((prev) => {
      return { ...prev, [name]: value };
    });
    if (name === "author") {
      setAuthorSelected(value);
    }
  };

  // Function for creating a new book
  const addhoc = async (event) => {
    event.preventDefault();
    if(!validateNewTitle(book.title)){
      return;
    }
    let authorRef;
    if (isNewAuthor && authors) {
      if(!validateNewAuthor(authorSelected)){
        return;
      }
      const authorCollectionRef = collection(firestore, "authors");
      const authorCollectionSnapshot = await getDocs(authorCollectionRef);
      const authorCollectionSize = authorCollectionSnapshot.size;
      const newAuthorID = `author-${authorCollectionSize+1}`
      setAuthorID(newAuthorID);
      const authorDocRef = doc(authorCollectionRef, newAuthorID);
      
      try {
        await setDoc(authorDocRef, {
          Name: authorSelected,
        });
        authorRef = newAuthorID;
        showToast(`Du la til en ny forfatter: ${authorSelected}`, "success", 1000);
      } catch (error) {
        showToast(`Error adding author ${error}!`, "error", 3000);
      }
  }else{
    authorRef = authorID;
  }
    
    const bookCollectionRef = collection(firestore, "book");
    const bookCollectionSnapshot = await getDocs(bookCollectionRef);
    const bookCollectionSize = bookCollectionSnapshot.size;
    
    const reviewCollectionRef = collection(firestore, "ratings");
    const reviewCollectionSnapshot = await getDocs(reviewCollectionRef);
    const reviewCollectionSize = reviewCollectionSnapshot.size;

    const docRef = doc(bookCollectionRef,  `book-${bookCollectionSize+1}`);    
    try {
        await setDoc(docRef, {
          Title: book.title,
          Author: authorRef,
          Genre : book.genre,
          Summary: book.summary,
          Picture : book.picture
        });
      console.log("Book added with ID: ", docRef.id);

      showToast(
        `Hurra! Du la til en ny bok: ${book.title}`, 
        'success', 
        3000, 
      );


      // Resetting the fields after adding a book
      setBook({ title: "", author: "", summary: "", genre: "", picture: "" }); 

    } catch (error) {
      console.error("Error adding book: ", error);
    }

    const docRefReview = doc(reviewCollectionRef,
      `rating-${reviewCollectionSize + 1}`
    );
    try {
      await setDoc(docRefReview, {});}catch(error){console.error("Error adding rewiev: ", error);}

      navigate("/");
  };

  const handleAuthorChange = (event) => {
    const { value } = event.target;
    if (value === "Ny forfatter") {
      setIsNewAuthor(true);
      setAuthorSelected("");
      setBook((prev) => ({ ...prev, author: "" }));
    } else {
      setIsNewAuthor(false);
      setAuthorSelected(value);
      setAuthorID(value);
      setBook((prev) => ({ ...prev, author: value }));
    }
  };

  function validateNewAuthor(newAuthor) {
  if (authors.some(author => author.Name.toLowerCase() === newAuthor.toLowerCase())) {
    showToast("Denne forfatteren finnes fra før!", "warning", 2000);
    return false;
  }
  return true;
}

  function validateNewTitle(newBook){
    if(books.some(book=>book.Title.toLowerCase()===newBook.toLowerCase())){
      showToast("Denne boken finnes fra før!", "warning", 2000);
      return false;
    }
    return true;
  }

  return (
    <>
      <div>
        <Header />
        <Navbar />
        <ToastMessage />
        <div id="bookwrapper">  
          <div id="innlegg">
            <h2>Legg til bok </h2>
            <main>
              <form id="addBook" onSubmit={addhoc}>
                <div id="inputFraUser">
                  <TextField
                    name="title"
                    id="title"
                    type="text"
                    value={book.title}
                    placeholder="Tittel"
                    required
                    onChange={handleBookData}
                    inputProps={{ minLength: 2, maxLength: 50 }}
                    style = {{width: 270}}
                  />

                  
                </div>
                <div id="inputFraUser">
                  <TextField
                    select
                    label="Forfatter"
                    color="secondary"
                    value={authorSelected}
                    onChange={handleAuthorChange}
                    style = {{width: 270}}
                    required
                  >
                    <MenuItem value={"Ny forfatter"}>Ny forfatter</MenuItem>
                    {sortedAuthors && sortedAuthors.length > 0 ? (
                      sortedAuthors.map((author) => (
                        <MenuItem key={author.id} value={author.id}>
                          {getAuthorName(author.id, authors)}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value={null} disabled>
                        Ingen forfattere funnet
                      </MenuItem>
                    )}
                  </TextField>
                  {isNewAuthor===true?(
                    <TextField
                    name="author"
                    id="author"
                    type="text"
                    inputProps={{ minLength: 4, maxLength: 50 }}
                    placeholder="Navn"
                    required
                    onChange={handleBookData}
                    value={authorSelected}
                  />
                  ):""}
                </div>
                <div id="inputFraUser">
                  <TextField
                    name="genre"
                    id="genre"
                    type="text"
                    inputProps={{ minLength: 3, maxLength: 20 }}
                    value={book.genre}
                    placeholder="Sjanger"
                    onChange={handleBookData}
                    required
                    style = {{width: 270}}
                  />
                </div>
                <div id="inputFraUser">
                  <TextField
                    name="picture"
                    id="picture"
                    type="text"
                    value={book.picture}
                    placeholder="Bildelink"
                    onChange={handleBookData}
                    inputProps={{ minLength: 5, maxLength: 1000 }}
                    required
                    style = {{width: 270}}
                  />
                </div>
                <div id="inputFraUser">
                <TextField
                  form="addBook"
                  id="summary"
                  name="summary"
                  value={book.summary}
                  placeholder="Sammendrag av boka"
                  onChange={handleBookData}
                  inputProps={{ minLength: 50, maxLength: 1500 }}
                  required
                  multiline
                  size="auto"
                  style = {{width: 270}}
                />
                </div>

                <div>
                  <button type="submit"> Legg til bok </button>
                </div>
              </form>
            </main>
          
        </div>
      </div>
      <Footer />
      </div>
    </>
  );
}

export default AddBooks;
