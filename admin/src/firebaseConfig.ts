import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDU17BuNxxB-drKXiUtO5FYqVLVWnvrqDU",
  authDomain: "personal-blog-5c5ed.firebaseapp.com",
  projectId: "personal-blog-5c5ed",
  storageBucket: "personal-blog-5c5ed.appspot.com",
  messagingSenderId: "199664755696",
  appId: "1:199664755696:web:87556b1efdd0b231257335",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
