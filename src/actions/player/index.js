import creators from './creators';
import Axios from '../../plugins/axios';

export function fetch() {
  return async (dispatch) => {
    dispatch(creators.loading(true));

    await Axios.get('/players')
    .then((response) => {
      if(response.data) {
        dispatch(creators.fetch({players: response.data}));
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
        const weeklyValue = response.data.weeklyValue;
        const dailyValue = response.data.dailyValue;

        dispatch(creators.increase({
          id: id,
          weeklyValue,
          dailyValue
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
      if(response.data) {
        const weeklyValue = response.data.weeklyValue;
        const dailyValue = response.data.dailyValue;

        dispatch(creators.decrease({
          id,
          weeklyValue,
          dailyValue
        }));
      }
    })
  }
}