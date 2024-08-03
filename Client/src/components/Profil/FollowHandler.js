import React, { useEffect, useState } from "react";
import { isEmpty } from "../Utils";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/user.actions";

const FollowHandler = ({ idToFollow, type }) => {
  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow));
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow));
    setIsFollowed(false);
  };

  useEffect(() => {
    if (!isEmpty(userData.followings)) {
      if (userData.followings.includes(idToFollow)) {
        setIsFollowed(true);
      } else {
        setIsFollowed(false);
      }
    }
  }, [userData, idToFollow]);

  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        <span onClick={handleUnfollow}>
          {type === "suggestion" && (
            <button className="unfollow-btn">Abonné(e)</button>
          )}
          {type === "card" && (
            <img
              className="checked-icon"
              src="./images/unfollow2.png"
              alt="ckeck-pic"
            />
          )}
          {/* {type === "card" && <input type="checkbox" defaultChecked></input>} */}
        </span>
      )}

      {isFollowed === false && !isEmpty(userData) && (
        <span onClick={handleFollow}>
          {type === "suggestion" && (
            <button className="follow-btn">Suivre</button>
          )}
          {type === "card" && (
            <img className="unchecked-icon" src="./images/follow1.png" />
          )}
          {/* {type === "card" && <input type="checkbox"></input>} */}
        </span>
      )}
    </>
  );
};

export default FollowHandler;
