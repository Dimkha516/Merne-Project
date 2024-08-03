import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  // AJOUT PERSONNEL:
  const [changeImg, setChangedImg] = useState(false);
  //

  const handleImg = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);

    dispatch(uploadPicture(data, userData._id));
  };

  return (
    <div className="upload-img">
      <form className="upload-img-form" onSubmit={handleImg}>
        <label htmlFor="file">Changer d'image</label>
        <br />
        <input
          type="file"
          id="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFile(e.target.files[0]) > setChangedImg(true)}
        />
        <br />
        {changeImg && <input type="submit" value="Enregistrer" />}
      </form>
    </div>
  );
};

export default UploadImg;
