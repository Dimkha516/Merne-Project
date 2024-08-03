import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/posts.actions";
import FollowHandler from "../Profil/FollowHandler";
import { isEmpty, timesTampParser } from "../Utils";
import EditDeleteComment from "./EditDeleteComment";

const CommentsCard = ({ post }) => {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleComment = async (e) => {
    e.preventDefault();

    if (text) {
      dispatch(addComment(post._id, userData._id, text, userData.pseudo));
      dispatch(getPosts());
      setText("");
    }
  };

  return (
    <div className="comment-container">
      {post.comments.map((comment) => {
        return (
          <div
            className={
              comment.commenterId === userData._id
                ? "client-comment"
                : "others-comment"
            }
            key={comment._id}
          >
            <div className="comment-top">
              <div className="comment-top-left">
                <img
                  src={
                    !isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === comment.commenterId)
                          return user.picture;
                        else return null;
                      })
                      .join("")
                  }
                  alt="commenter-pic"
                />
                <h3>{comment.commenterPseudo}</h3>
                {comment.commenterId !== userData._id && (
                  <FollowHandler
                    idToFollow={comment.commenterId}
                    type={"card"}
                  />
                )}
              </div>

              <div className="comment-top-right">
                <span>{timesTampParser(comment.timestamp)}</span>
              </div>
            </div>
            <p>{comment.text}</p>
            {/* <EditDeleteComment comment={comment} postId={post._id} /> */}
          </div>
        );
      })}
      {userData._id && (
        <div className="new-comment">
          <form onSubmit={handleComment} className="comment-form">
            <input
              type="text"
              name="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder="Laisser un commentaire ..."
              autoFocus="on"
              autoComplete="off"
            />
            <br />
            <input type="submit" value="Envoyer" />
          </form>
        </div>
      )}

      <div className="comment-footer">Footer</div>
    </div>
  );
};

export default CommentsCard;
