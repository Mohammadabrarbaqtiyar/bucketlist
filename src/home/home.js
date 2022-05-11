import { useState, useEffect, useContext } from "react";
import { UserContext } from "../provider/userprovider";
import { useNavigate } from "react-router-dom";
import { logOut } from "../services/firebase";
import { db } from "../services/firebase";
import firebase from "firebase/compat/app";
import { doc, deleteDoc, documentId } from "firebase/firestore";
import "./home.css";

export default function Home() {
  const user = useContext(UserContext);
  const [redirect, setredirect] = useState(null);
  // console.log(user);
  const nav = useNavigate();

  useEffect(() => {
    if (!user) {
      setredirect("/");
    }
  }, [user]);
  if (redirect) {
    nav("/", { replace: true });
  }
  const [entry, setEntry] = useState("");
  const [buckets, setBuckets] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = entry;
    setEntry("");

    const response = db.collection("buckets");
    const data = response
      .add({
        data: entry,
        created_date: firebase.firestore.FieldValue.serverTimestamp(),
        user_id: user.uid,
      })
      .then(() => {
        fetchEntries();
      });
  };

  const fetchEntries = () => {
    setBuckets([]);
    if (user && user.uid) {
      const response = db.collection("buckets");
      response
        .where("user_id", "==", user.uid)
        .get()
        .then((entries) => {
          entries.forEach((entry) => {
            const docId = entry.id;
            const bucketEntry = { ...entry.data(), docId };
            bucketEntry.time = new Date(
              bucketEntry.created_date.seconds * 1000
            ).toDateString();
            // console.log(bucketEntry);
            setBuckets((buckets) => {
              return [...buckets, bucketEntry];
            });
          });
        });
    }
  };
  useEffect(() => {
    fetchEntries();
  }, []);

  const signOut = () => {
    logOut().then(() => {
      setredirect("/");
    });
  };
  const deleteEntry = (doc_id) => {
    const response = db.collection("buckets");
    response
      .doc(doc_id)
      .delete()
      .then((abc) => {
        console.log({ abc });
        fetchEntries();
      });
  };

  return (
    <div className="container">
      <button type="button" className="btn btn-primary" onClick={signOut}>
        Log out
      </button>
      <main
        className="container"
        style={{ backgroundColor: "#3D78B3", textAlign: "center" }}
      >
        <form onSubmit={handleSubmit}>
          <label htmlFor="entry">Entry</label>
          <input
            type="text"
            id="entry"
            name="entry"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
          <button type="submit" class="btn btn-success">
            Add Entry
          </button>
        </form>
        <ol>
          {buckets.map((item, index) => {
            return (
              <li key={index}>
                {item.data}--- Added on{item.time}
                <button
                  type="button"
                  onClick={() => {
                    deleteEntry(item.id);
                  }}
                  className="btn btn-danger"
                >
                  Delete Bucket Entry
                </button>
              </li>
            );
          })}
        </ol>
      </main>
    </div>
  );
}
