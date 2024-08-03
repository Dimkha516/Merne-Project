import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import { dateParser } from "../Utils";
import FollowHandler from "../Profil/FollowHandler";
import LikeButton from "./LikeButton";
import DeleteCard from "./DeleteCard";
import { updatePost } from "../../actions/posts.actions";
import CommentsCard from "./CommentsCard";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };
  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <div className="threads-card">
      <li className="card-container" key={post._id}>
        {isLoading ? (
          // <img src="./images/checked1.jpg" alt="ff" />
          <i className="fas fa-spinner fa-spin"></i>
        ) : (
          <>
            <div className="post-top">
              {/*POSTER IMG & NAME*/}
              <div className="poster-infos">
                <img
                  className="user-pic"
                  src={
                    !isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.posterId) return user.picture;
                      })
                      .join("")
                  }
                  alt="poster-pic"
                />
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.posterId) return user.pseudo;
                      })
                      .join("")}
                </h3>
                {post.posterId !== userData._id && (
                  <FollowHandler idToFollow={post.posterId} type={"card"} />
                )}
              </div>
              {/*POSTER IMG & NAME*/}

              {/* POST DATE */}
              <div className="post-date">
                <span>{dateParser(post.createdAt)}</span>
              </div>
              {/* POST DATE */}
            </div>

            {/* POST MESSAGE, PICTURE, & VIDEO*/}
            <div className="post-body">
              {isUpdated === false && <p>{post.message}</p>}

              {isUpdated && (
                <div className="update-post">
                  <textarea
                    defaultValue={post.message}
                    onChange={(e) => setTextUpdate(e.target.value)}
                  />
                  <div className="validate-button">
                    <button className="btn" onClick={updateItem}>
                      Valider modifications
                    </button>
                  </div>
                </div>
              )}

              {post.picture && <img src={post.picture} alt="post-picture" />}
              {post.video && (
                <iframe
                  width="500"
                  height="300"
                  src={post.video}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                  gyroscope; picture-in-picture"
                  allowFullScreen
                  title={post._id}
                ></iframe>
              )}
              {userData._id === post.posterId && (
                <div className="update-button">
                  <div onClick={() => setIsUpdated(!isUpdated)}>
                    <img src="./images/edit1.png" alt="update" />
                  </div>
                  <DeleteCard id={post._id} />
                </div>
              )}
            </div>
            {/* POST MESSAGE, PICTURE, & VIDEO*/}
            <div className="post-footer">
              <div className="comments">
                <img
                  src="./images/comment2.png"
                  onClick={() => setShowComments(!showComments)}
                  alt="comment"
                />
                <h3>{post.comments.length}</h3>
              </div>

              <LikeButton post={post} />
              {/* <img src="./images/like2.png" alt="comment" /> */}

              <div>
                <img
                  src="./images/share1.png"
                  onClick={() => alert("Fonctionnalité bientôt disponible")}
                  alt="comment"
                />
              </div>
            </div>
            {showComments && <CommentsCard post={post} />}
          </>
        )}
      </li>
    </div>
  );
};

export default Card;
