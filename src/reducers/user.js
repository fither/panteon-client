import types from '../actions/user/types';

const initial_state = {
  users: [],
  isLoading: false,
}

export default function userReducer(state = initial_state, action) {
  switch(action.type) {
    case types.FETCH_USERS:
      return {
        ...state,
        users: action.users
      }
    case types.INCREASE:
      const increasedUser = state.users.find((u) => u._id === action.id);
      Object.assign(
        increasedUser,
        { money: action.newValue }
      )
      console.log(state.users);
      return {
        ...state,
        users: state.users
      }
    case types.DECREASE:
      const decreasedUser = state.users.find((u) => u._id === action.id);
      Object.assign(
        decreasedUser,
        { money: action.newValue }
      )
      return {
        ...state,
        users: state.users
      }
    case types.LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    default:
      return state;
  }
}