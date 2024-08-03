import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/posts.actions";
// import Popup from "reactjs-popup"
// import "reactjs-popup/dist/index.css"

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, uid));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, uid));
    setLiked(false);
  };

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post.likers, liked]);

  return (
    <div>
      {uid === null && (
        <img
          src="./images/like2.png"
          onClick={() => alert("Connectez-vous pour aimer des commentaires")}
          alt="comment"
        />
      )}

      {uid && liked === false && (
        <img src="./images/like2.png" onClick={like} alt="comment" />
      )}

      {uid && liked && (
        <img src="./images/like22.png" onClick={unlike} alt="comment" />
      )}
      <span>{post.likers.length}</span>
    </div>
  );
};

export default LikeButton;
