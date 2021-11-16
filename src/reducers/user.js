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
      const usersStateIncrease = [...state.users];
      usersStateIncrease.find((u) => u._id === action.id).money = action.newValue;
      usersStateIncrease.sort((a,b ) => { return b.money - a.money});
      return {
        ...state,
        users: usersStateIncrease
      }
    case types.DECREASE:
      const usersStateDecrease = [...state.users];
      usersStateDecrease.find((u) => u._id === action.id).money = action.newValue;
      usersStateDecrease.sort((a,b ) => { return b.money - a.money});
      return {
        ...state,
        users: usersStateDecrease
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