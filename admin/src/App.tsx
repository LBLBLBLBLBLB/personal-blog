import "./App.css";

import { useState, useEffect } from "react";
import { db } from "./firebaseConfig";

import Table from "./components/Table";
import Modal from "./components/Modal";

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
    const postsDoc = doc(db, "posts", id);
    await deleteDoc(postsDoc);
    setFetchData(true);
  };

  useEffect(() => {
    const getPosts = async () => {
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
      getPosts();
      setFetchData(false);
    }
  }, [postsCollectionRef, fetchData]);

  return (
    <>
      <h1>Admin Dashboard</h1>
      <Table posts={posts} deletePost={deletePost} />
      <button onClick={() => setIsModalOpen(true)}>Add Post</button>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        createPost={createPost}
        newBlogName={newBlogName}
        setNewBlogName={setNewBlogName}
        newArticle={newArticle}
        setNewArticle={setNewArticle}
        newDate={newDate}
        setNewDate={setNewDate}
      />
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
