import { firestore as db} from "./firebase.js";
import { doc, getDoc } from "@firebase/firestore";


class Book {
    constructor(title, author, genre, rating, summary){
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.rating = rating;
        this.summary = summary;
    }
    toString() {
        return this.title;
    }
  }
  
  // Firestore data converter
  const bookConverter = {
    toFirestore: (book) => {
        return {
            title: book.Title,
            author: book.Author,
            genre: book.Genre,
            rating: book.Rating,
            summary: book.Summary
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Book(data.Title, data.Author, data.Genre, data.Rating, data.Summary);
    }
  };

//Example code showcasing a simple way to implement object creation. 
//Import bookConverter with the correct file path along with methods from from "@firebase/firestore" wherever book objects are needed
//Also import: import { firestore as db} from "../firebase_setup/firebase.js";
/* 
(async () => {
  const q = doc(db, "book", "Det-ender-med-oss-3").withConverter(bookConverter)
  const docSnap = await getDoc(q);
  if (docSnap.exists()) {
    // Convert to Book object
    const book = docSnap.data();
    // Use a Book instance method
    console.log(book);
  } else {
    console.log("No such document!");
  }
})();
*/

export default bookConverter;

