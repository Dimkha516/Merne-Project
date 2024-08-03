import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
import { dateParser } from "../Utils";
import FollowHandler from "./FollowHandler";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  return (
    <div className="update-profil">
      <div className="update-profil-container">
        <LeftNav />
        <div className="contains">
          <div className="user-tilte">
            <h1>Profil de {userData.pseudo}</h1>
            <div className="parts">
              <div className="left-part">
                <h2>Photo Profil</h2>
                <img src={userData.picture} alt="profil" />
                <UploadImg />
              </div>

              <div className="right-part">
                <div className="bio-update">
                  <h1>Bio</h1>
                  {updateForm === false && (
                    <>
                      <p
                        className="bio-text"
                        onClick={() => setUpdateForm(!updateForm)}
                      >
                        {userData.bio}
                      </p>
                      <button
                        className="bio-btn"
                        onClick={() => setUpdateForm(!updateForm)}
                      >
                        Modifier Bio
                      </button>
                    </>
                  )}
                  {updateForm && (
                    <>
                      <textarea
                        type="text"
                        defaultValue={userData.bio}
                        onChange={(e) => setBio(e.target.value)}
                      ></textarea>
                      <button onClick={handleUpdate}>
                        Valider modifications
                      </button>
                    </>
                  )}
                </div>
                <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>

                <h5
                  className="followings-btn"
                  onClick={() => setFollowingPopup(true)}
                >
                  Abonnements:{" "}
                  {userData.followings ? userData.followings.length : ""}
                </h5>

                <h5
                  className="followers-btn"
                  onClick={() => setFollowersPopup(true)}
                >
                  Abonnés: {userData.followers ? userData.followers.length : ""}
                </h5>
              </div>
            </div>
          </div>

          {followingPopup && (
            <div className="following-popup">
              <div className="modal">
                <div className="modal-head">
                  <h3>Abonnements</h3>
                  <span
                    className="cross"
                    onClick={() => setFollowingPopup(false)}
                  >
                    &#10005;
                  </span>
                </div>
                <ul>
                  {usersData.map((user) => {
                    for (let i = 0; i < usersData.length; i++) {
                      if (user._id === userData.followings[i]) {
                        return (
                          <li key={user._id}>
                            <div className="left-li">
                              <img src={user.picture} alt="user-pic" />
                              <h3>{user.pseudo}</h3>
                            </div>
                            <div className="right-li">
                              <FollowHandler
                                idToFollow={user._id}
                                type="suggestion"
                              />
                            </div>
                          </li>
                        );
                      }
                    }
                  })}
                </ul>
              </div>
            </div>
          )}
          {/*  */}
          {/*  */}
          {followersPopup && (
            <div className="followers-popup">
              <div className="modal">
                <div className="modal-head">
                  <h3>Abonnés</h3>
                  <span
                    className="cross"
                    onClick={() => setFollowersPopup(false)}
                  >
                    &#10005;
                  </span>
                </div>
                <ul>
                  {usersData.map((user) => {
                    for (let i = 0; i < usersData.length; i++) {
                      if (user._id === userData.followers[i]) {
                        return (
                          <li key={user._id}>
                            <div className="left-li">
                              <img src={user.picture} alt="user-pic" />
                              <h3>{user.pseudo}</h3>
                            </div>
                            <div className="right-li">
                              <FollowHandler
                                idToFollow={user._id}
                                type="suggestion"
                              />{" "}
                            </div>
                          </li>
                        );
                      }
                    }
                  })}
                </ul>
              </div>
            </div>
          )}
          {/*  */}
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
