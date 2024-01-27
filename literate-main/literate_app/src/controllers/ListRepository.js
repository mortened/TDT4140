import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

// ListData: getting the collection, Lists from Firestore
export function ListData() {
    const [lists, setLists] = useState([]);
    const listCollectonRef = collection(firestore, "lists");
    
    useEffect(() => {
      const getLists = async () => {
        const data = await getDocs(listCollectonRef);
        setLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getLists();
    }, []);
  
    return {lists};
  }

  // Function to get name of list wiht input parameter, listID
export function getListByID(listID, lists) {
  const list = lists.find((listElement) => listElement.id === listID);
  return list ? <>{list.Name}</> : <></>;

}

// Function to get name of a given list with validation
export function getListName(listID, lists) {
    const listToFind = lists.find((list) => list.id === listID);
  
    try {
      if (listToFind) {
        // Found the list with the specified id
        return <>{listToFind.Name}</>;
      }
    } catch(error) {
      console.log("Error: " + error)
    }
   
  }
