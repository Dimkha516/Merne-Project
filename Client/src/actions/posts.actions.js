import axios from "axios";

//POSTS:
export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const GET_TRENDS = "GET_TRENDS";

// COMMENTS:
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getPosts = (num) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}posts`);
      const array = res.data.slice(0, num);
      dispatch({ type: GET_POSTS, payload: array });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const getAllPosts = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}posts`);
      dispatch({ type: GET_ALL_POSTS, payload: res.data });
    } catch (err) {
      return console.log("erreur " + err);
    }
  };
};

export const addPost = (data) => {
  return (dispatch) => {
    return axios.post(`${process.env.REACT_APP_API_URL}posts`, data);
  };
};

export const likePost = (postId, userId) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}posts/like/` + postId,
        data: { id: userId },
      });
      dispatch({ type: LIKE_POST, payload: { postId, userId } });
    } catch (err) {
      return console.log(err);
    }
  };
};
export const unlikePost = (postId, userId) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}posts/unlike/` + postId,
        data: { id: userId },
      });
      dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const updatePost = (postId, message) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}posts/${postId}`,
        data: { message },
      });
      dispatch({ type: UPDATE_POST, payload: { message, postId } });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}posts/${postId}`,
      });
      dispatch({ type: DELETE_POST, payload: { postId } });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const addComment = (postId, commenterId, text, commenterPseudo) => {
  return (dispatch) => {
    axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}posts/add-comment/${postId}`,
      data: { commenterId, text, commenterPseudo },
    })
      .then((res) => {
        dispatch({ type: ADD_COMMENT, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const editComment = (postId, commentId, text) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}posts/edit-comment/${postId}`,
        data: { commentId, text },
      });
      dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const deleteComment = (postId, commentId) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}posts/delete-comment/${postId}`,
        data: { commentId },
      });
      dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const getTrends = (sortedArray) => {
  return (dispatch) => {
    dispatch({ type: GET_TRENDS, payload: sortedArray });
  };
};
