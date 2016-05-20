import {_fetch} from '../helper';

export function setSignupCount(count) {
  return dispatch => {
    dispatch({type: 'SIGNUP_NUMBER_FETCHED', count: count});
  };
}

export function fetchSignupNumber() {
  return dispatch => {
    const url = `${__API__}/${__ONE_MONEY_ID__}/signup_count`;

    return _fetch(url)
      .then(json => {
        dispatch(setSignupCount(json.count));
      });
  };
}
