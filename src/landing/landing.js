import React, { useEffect, useContext, useState } from "react";
import { signInWithGoogle } from "../services/firebase";
import { UserContext } from "../provider/userprovider";
import { Navigate, useNavigate } from "react-router-dom";
export default function Landing() {
  const user = useContext(UserContext);
  const [redirect, setredirect] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    if (user) {
      console.log(user);
      setredirect("/home");
    }
  }, [user]);

  if (redirect) {
    // <Navigate to={redirect} />
    nav("home", { replace: true });
  }
  const SignIn = () => {
    signInWithGoogle().then((userData) => {
      setredirect("/home");
    });
  };
  return (
    <div className="container">
      <h2 style={{ fontFamily: "sans-serif" }}>Welcome To Bucket List App</h2>
      <button type="submit" onClick={SignIn}>
        Sign in with Google
      </button>
    </div>
  );
}
