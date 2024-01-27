import React, { useState, useEffect } from "react";
import { firestore } from "../firebase_setup/firebase";
import { collection, doc, setDoc, getDoc, getDocs, query, where, updateDoc } from "firebase/firestore";
import { BookData, getBookTitle, getBookPicture } from "../controllers/BookRepository";
import { auth } from "../firebase_setup/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { ToastMessage, showToast } from './ToastMessage';
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import "../css/Bokside.css";

function ReviewBook() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const { books } = BookData();
  const params = useParams();
  const bookID = params.bookID;
  const [hoverRating, setHoverRating] = useState(0);
  const [hasReviewed, sethasReviewed] = useState(false);
  const reviewBook = getBookTitle(bookID,books);
  
  let querySnapshot;

  const [review, setReview] = useState({
    userID: "",
    bookID: "",
    review: "",
    rating: 0,
  });

  const reviewCollectionRef = collection(firestore, "ratings");

  // Function to handle user input
  const handleReviewData = (event) => {
    const { name, value } = event.target;
    setReview((prev) => {
      return { ...prev, [name]: value };
    });
  };

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
        const userReviewDoc = querySnapshot.docs[0];
        const userReviewData = userReviewDoc.data();
        setReview({
          userID: userReviewData.userID,
          bookID: userReviewData.bookID,
          review: userReviewData.review,
          rating: userReviewData.rating,
        });
        sethasReviewed(true);
        console.log(review.review);
        console.log(review.rating);
        console.log("Bruker har allerede skrevet review")
      }
    };
    fetchUserReview();
  }, []);


  const addhoc = async (event) => {
    event.preventDefault();

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

    
    if(hasReviewed){
      const userReviewDoc = await getDoc(doc(reviewCollectionRef, querySnapshot.docs[0].id));
      try {
        await updateDoc(userReviewDoc.ref, {
          review: review.review, 
          rating: review.rating, 
        });
        console.log("Updated the existing review with ID: ", userReviewDoc.id);
     
        showToast(
          `Din vurdering av boken: ${reviewBook} har nå blitt oppdatert`, 
          'success', 
          1500, 
          () => {
            navigate("/book/{bookID}".replace("{bookID}", bookID));
          }
        );
      // Resetting the fields after updating the review
      setReview({ ...review, review: "" });

    } catch (error) {
      console.error("Error updating review: ", error);
    }
    } else {
    const docRef = doc(
      reviewCollectionRef);
    try {
      await setDoc(docRef, {
        userID: user.uid,
        bookID: bookID,
        review: review.review,
        rating: review.rating, 
      });
      console.log("Created a new review with ID: ", docRef.id);

       showToast(
        `Vurdering av boken: ${reviewBook} har blitt registrert`, 
        'success', 
        3000, 
        () => {
          navigate("/book/{bookID}".replace("{bookID}", bookID));
        }
      );

      // Resetting the fields after adding a review on a book
      setReview({ ...review, review: "" });
    } catch (error) {
      console.error("Error adding review: ", error);
    }
  }
  };

  //styrer om en stjerne skal være fylt eller ikke:
  const starClass = (index) => {
    if (hoverRating >= index) {
      return "star-hover";
    } else if (review.rating >= index) { 
      return "star-filled";
    } else {
      return "star-unfilled";
    }
  };

  const handleStarHover = (hoverRatingValue) => {
    setHoverRating(hoverRatingValue);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  return (
    <>
      <div className="App">
        <Header />
        <Navbar />
        <ToastMessage />
        <div id="bokwrapper">
        <div id="vurderingbilde">
          <img src={getBookPicture(bookID, books)} alt="Book cover" />
        </div>
          <div id="bokinfo">
            <h2> Vurdering </h2>

            <main>
              <form id="addReview" onSubmit={addhoc}>
                <div>
                  <h4> Bok: {getBookTitle(bookID, books)} </h4>
                </div>

                <p style={{ margin: "0 -50px 50px" }} />

                <h3> Min vurdering </h3>

                <div>
                  <textarea
                    form="addReview"
                    id="summary"
                    rows="15"
                    cols="120"
                    name="review"
                    type="text"
                    value={review.review}
                    placeholder={'Vurdering av boka'}
                    onChange={handleReviewData}
                  />
                </div>

                <p style={{ margin: "0 -50px 50px" }} />

                <div id="starrating">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <span
                      key={index}
                      className={starClass(index)}
                      onClick={() => {
                        console.log("clicked star", index);
                        setReview({ ...review, rating: index})}
                      }
                      onMouseEnter={() => handleStarHover(index)}
                      onMouseLeave={handleStarLeave}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <div>
                  <button id="lagVurdering" type="submit">   {hasReviewed ? "Endre min vurdering" : "Legg til vurdering"} </button>
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

export default ReviewBook;
