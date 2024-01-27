import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

// AuthorData: getting data from the collection, authors from Firestore
export function AuthorData() {
    const [authors, setAuthors] = useState([]);
    const authorCollectionRef = collection(firestore, "authors");
  
    useEffect(() => {
      const getAuthors = async () => {
        const data = await getDocs(authorCollectionRef);
        setAuthors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getAuthors();
    }, []);
  
    return { authors };
  }

// Function to get author by ID and collection of authors
export function getAuthorByID(authorID, authors) {
  const author = authors.find((author) => author.id === authorID);
  return <>{author ? author.Name : "Unknown author"}</>;
}


export function getAuthorName(authorID, authors) {
  const author = authors.find((author) => author.id === authorID);
  const author_name = author.Name; 

  const nameParts = author_name.split(" ");
  const firstName = nameParts[0];
  const middleName = nameParts.slice(1, nameParts.length - 1).join(" ");
  const lastName = nameParts[nameParts.length - 1];

  const full_name = lastName + ", " + middleName + " " + firstName;

  return full_name;
}

// Sorting function of authors
export function sortingAuthors(authors) {

  // Comparator of authors
  const sortedAuthors = authors.sort((a, b) => {
    const a_author = a.Name.toLowerCase();
    const b_author = b.Name.toLowerCase();

    const a_parts = a_author.split(" ");
    const b_parts = b_author.split(" ");

    const a_firstName = a_parts[0];
    const a_lastName = a_parts[a_parts.length - 1];

    const b_firstName = b_parts[0];
    const b_lastName = b_parts[b_parts.length - 1];

     const lastNameComparison = a_lastName.localeCompare(b_lastName);
     if (lastNameComparison !== 0) {
       return lastNameComparison;
     }
     return a_firstName.localeCompare(b_firstName);
   });
 
   return sortedAuthors;
}