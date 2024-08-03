import { GET_ALL_POSTS } from "../actions/posts.actions";

const initialState = {};

export default function allPostsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.paylaod;
    default:
      return state;
  }
}
