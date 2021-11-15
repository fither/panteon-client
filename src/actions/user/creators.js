import types from './types';

const creators = {
  fetch: ({users}) => ({
    type: types.FETCH_USERS,
    users,
  }),
  increase: ({id, newValue}) => ({
    type: types.INCREASE,
    id,
    newValue
  }),
  decrease: ({id, newValue}) => ({
    type: types.DECREASE,
    id,
    newValue
  }),
  loading: (isLoading) => ({
    type: types.LOADING,
    isLoading
  }),
}

export default creators;