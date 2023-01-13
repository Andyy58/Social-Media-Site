import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { Post } from "./Post";
import { useAuthState } from "react-firebase-hooks/auth";

export interface Post {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

export const Home = () => {
  const [postList, setPostsList] = useState<Post[] | null>(null);
  const postsRef = collection(db, "posts");
  const [user] = useAuthState(auth);

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };
  useEffect(() => {
    getPosts();
  }, []);
  return user ? (
    <div>
      {postList?.map((post) => (
        <Post post={post} />
      ))}
    </div>
  ) : (
    <h1>Please Log In to View Posts</h1>
  );
};
