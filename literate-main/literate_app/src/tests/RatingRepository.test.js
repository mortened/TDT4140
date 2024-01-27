import { getAverageRating, getBookRatings, getReviewComment } from '../controllers/RatingRepository';
import React from "react";

describe('getAverageRating', () => {
  const reviews = [    
    { bookID: 1, comment: "Great book!", rating: 5 },    
    { bookID: 1, comment: "Could have been better", rating: 4 },    
    { bookID: 2, comment: "Not worth the money", rating: 3 },    
    { bookID: 2, commment: "I like this book", rating: 2 },  
  ];

  it('should return null if reviews is undefined', () => {
    expect(getAverageRating(1, undefined)).toBeNull();
  });

  it('should calculate the average rating for a book', () => {
    expect(getAverageRating(1, reviews)).toEqual(4.5);
    expect(getAverageRating(2, reviews)).toEqual(2.5);
  });

  it('should return 0 if there are no reviews for the book', () => {
    expect(getAverageRating(3, reviews)).toEqual(NaN);
  });


  // it("returns the reviews for a given book ID", () => {
  //   const bookID = 1;
  //   const expectedReviews = [{bookID: 1, comment:"Great book!", rating: 5}, {bookID: 1, comment:"Could have been better", rating: 4}];
  //   expect(getBookRatings(bookID, reviews)).toEqual(<>{expectedReviews}</>);
  // });

  // it("returns an empty array if no reviews are found for a given book ID", () => {
  //   const bookID = 4;
  //   const expectedReviews = <></>;
  //   expect(getBookRatings(bookID, reviews)).toEqual(expectedReviews);
  // });

});


describe('getBookRatings', () => {
  const reviews = [
    { id: 1, bookID: 1, rating: 4 },
    { id: 2, bookID: 2, rating: 5 },
    { id: 3, bookID: 1, rating: 3 },
    { id: 4, bookID: 3, rating: 2 },
  ];

  it('returns a JSX expression with all reviews for a book', () => {
    const bookID = 1;
    const expectedOutput = reviews.filter((review) => review.bookID === bookID);
    expect(getBookRatings(bookID, reviews)).toEqual(<> {expectedOutput} </>);
  });

  it('returns an empty JSX fragment when no reviews are found for a book', () => {
    const bookID = 4;
    const expectedOutput = reviews.filter((review) => review.bookID === bookID);
    expect(getBookRatings(bookID, reviews)).toEqual(<> {expectedOutput} </>);
  });
});

describe("getReviewComment", () => {
  const reviews = [
    { id: 1, comment: "Great product!" },
    { id: 2, comment: "Could be better." },
    { id: 3, comment: "Terrible service." },
  ];

  it("returns comment when review exists", () => {
    const reviewID = 1;
    const expectedOutput = <>{reviews[0].comment}</>;
    expect(getReviewComment(reviewID, reviews)).toEqual(expectedOutput);
  });

  it("returns 'Ingen vurdering' when review does not exist", () => {
    const reviewID = 4;
    const expectedOutput = "Ingen vurdering";
    expect(getReviewComment(reviewID, reviews)).toEqual(expectedOutput);
  });
});