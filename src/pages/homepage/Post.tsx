import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { Post as PostInterface } from "./Home";

interface Props {
  post: PostInterface;
}

interface Like {
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);

  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })));
  };

  useEffect(() => {
    getLikes();
  }, []);

  const addLike = async () => {
    const likeToDelete = query(
      likesRef,
      where("postId", "==", post.id),
      where("userId", "==", user?.uid)
    );
    await addDoc(likesRef, {
      userId: user?.uid,
      postId: post.id,
    });
    getLikes();
  };

  const deleteLike = async () => {
    const deleteQuery = query(
      likesRef,
      where("postId", "==", post.id),
      where("userId", "==", user?.uid)
    );
    const deleteData = await getDocs(deleteQuery);
    await deleteDoc(doc(likesRef, deleteData.docs[0].id));
    getLikes();
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  return (
    <div>
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="body">
        <p>{post.description}</p>
      </div>
      <div className="footer">
        <p> @{post.username}</p>
        <button onClick={hasUserLiked ? deleteLike : addLike}>
          {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
        </button>
        {likes && <p> Likes: {likes.length}</p>}
      </div>
    </div>
  );
};
