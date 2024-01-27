import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

import { auth } from "../firebase_setup/firebase";
import { signOut } from "firebase/auth";

// AuthorData: getting data from the collection, authors from Firestore

export function UserData() {
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(firestore, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  const updateUserField = async (userID, fieldName, fieldValue) => {
    try {
      await updateDoc(doc(firestore, "users", userID), {
        [fieldName]: fieldValue,
      });
      setUsers((prevState) => {
        return prevState.map((user) => {
          if (user.id === userID) {
            return {
              ...user,
              [fieldName]: fieldValue,
            };
          } else {
            return user;
          }
        });
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return { users, updateUserField };
}

export function getUsername(userID, users) {
  const user = users.find((user) => user.id === userID);
  return user ? <>{user.username}</> : "Anonym";
}

export function getAdmin(userID, users) {
  const user = users.find((user) => user.id === userID);
  return user ? user.admin : false;
}

export function myFavourites(userID, users) {
  const user = users.find((user) => user.id === userID);
  return user && user.favourites ? user.favourites : [];
}

// Function for log out
export function logout() {
  signOut(auth)
    .then(() => {
      console.log("Logged out");
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getUserAdminStatus(userId) {
  try {
    const userRef = firestore.collection('users').doc(userId);
    const userDoc = await userRef.get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      if (userData.hasOwnProperty('admin')) {
        return userData.admin;
      } else {
        throw new Error(`User ${userId} does not have an admin field`);
      }
    } else {
      throw new Error(`User ${userId} does not exist in the database`);
    }
  } catch (error) {
    console.error(`Error getting admin status for user ${userId}: `, error);
    return false; 
  }
}

/* export async function changeUserData(userID, fieldName, fieldValue, users, setUsers) {
    try {
      await updateDoc(doc(firestore, 'users', userID), {
        [fieldName]: fieldValue
      });
      setUsers(prevState => {
        return prevState.map(user => {
          if (user.id === userID) {
            return {
              ...user,
              [fieldName]: fieldValue
            };
          } else {
            return user;
          }
        });
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  } */
