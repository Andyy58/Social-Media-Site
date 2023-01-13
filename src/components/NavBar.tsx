import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const NavBar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const signUserOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/"> Home</Link>
        {user && <Link to="/createpost">Create Post</Link>}
      </div>

      <div className="user">
        {user ? (
          <>
            <p>{user?.displayName} </p>
            <img
              src={user?.photoURL || ""}
              alt=""
              width="100"
              height="100"
              referrerPolicy="no-referrer"
            />
            <button className="link-button" onClick={signUserOut}>
              Logout
            </button>
          </>
        ) : (
          <div className="links">
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};
