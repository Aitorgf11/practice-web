import { useEffect, useState } from "react";
import { useAuth, upload } from "../firebase";

import "./Profile.css";

export default function Profile() {
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

  //Take event, index 0 for the first file
  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  //Called function from firebase
  function handleClick() {
    upload(photo, currentUser, setLoading);
  }

  //Fetch profile photo, each time it is updated
  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser])

  return (
    <div className="fields">
      <input className="input-file" type="file" onChange={handleChange} />
      <button className="btn btn-edit" disabled={loading || !photo} onClick={handleClick}>Upload</button>
      <img src={photoURL} alt="Avatar" className="avatar" />
    </div>
  );
}