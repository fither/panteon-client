import types from '../actions/player/types';

const initial_state = {
  players: [],
  isLoading: false,
}

export default function playerReducer(state = initial_state, action) {
  switch(action.type) {
    case types.FETCH_PLAYERS:
      return {
        ...state,
        players: action.players
      }
    case types.INCREASE:
      const playersStateIncrease = [...state.players];
      
      const playerIncreased = playersStateIncrease.find((u) => u._id === action.id);
      playerIncreased.weeklyValue = action.weeklyValue;
      playerIncreased.dailyValue = action.dailyValue;
      
      playersStateIncrease.sort((a,b ) => { return b.weeklyValue - a.weeklyValue});
      return {
        ...state,
        players: playersStateIncrease
      }
    case types.DECREASE:
      const playersStateDecrease = [...state.players];
      const playerDecreased = playersStateDecrease.find((u) => u._id === action.id);
      playerDecreased.weeklyValue = action.weeklyValue;
      playerDecreased.dailyValue = action.dailyValue;
      
      playersStateDecrease.sort((a,b ) => { return b.weeklyValue - a.weeklyValue});
      return {
        ...state,
        players: playersStateDecrease
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