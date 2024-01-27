import React from "react";
import "../css/Navbar.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase_setup/firebase";
import { BookData } from "../controllers/BookRepository";
import { AuthorData } from "../controllers/AuthorRepository";
import { FaSearch } from "react-icons/fa";
import Userprofile from "./Userprofile";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const { books } = BookData();
  const { authors } = AuthorData();

  // BookData: getting data from the collection, Books from Firestore
  const handleSearch = (event) => {
    event.preventDefault();
    const filteredAuthors = authors.filter((author) =>
      author.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredBooks = books.filter(
      (book) =>
        filteredAuthors.some((author) => author.id === book.Author) ||
        book.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchTerm("");
    navigate("/Search", { state: { booksToShow: filteredBooks } });
    window.location.reload(false);
  };

  return (
    <div className="Navbar">
      <div className="Searchbar">
        <form onSubmit={handleSearch}>
          <input
            className="Søkefelt"
            type="text"
            placeholder="Søk etter tittel eller forfatter..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button
            className="Søkeknapp"
            type="submit"
            onChange={(event) => setSearchTerm(event.target.value)}
          >
            <FaSearch /> Søk
          </button>
        </form>
      </div>
      <button id="AddBooks" onClick={() => navigate("/AddBooks")}>
        {" "}
        Legg Til Bok{" "}
      </button>
      <button id="Topplister" onClick={() => navigate("/Topplister")}>
        {" "}
        Topplister{" "}
      </button>
      <button id="ToppRated" onClick={() => navigate("/ToppRated")}>
        {" "}
        Våre Favoritter{" "}
      </button>
      {user ? (
        <>
          <Userprofile />
        </>
      ) : (
        <button id="LogInn" onClick={() => navigate("/login")}>
          Logg inn
        </button>
      )}
    </div>
  );
}

export default Navbar;
