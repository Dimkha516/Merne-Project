import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/posts.actions";

const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => dispatch(deletePost(props.id));

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez vous supprimer ce post ?")) {
          // deleteQuote();
          alert(
            "Cette fonctionnalité est momentanément indisponible. Veuillez réessayer ultérieurement !"
          );
        }
      }}
    >
      <img src="./images/delete1.png" alt="del" />
    </div>
  );
};

export default DeleteCard;
