import React, { useEffect, useState } from "react";
import { auth } from "../firebase_setup/firebase";
import { firestore } from "../firebase_setup/firebase";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  deleteDoc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { AuthorData, getAuthorByID } from "../controllers/AuthorRepository";
import { ReviewData} from "../controllers/RatingRepository";
import { UserData, getUsername, getAdmin } from "../controllers/UserRepository";
import { ToastMessage, showToast } from './ToastMessage';
import { FaHeart } from "react-icons/fa";
import { myFavourites } from "../controllers/UserRepository";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import "../css/Bokside.css";

function Bokside() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const { users, updateUserField } = UserData();
  const { authors } = AuthorData();
  const [isFavourite, setIsFavourite] = useState(false);
  const params = useParams();
  const bookID = params.bookID;
  const [book, setBook] = useState({});
  const docRef = doc(firestore, "book", bookID);
  const [averageRating, setAverageRating] = useState(0);
  const [hasReviewed, sethasReviewed] = useState(false);
  let querySnapshot;
  const reviewCollectionRef = collection(firestore, "ratings");

  useEffect(() => {

    const fetchUserReview = async () => {
      console.log("is this working?")
      console.log(user.uid);
      console.log(bookID);
      try { querySnapshot = await getDocs(
        query(
          reviewCollectionRef,
          where("userID", "==", user.uid),
          where("bookID", "==", bookID)
        )
      );
      } catch (error){
        console.error("Error fetching user review: ", error);
      }
      if (querySnapshot.docs) {
        console.log("querySnapshot.docs:", querySnapshot.docs);
      } else {
        console.log("No matching documents found");
      }

      if (querySnapshot.docs && querySnapshot.docs.length > 0) {
        sethasReviewed(true);
        console.log("Bruker har allerede skrevet review")
      }
    };
    fetchUserReview();

    const getBook = async () => {
      const docSnap = await getDoc(docRef);
      setBook(docSnap.data());
      await calculateAverageRating();
    };
    getBook();
  }, []);

  // Function to get all the reviews of a book
  function reviewsToDiv() {
    const { reviews } = ReviewData();

    // Filter the reviews to only include those for the current book
    const bookReviews = reviews.filter((review) => review.bookID === bookID);

    // Check if bookReviews is an array before using the map() method
    if (!Array.isArray(bookReviews)) {
      return null;
    }

    const deleteReview = async (reviewId) => {
      await deleteDoc(doc(firestore, "ratings", reviewId));
      showToast(" Vurderingen ble fjernet","default", 3000);
      // Refresh the reviews after deleting the review
      window.location.reload(false);
    };



    if(user && getAdmin(user.uid, users)){
    // Use the map() method on the bookReviews array
    const reviewsList = bookReviews.map((review) => (
      <div key={review.id}>
        <p id="vurdering_brukernavn">
          {" "}
          Bruker: {getUsername(review.userID, users)}{" "}
        </p>
        <p id="vurdering_tekst"> Vurdering: {review.review}</p>
        <button className="SlettVurdering" onClick={() => deleteReview(review.id)}>
        Slett vurdering
        </button>
      </div>
      ));
      return <> {reviewsList}</>;
    } else{
      const reviewsList = bookReviews.map((review) => (
        <div key={review.id}>
          <p id="vurdering_brukernavn">
            {" "}
            Bruker: {getUsername(review.userID, users)}{" "}
          </p>
          <p id="vurdering_tekst"> Vurdering: {review.review}</p>
        </div>
      ));
      return <> {reviewsList}</>;
    }
  }

  // Function for calculating average rating
  async function calculateAverageRating() {
    if (user) {
      console.log(user.admin);
    }

    // Filter the reviews to only include those for the current book
    let totalRating = 0;
    let numRatings = 0;
    const reviewCollectonRef = collection(firestore, "ratings");
    const querySnapshot = await getDocs(
      query(reviewCollectonRef, where("bookID", "==", bookID))
    );
    querySnapshot.forEach((doc) => {
      if (doc.data().rating != null) {
        totalRating += doc.data().rating;
        numRatings++;
      }
    });
    
    const averageRating = numRatings > 0 ? totalRating / numRatings : 0;
    setAverageRating(parseFloat(averageRating.toFixed(1)));
    console.log(averageRating);
  }

  function FavouriteHeart() {
    if (!user) {
      return null;
    }

    const handleClick = () => {
      toggleFavourite();
    };
    // Function for adding/removing book to Favourites
    const toggleFavourite = async () => {
      const userDoc = users.find(
        (user_firebase) => user_firebase.id === user.uid
      );
      const userFavourites = userDoc.favourites;

      if (isFavourite && userFavourites.includes(bookID)) {
        const index = userFavourites.indexOf(bookID);
        const newUserFavourites = [...userFavourites];
        newUserFavourites.splice(index, 1);
        await updateUserField(user.uid, "favourites", newUserFavourites);
        setIsFavourite(false);
        showToast(book.Title + " ble fjernet fra mine favoritter","default", 1000);
      } else {
        const newUserFavourites = [...userFavourites, bookID];
        await updateUserField(user.uid, "favourites", newUserFavourites);
        setIsFavourite(true);
        showToast(book.Title + " ble lagt til i mine favoritter","default", 1000);
      }
    };

    if (
      users.length > 0 &&
      user &&
      myFavourites(user.uid, users).includes(bookID) &&
      !isFavourite
    ) {
      setIsFavourite(true);
    }

    return (
      <div>
        <FaHeart
          className="heart-icon"
          onClick={handleClick}
          color={isFavourite ? "red" : "grey"}
          size={28}
        />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Navbar />
      <ToastMessage />
      <div id="bokwrapper">
        <div id="bilde">
          <img src={book.Picture} alt="Book cover" />
        </div>
        <div id="bokinfo">
          <div id="bokinfo1">
            <div id="bokinfo1_1">
              <h2>
                {Object.keys(book).length === 0 ? "Henter info..." : book.Title}
              </h2>
              <h3>
                {authors.length > 0
                  ? getAuthorByID(book.Author, authors)
                  : "Henter info..."}
              </h3>
              <p>Brukeres rating:</p>
              <span className="brukeres-vurdering">
                <span
                  className={
                    averageRating >= 1 ? "star-filled" : "star-unfilled"
                  }
                >
                  ★
                </span>
                <span
                  className={
                    averageRating >= 2 ? "star-filled" : "star-unfilled"
                  }
                >
                  ★
                </span>
                <span
                  className={
                    averageRating >= 3 ? "star-filled" : "star-unfilled"
                  }
                >
                  ★
                </span>
                <span
                  className={
                    averageRating >= 4 ? "star-filled" : "star-unfilled"
                  }
                >
                  ★
                </span>
                <span
                  className={
                    averageRating >= 5 ? "star-filled" : "star-unfilled"
                  }
                >
                  ★
                </span>
              </span>
              <div className="goodreads-rating">
                {book.Goodreads && (
                  <>
                    <img
                      src={book.Goodreadslogo}
                      alt="Goodreads Logo"
                      className="goodreads-logo"
                    />
                    <span className="goodreads-rating">{book.Goodreads}</span>
                  </>
                )}
              </div>
            </div>
            <div id="bokinfo1_2">
              <div id="bokinfo1_2_1">{user ? FavouriteHeart() : null}</div>
              <div id="bokinfo1_2_2">
                {user ? (
                  <>
                    <button
                      id="addRating"
                      onClick={() =>
                        navigate(
                          "/ReviewBook/{bookID}".replace("{bookID}", bookID)
                        )
                      }
                    >
                      {hasReviewed ? "Endre vurdering" : "Legg til vurdering"}
                    </button>
                  </>
                ) : (
                  <>Logg inn for å vurdere</>
                )}
              </div>
            </div>
          </div>
          <div id="bokinfo2">
            <p>{book.Summary}</p>
          </div>
        </div>
        <div id="vurderinger">
          <div id="vurderingsOverskrift">
            <h2>Vurderinger</h2>
          </div>
          <div id="vurderingsbokser">{reviewsToDiv()}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Bokside;