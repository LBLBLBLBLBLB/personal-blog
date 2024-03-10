import { useState, useEffect } from "react";
import { db } from "./firebaseConfig";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [fetchData, setFetchData] = useState(true);
  const [posts, setPosts] = useState([]);
  const usersCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setPosts(
        data.docs.map((doc) => {
          const post = doc.data();
          const date = new Date(post.upload_date.seconds * 1000);
          return {
            ...doc.data(),
            id: doc.id,
            date: date.toLocaleDateString(),
          };
        })
      );
    };
    if (fetchData) {
      getUsers();
      setFetchData(false);
    }
  }, [usersCollectionRef, fetchData]);
  console.log(posts);

  return (
    <>
      <h1>Admin Dashboard</h1>

      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.name}</h2>
          <p>{post.article}</p>
          <p>date{post.date}</p>
        </div>
      ))}
    </>
  );
}

export default App;
