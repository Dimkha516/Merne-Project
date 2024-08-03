import { GET_USERS } from "../actions/users.actions";

const intitialState = {};

export default function usersReducer(state = intitialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    default:
      return state;
  }
}
