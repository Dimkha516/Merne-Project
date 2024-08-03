import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { isEmpty, timesTampParser } from "../Utils";
import { addPost, getPosts } from "../../actions/posts.actions";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
  };

  const handlePost = async () => {
    if (message || postPicture || video) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("message", message);
      if (file) data.append("file", file);
      if (video) data.append("video");

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert("Votre poste est vide");
    }
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setVideo("");
    setFile("");
  };

  const handleVideo = () => {
    let findLink = message.split("");
    for (let i = 0; i < findLink.length; i++) {
      if (
        findLink[i].includes("https://www.yout") ||
        findLink[i].includes("https://yout")
      ) {
        let embed = findLink[i].replace("watch?v=", "embed/");
        setVideo(embed.split("&")[0]);
        findLink.splice(i, 1);
        setMessage(findLink.join(""));
        setPostPicture("");
      }
    }
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
    handleVideo();
  }, [userData, message, video]);

  return (
    <div className="new-post-container">
      <div className="poster-infos">
        <div className="empty-box"></div>
        <NavLink to="/profil">
          <img src={userData.picture} alt="user-pic" />
        </NavLink>
        <div className="follows">
          {userData.followers && (
            <>
              <span>
                Abonnés:
                <span>{userData.followers.length}</span>
              </span>
              <br />
            </>
          )}
          {userData.followings && (
            <>
              <span>
                Abonnements:
                <span>{userData.followings.length}</span>
              </span>
            </>
          )}
        </div>
      </div>
      <div className="new-post-form">
        <textarea
          name="message"
          id="message"
          placeholder="Quoi de neuf?"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </div>

      {message || postPicture || video.length > 20 ? (
        <div className="preview-post">
          <div className="preview-header">
            <div className="preview-left-header">
              <img src={userData.picture} alt="user-pic" />
              <span>{userData.pseudo}</span>
            </div>
            <div className="preview-right-header">
              <span>{timesTampParser(Date.now())}</span>
            </div>
          </div>
          <div className="preview-contain">
            <p>{message}</p>
            {postPicture && <img src={postPicture} alt="post-pic" />}
            {video && (
              <iframe
                src={video}
                frameBorder="0"
                allow="accelerometer; autoplay;
              clipboard-write;encrypted-media;gyroscope;picture-in-picture"
                allowFullScreen
                title={video}
              ></iframe>
            )}
          </div>
        </div>
      ) : null}

      <div className="new-post-footer">
        <div className="file-icon">
          {isEmpty(video) && (
            <>
              <img src="./images/edit1.png" alt="img" />
              <label htmlFor="file-upload">Ajouter Photo</label>
              <input
                type="file"
                id="file-upload"
                name="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => handlePicture(e)}
              />
            </>
          )}
        </div>

        <div className="post-buttons">
          {message || postPicture || video.length > 20 ? (
            <>
              <button className="cancel-post" onClick={cancelPost}>
                Annuler Post
              </button>
              <button className="send-post" onClick={handlePost}>
                Envoyer
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NewPostForm;
