import creators from './creators';
import Axios from '../../plugins/axios';

export function fetch() {
  return async (dispatch) => {
    dispatch(creators.loading(true));

    await Axios.get('/users')
    .then((response) => {
      if(response.data) {
        response.data.sort((a, b) => {
          return b.money - a.money;
        });
        dispatch(creators.fetch({users: response.data}));
      }
    });

    dispatch(creators.loading(false));
  }
}

export function increase(id) {
  return async (dispatch) => {
    await Axios.post(
      '/increase',
      { id: id }
    )
    .then((response) => {
      if(response.data) {
        dispatch(creators.increase({
          id: id,
          newValue: response.data
        }))
      }
    })
  }
}

export function decrease(id) {
  return async (dispatch) => {
    await Axios.post(
      '/decrease', 
      { id: id }
    )
    .then((response) => {
      dispatch(creators.decrease({
        id,
        newValue: response.data
      }))
    })
  }
}