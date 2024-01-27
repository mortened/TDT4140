import { useEffect, useState } from "react";
import { firestore } from "../firebase_setup/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";


// ReviewData: getting the collection, ratings from Firestore
export function ReviewData() {
  const [reviews, setReviews] = useState([]);
  const reviewCollectionRef = collection(firestore, "ratings");

  useEffect(() => {
    const getReviews = async () => {
      const data = await getDocs(reviewCollectionRef);
      setReviews(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getReviews();
  }, []);

  return { reviews };
}

// Calculating and returning average rating
export function getAverageRating(bookID, reviews) {
  // Check if reviews is not undefined before calling filter
  if (!reviews) {
    return null;
  }

  // Filter the reviews to only include those for the current book
  const bookReviews = reviews.filter((review) => review.bookID === bookID);

  // Map through the reviews and calculate the average rating
  const totalRating = bookReviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );

  const averageRating = totalRating / bookReviews.length;
  console.log(averageRating)
  return averageRating;
}

// Function for getting all the rankings for a book
// Input: bookID
export function getBookRatings(bookID, reviews) {
  const bookReviews = reviews.filter((review) => review.bookID === bookID);
  return <> {bookReviews} </>;
}

// Function for getting the comments from a review
export function getReviewComment(reviewID, reviews) {
  const review = reviews.find((review) => review.id === reviewID);
  return review ? <>{review.comment}</> : "Ingen vurdering";
}

// Function for deleting a ranking
// Input: reviewID, reviews
export async function deleteRating(reviewID, reviews) {
  try {
    await deleteDoc(doc(firestore, "ratings", reviewID));
    console.log("Deleted review: ", reviews);

  } catch (error) {
    console.error("Error removing review: ", error);
  }
}

// "Mine lister": Function for getting all the rankings from an user
// Input: userID, reviews
export function getUserRatings(userID, reviews) {}
