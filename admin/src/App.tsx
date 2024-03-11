import { useState, useEffect } from "react";
import { db } from "./firebaseConfig";

import Table from "./components/Table";

import { Post } from "./types/interfaces";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

function App() {
  const [fetchData, setFetchData] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newBlogName, setNewBlogName] = useState("");
  const [newArticle, setNewArticle] = useState("");
  const [newDate, setNewDate] = useState("");
  const postsCollectionRef = collection(db, "posts");

  const createPost = async () => {
    const timestamp = Timestamp.fromDate(new Date(newDate));
    await addDoc(postsCollectionRef, {
      name: newBlogName,
      article: newArticle,
      upload_date: timestamp,
    });
    setFetchData(true);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(postsCollectionRef);
      setPosts(
        data.docs.map((doc) => {
          const post = doc.data();
          const date = new Date(post.upload_date.seconds * 1000);

          return {
            id: doc.id,
            name: post.name,
            article: post.article,
            date: date.toLocaleDateString(),
          };
        })
      );
    };
    if (fetchData) {
      getUsers();
      setFetchData(false);
    }
  }, [postsCollectionRef, fetchData]);
  console.log(posts);

  return (
    <>
      <h1>Admin Dashboard</h1>
      <Table posts={posts} />
      <div className="modal">
        <input
          type="text"
          placeholder="blog name"
          onChange={(event) => {
            setNewBlogName(event.target.value);
          }}
        />
        <textarea
          placeholder="blog"
          onChange={(event) => {
            setNewArticle(event.target.value);
          }}
        />
        <input
          type="date"
          onChange={(event) => {
            setNewDate(event.target.value);
          }}
        />
        <button onClick={createPost}>Submit</button>
      </div>
      <div className="overlay"></div>
    </>
  );
}

export default App;
