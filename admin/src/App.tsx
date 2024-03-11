import "./App.css";

import { useState, useEffect } from "react";
import { db } from "./firebaseConfig";

import Table from "./components/Table";

import { Post } from "./types/interfaces";

import {
  collection,
  getDocs,
  addDoc,
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const postsCollectionRef = collection(db, "posts");

  const createPost = async () => {
    const timestamp = Timestamp.fromDate(new Date(newDate));
    await addDoc(postsCollectionRef, {
      name: newBlogName,
      article: newArticle,
      upload_date: timestamp,
    });
    setFetchData(true);

    setNewBlogName("");
    setNewArticle("");
    setNewDate("");
    setIsModalOpen(false);
  };

  const deletePost = async (id: string) => {
    const userDoc = doc(db, "posts", id);
    await deleteDoc(userDoc);
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
      <Table posts={posts} deletePost={deletePost} />
      <button onClick={() => setIsModalOpen(true)}>Add Post</button>

      <div className={`modal ${isModalOpen ? "modal-active" : ""}`}>
        <input
          value={newBlogName}
          type="text"
          placeholder="blog name"
          onChange={(event) => {
            setNewBlogName(event.target.value);
          }}
        />
        <textarea
          value={newArticle}
          placeholder="blog"
          onChange={(event) => {
            setNewArticle(event.target.value);
          }}
        />
        <input
          value={newDate}
          type="date"
          onChange={(event) => {
            setNewDate(event.target.value);
          }}
        />
        <button onClick={createPost}>Submit</button>
        <button
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          close
        </button>
      </div>
      <div
        onClick={() => {
          setIsModalOpen(false);
        }}
        className={`overlay ${isModalOpen ? "overlay-active" : ""}`}
      ></div>
    </>
  );
}

export default App;
