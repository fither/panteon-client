import types from './types';

const creators = {
  fetch: ({players}) => ({
    type: types.FETCH_PLAYERS,
    players,
  }),
  increase: ({id, weeklyValue, dailyValue}) => ({
    type: types.INCREASE,
    id,
    weeklyValue,
    dailyValue
  }),
  decrease: ({id, weeklyValue, dailyValue}) => ({
    type: types.DECREASE,
    id,
    weeklyValue,
    dailyValue
  }),
  loading: (isLoading) => ({
    type: types.LOADING,
    isLoading
  }),
}

export default creators;