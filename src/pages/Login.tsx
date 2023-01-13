import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    navigate("/");
  };

  return (
    <div>
      <h1> Sign in with Google to continue</h1>
      <button onClick={signInWithGoogle}> Sign in with Google</button>
    </div>
  );
};
